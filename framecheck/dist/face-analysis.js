const runtimeBase = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21";
const modelUrl = "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

const groups = {
  eyes: {
    outline: [33, 133, 159, 145, 362, 263, 386, 374],
    comparison: [33, 133, 362, 263],
  },
  mouth: {
    outline: [61, 291, 0, 17],
    comparison: [61, 291],
  },
};
const markerIndices = [...groups.eyes.comparison, ...groups.mouth.comparison];
const modelLoadTimeout = 12_000;
let modelPromise;
let runtimeModule;
let runtimeAttempt = 0;
const fullFrame = { x: 0, y: 0, width: 1, height: 1 };
const inspectionWindows = [
  fullFrame,
  ...[0, 0.225, 0.45].flatMap((y) =>
    [0.25, 0, 0.5].map((x) => ({ x, y, width: 0.5, height: 0.55 }))),
];

async function loadRuntime() {
  if (runtimeModule) return runtimeModule;
  // Use a fresh import URL on retry, even when the previous request never settled.
  const attempt = runtimeAttempt++;
  const retry = attempt ? `?retry=${attempt}` : "";
  runtimeModule = await import(`${runtimeBase}/vision_bundle.mjs${retry}`);
  return runtimeModule;
}

function getModel() {
  if (modelPromise) return modelPromise;
  const controller = new AbortController();
  let timeout;
  const load = (async () => {
    const { FilesetResolver, FaceLandmarker } = await loadRuntime();
    controller.signal.throwIfAborted();
    const runtime = await FilesetResolver.forVisionTasks(`${runtimeBase}/wasm`);
    controller.signal.throwIfAborted();
    const response = await fetch(modelUrl, { signal: controller.signal });
    if (!response.ok) throw new Error("Face model download failed");
    const buffer = new Uint8Array(await response.arrayBuffer());
    controller.signal.throwIfAborted();
    const model = await FaceLandmarker.createFromOptions(runtime, {
      baseOptions: { modelAssetBuffer: buffer, delegate: "CPU" },
      runningMode: "IMAGE",
      numFaces: 3,
      minFaceDetectionConfidence: 0.65,
    });
    if (controller.signal.aborted) {
      model.close();
      controller.signal.throwIfAborted();
    }
    return model;
  })();
  const deadline = new Promise((_, reject) => {
    timeout = setTimeout(() => {
      const error = new DOMException("Face model load timed out", "TimeoutError");
      controller.abort(error);
      reject(error);
    }, modelLoadTimeout);
  });
  modelPromise = Promise.race([load, deadline]).catch((error) => {
    modelPromise = undefined;
    throw error;
  }).finally(() => clearTimeout(timeout));
  return modelPromise;
}

function bounds(points) {
  return {
    left: Math.min(...points.map(({ x }) => x)),
    top: Math.min(...points.map(({ y }) => y)),
    right: Math.max(...points.map(({ x }) => x)),
    bottom: Math.max(...points.map(({ y }) => y)),
  };
}

function area(box) {
  return Math.max(0, box.right - box.left) * Math.max(0, box.bottom - box.top);
}

function overlap(a, b) {
  const shared = area({
    left: Math.max(a.left, b.left),
    top: Math.max(a.top, b.top),
    right: Math.min(a.right, b.right),
    bottom: Math.min(a.bottom, b.bottom),
  });
  return shared / (area(a) + area(b) - shared);
}

export async function analyzeFacePair(original, converted, isCurrent, onReady) {
  const model = await getModel();
  if (!isCurrent()) return null;
  onReady();
  await new Promise((resolve) => setTimeout(resolve, 0));
  if (!isCurrent()) return null;

  const tile = document.createElement("canvas");
  let source;
  let inspectionWindow;
  for (const window of inspectionWindows) {
    const faces = detectWindow(model, original, window, tile);
    source = faces.map((points) => ({ points, box: bounds(points) }))
      .sort((a, b) => area(b.box) - area(a.box))[0];
    if (source) {
      inspectionWindow = window;
      break;
    }
  }
  if (!source) return { original: null };

  // Detect independently on the actual decoded JPEG; compare positions in source pixels.
  const matches = detectWindow(model, converted, inspectionWindow, tile)
    .map((points) => ({ points, score: overlap(source.box, bounds(points)) }))
    .sort((a, b) => b.score - a.score);
  const convertedPoints = matches[0]?.score >= 0.3 ? matches[0].points : null;
  const width = original.width;
  const height = original.height;
  const offsets = convertedPoints && Object.values(groups).map(({ comparison }) => {
    const mean = comparison.reduce((sum, i) => sum + Math.hypot(
      (source.points[i].x - convertedPoints[i].x) * width,
      (source.points[i].y - convertedPoints[i].y) * height,
    ), 0) / comparison.length;
    return { pixels: mean, percent: 100 * mean / ((source.box.right - source.box.left) * width) };
  });
  return {
    original: markerIndices.map((i) => source.points[i]),
    converted: convertedPoints && markerIndices.map((i) => convertedPoints[i]),
    regions: {
      face: pixelRegion(source.box, width, height, 0.12),
      eyes: pixelRegion(bounds(groups.eyes.outline.map((i) => source.points[i])), width, height, 0.16),
      mouth: pixelRegion(bounds(groups.mouth.outline.map((i) => source.points[i])), width, height, 0.25),
    },
    offsets,
  };
}

function detectWindow(model, image, window, tile) {
  if (window === fullFrame) return model.detect(image).faceLandmarks;
  const left = Math.floor(window.x * image.width);
  const top = Math.floor(window.y * image.height);
  const right = Math.min(image.width, Math.ceil((window.x + window.width) * image.width));
  const bottom = Math.min(image.height, Math.ceil((window.y + window.height) * image.height));
  tile.width = right - left;
  tile.height = bottom - top;
  tile.getContext("2d").drawImage(image, left, top, tile.width, tile.height, 0, 0, tile.width, tile.height);
  return model.detect(tile).faceLandmarks.map((points) => points.map(({ x, y }) => ({
    x: (left + x * tile.width) / image.width,
    y: (top + y * tile.height) / image.height,
  })));
}

function pixelRegion(box, width, height, padding) {
  const dx = (box.right - box.left) * padding;
  const dy = (box.bottom - box.top) * padding;
  const left = Math.max(0, Math.min(width - 1, Math.floor((box.left - dx) * width)));
  const top = Math.max(0, Math.min(height - 1, Math.floor((box.top - dy) * height)));
  const right = Math.max(left + 1, Math.min(width, Math.ceil((box.right + dx) * width)));
  const bottom = Math.max(top + 1, Math.min(height, Math.ceil((box.bottom + dy) * height)));
  return { x: left, y: top, width: right - left, height: bottom - top };
}
