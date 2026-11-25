"use strict";

const maxBytes = 50_000_000;
const maxDuration = 30;
const readTimeout = 15_000;
const videoTypes = new Set(["video/mp4", "video/webm"]);
const openButton = document.querySelector("#open-video");
const fileInput = document.querySelector("#video-file");
const statusMessage = document.querySelector("#video-status");
const errorMessage = document.querySelector("#video-error");
const frame = document.querySelector("#original-frame");
const sampleCard = document.querySelector("#sample-poster").closest(".frame-card");
const sampleButton = document.querySelector("#open-sample");
const details = document.querySelector("#comparison");
const frameSize = document.querySelector("#frame-size");
const fileName = document.querySelector("#file-name");
const videoTime = document.querySelector("#video-time");
const context = frame.getContext("2d");
const preview = document.querySelector("#preview-frame");
const previewSize = document.querySelector("#preview-size");
const compressionControls = document.querySelector("#compression-controls");
const resolution = document.querySelector("#resolution");
const jpegQuality = document.querySelector("#jpeg-quality");
const qualityValue = document.querySelector("#quality-value");
const previewStatus = document.querySelector("#preview-status");
const previewError = document.querySelector("#preview-error");
const retryPreview = document.querySelector("#retry-preview");
const saveButton = document.querySelector("#save-png");
const saveNote = document.querySelector("#save-note");
const saveStatus = document.querySelector("#save-status");
const saveError = document.querySelector("#save-error");
const encodingCanvas = document.createElement("canvas");
const timeline = document.querySelector("#frame-time");
const seekStatus = document.querySelector("#seek-status");
const retrySeek = document.querySelector("#retry-seek");
const regionForm = document.querySelector("#region-form");
const regionControls = document.querySelector("#region-controls");
const regionError = document.querySelector("#region-error");
const regionInputs = Array.from(regionForm.querySelectorAll("input"));
const originalMedia = document.querySelector("#original-media");
const panels = ["original", "preview"].map((id) => ({
  media: document.querySelector(`#${id}-media`),
  outline: document.querySelector(`#${id}-outline`),
  detail: document.querySelector(`#${id}-detail`),
  crop: document.querySelector(`#${id}-crop`),
  size: document.querySelector(`#${id}-region-size`),
}));

const messages = {
  format: "MP4 또는 WebM 파일을 선택하세요.",
  size: "50MB 이하의 영상을 선택하세요.",
  duration: "30초 이하의 영상을 선택하세요.",
  decode: "이 브라우저에서 영상을 열 수 없습니다. 다른 영상을 선택하거나 샘플을 사용해 보세요.",
};

let activeSource = null;
let region = null;
let drag = null;
let frameReady = false;
let previewRevision = 0;
let readyRevision = -1;
let encoding = false;
let previewRequested = false;
let exporting = false;

function validateFile(file) {
  const type = file.type.toLowerCase();
  const genericType = !type || type === "application/octet-stream";
  if (!(videoTypes.has(type) || (genericType && /\.(mp4|webm)$/i.test(file.name)))) {
    return messages.format;
  }
  return file.size > maxBytes ? messages.size : "";
}

function mediaTime(seconds) {
  const centiseconds = Math.floor(seconds * 100);
  const minutes = Math.floor(centiseconds / 6000);
  const remaining = ((centiseconds % 6000) / 100).toFixed(2).padStart(5, "0");
  return `${String(minutes).padStart(2, "0")}:${remaining}`;
}

function releaseSource() {
  if (!activeSource) return;
  const { video, url, controller, objectUrl } = activeSource;
  activeSource = null;
  controller.abort();
  video.removeAttribute("src");
  video.load();
  if (objectUrl) URL.revokeObjectURL(url);
}

function resetFrame() {
  frame.width = 0;
  frame.height = 0;
  preview.width = 0;
  preview.height = 0;
  resolution.value = "100";
  jpegQuality.value = qualityValue.value = "75";
  setFrameReady(false);
  clearRegion();
  seekStatus.textContent = "";
  retrySeek.hidden = true;
  sampleCard.hidden = false;
  details.hidden = true;
  frameSize.textContent = "";
}

function readFirstFrame(source) {
  const { video, url, controller } = source;
  return new Promise((resolve, reject) => {
    const listeners = new AbortController();
    const options = { signal: listeners.signal };
    const timeout = window.setTimeout(() => finish(messages.decode), readTimeout);

    function finish(message) {
      window.clearTimeout(timeout);
      listeners.abort();
      if (message) reject(new Error(message));
      else resolve();
    }

    function checkFrame() {
      if (video.readyState < HTMLMediaElement.HAVE_METADATA) return;
      if (!Number.isFinite(video.duration) || video.duration <= 0 ||
          !video.videoWidth || !video.videoHeight) {
        finish(messages.decode);
        return;
      }
      if (video.duration > maxDuration) {
        finish(messages.duration);
        return;
      }
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) finish();
    }

    controller.signal.addEventListener("abort", () => finish(messages.decode), options);
    video.addEventListener("error", () => finish(messages.decode), options);
    for (const event of ["loadedmetadata", "loadeddata", "canplay"]) {
      video.addEventListener(event, checkFrame, options);
    }
    video.src = url;
    video.load();
  });
}

function openVideo(file) {
  const invalid = validateFile(file);
  if (invalid) {
    errorMessage.textContent = invalid;
    return;
  }

  openSource(file.name, URL.createObjectURL(file), true);
}

async function openSource(name, url, objectUrl = false) {
  releaseSource();
  resetFrame();
  errorMessage.textContent = "";
  statusMessage.textContent = "영상을 여는 중…";

  const video = document.createElement("video");
  video.preload = "auto";
  video.muted = true;
  video.playsInline = true;
  const source = {
    video,
    url,
    objectUrl,
    controller: new AbortController(),
    requestedTime: null,
    seeking: false,
  };
  activeSource = source;

  try {
    await readFirstFrame(source);
    if (activeSource !== source) return;
    drawFrame(video);
    timeline.max = video.duration;
    timeline.value = 0;
    fileName.textContent = name;
    sampleCard.hidden = true;
    details.hidden = false;
    setFrameReady(true);
    statusMessage.textContent = "첫 프레임을 불러왔습니다.";
  } catch (error) {
    if (activeSource !== source) return;
    releaseSource();
    resetFrame();
    statusMessage.textContent = "";
    errorMessage.textContent = error.message === messages.duration ? messages.duration : messages.decode;
  }
}

openButton.addEventListener("click", () => fileInput.click());
sampleButton.addEventListener("click", () => openSource("실습 샘플 · 작업실", "sample.mp4"));
fileInput.addEventListener("change", () => {
  const [file] = fileInput.files;
  fileInput.value = "";
  if (file) openVideo(file);
});
window.addEventListener("pagehide", (event) => {
  if (!event.persisted) releaseSource();
});

function drawFrame(video) {
  frame.width = video.videoWidth;
  frame.height = video.videoHeight;
  context.drawImage(video, 0, 0);
  frameSize.textContent = `${frame.width} × ${frame.height} px`;
  videoTime.textContent = `${mediaTime(video.currentTime)} / ${mediaTime(video.duration)}`;
  timeline.setAttribute("aria-valuetext", mediaTime(video.currentTime));
}

function setFrameReady(ready) {
  frameReady = ready;
  regionControls.disabled = !ready;
  originalMedia.toggleAttribute("data-ready", ready);
  compressionControls.disabled = !ready;
  if (ready) requestPreview();
  else {
    previewRequested = false;
    invalidatePreview();
    previewStatus.textContent = "";
  }
}

function seekVideo(source, time) {
  const { video, controller } = source;
  if (!video.seeking && video.currentTime === time &&
      video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const listeners = new AbortController();
    const options = { signal: listeners.signal };
    const fail = () => finish(false);
    const timeout = window.setTimeout(fail, readTimeout);

    function finish(success) {
      window.clearTimeout(timeout);
      listeners.abort();
      if (success) resolve();
      else reject(new Error("프레임을 불러오지 못했습니다."));
    }

    function checkFrame() {
      if (!video.seeking && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) finish(true);
    }

    video.addEventListener("seeked", checkFrame, options);
    video.addEventListener("loadeddata", checkFrame, options);
    video.addEventListener("canplay", checkFrame, options);
    video.addEventListener("error", fail, options);
    controller.signal.addEventListener("abort", fail, options);
    try {
      video.currentTime = time;
    } catch {
      fail();
    }
  });
}

async function selectTime(time) {
  const source = activeSource;
  if (!source || details.hidden) return;
  const { video } = source;
  source.requestedTime = Math.min(time, Math.max(0, video.duration - 0.001));
  timeline.setAttribute("aria-valuetext", mediaTime(source.requestedTime));
  clearRegion();
  setFrameReady(false);
  retrySeek.hidden = true;
  seekStatus.textContent = "프레임을 불러오는 중…";
  if (source.seeking) return;
  source.seeking = true;

  while (activeSource === source && source.requestedTime !== null) {
    const target = source.requestedTime;
    source.requestedTime = null;
    try {
      await seekVideo(source, target);
      if (activeSource !== source || source.requestedTime !== null) continue;
      drawFrame(video);
      seekStatus.textContent = "";
      setFrameReady(true);
    } catch (error) {
      if (activeSource !== source || source.requestedTime !== null) continue;
      seekStatus.textContent = error.message;
      retrySeek.hidden = false;
    }
  }
  source.seeking = false;
}

function clearRegion() {
  region = null;
  drag = null;
  regionForm.reset();
  regionError.textContent = "";
  for (const panel of panels) {
    panel.outline.hidden = true;
    panel.detail.hidden = true;
    panel.crop.width = 0;
    panel.crop.height = 0;
  }
  clearSaveMessages();
  updateSaveButton();
}

function mediaBounds(media, source = frame) {
  const bounds = media.getBoundingClientRect();
  const scale = Math.min(bounds.width / source.width, bounds.height / source.height);
  const width = source.width * scale;
  const height = source.height * scale;
  return {
    scale,
    x: (bounds.width - width) / 2,
    y: (bounds.height - height) / 2,
    left: bounds.left,
    top: bounds.top,
  };
}

function drawOutlines(selection) {
  for (const [index, panel] of panels.entries()) {
    const source = index === 0 ? frame : preview;
    panel.outline.hidden = !selection || (index === 1 && !previewReady());
    if (panel.outline.hidden) continue;
    const bounds = mediaBounds(panel.media, source);
    const scaleX = bounds.scale * source.width / frame.width;
    const scaleY = bounds.scale * source.height / frame.height;
    panel.outline.style.left = `${bounds.x + selection.x * scaleX}px`;
    panel.outline.style.top = `${bounds.y + selection.y * scaleY}px`;
    panel.outline.style.width = `${selection.width * scaleX}px`;
    panel.outline.style.height = `${selection.height * scaleY}px`;
  }
}

function applyRegion(selection) {
  const { x, y, width, height } = selection;
  if (![x, y, width, height].every(Number.isInteger) || x < 0 || y < 0 ||
      width < 1 || height < 1 || x + width > frame.width || y + height > frame.height) {
    regionError.textContent = "원본 프레임 안에서 너비와 높이가 1px 이상인 영역을 선택하세요.";
    return;
  }
  region = selection;
  regionError.textContent = "";
  for (const input of regionInputs) input.value = region[input.name];
  clearSaveMessages();
  renderRegions();
}

function pointerPosition(event) {
  const bounds = mediaBounds(originalMedia);
  return {
    x: (event.clientX - bounds.left - bounds.x) / bounds.scale,
    y: (event.clientY - bounds.top - bounds.y) / bounds.scale,
  };
}

function draggedRegion(event) {
  const position = pointerPosition(event);
  const endX = Math.max(0, Math.min(frame.width, position.x));
  const endY = Math.max(0, Math.min(frame.height, position.y));
  if (drag.x === endX || drag.y === endY) return null;
  const x = Math.floor(Math.min(drag.x, endX));
  const y = Math.floor(Math.min(drag.y, endY));
  return {
    x,
    y,
    width: Math.ceil(Math.max(drag.x, endX)) - x,
    height: Math.ceil(Math.max(drag.y, endY)) - y,
  };
}

timeline.addEventListener("input", () => selectTime(timeline.valueAsNumber));
retrySeek.addEventListener("click", () => selectTime(timeline.valueAsNumber));
regionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (frameReady) applyRegion(Object.fromEntries(regionInputs.map((input) => [input.name, input.valueAsNumber])));
});
originalMedia.addEventListener("pointerdown", (event) => {
  if (!frameReady || drag || event.button !== 0) return;
  const { x, y } = pointerPosition(event);
  if (x < 0 || y < 0 || x >= frame.width || y >= frame.height) return;
  drag = { x, y, pointerId: event.pointerId };
  originalMedia.setPointerCapture(event.pointerId);
});
originalMedia.addEventListener("pointermove", (event) => {
  if (drag?.pointerId === event.pointerId) drawOutlines(draggedRegion(event) ?? region);
});
originalMedia.addEventListener("pointerup", (event) => {
  if (drag?.pointerId !== event.pointerId) return;
  const selection = draggedRegion(event);
  drag = null;
  if (selection) applyRegion(selection);
  else drawOutlines(region);
});
originalMedia.addEventListener("lostpointercapture", (event) => {
  if (drag?.pointerId !== event.pointerId) return;
  drag = null;
  drawOutlines(region);
});
const resizeObserver = new ResizeObserver(() => drawOutlines(region));
for (const panel of panels) resizeObserver.observe(panel.media);

function previewReady() {
  return frameReady && readyRevision === previewRevision;
}

function clearSaveMessages() {
  saveStatus.textContent = "";
  saveError.textContent = "";
}

function updateSaveButton() {
  saveButton.disabled = !region || !previewReady() || exporting;
  saveNote.textContent = !region ? "비교 영역을 선택하면 PNG로 저장할 수 있습니다."
    : !previewReady() ? "현재 설정의 미리보기가 준비되면 저장할 수 있습니다." : "";
}

function invalidatePreview() {
  previewRevision += 1;
  preview.hidden = true;
  previewSize.textContent = "";
  previewError.textContent = "";
  retryPreview.hidden = true;
  panels[1].detail.hidden = true;
  panels[1].outline.hidden = true;
  clearSaveMessages();
  updateSaveButton();
}

function canvasBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob?.type === type) resolve(blob);
      else reject(new Error(type));
    }, type, quality);
  });
}

async function requestPreview() {
  if (!frameReady) return;
  invalidatePreview();
  previewStatus.textContent = "미리보기를 갱신하는 중…";
  previewRequested = true;
  if (encoding) return;
  encoding = true;

  while (previewRequested && frameReady) {
    previewRequested = false;
    const revision = previewRevision;
    const scale = Number(resolution.value) / 100;
    const quality = Number(jpegQuality.value) / 100;
    try {
      encodingCanvas.width = Math.max(1, Math.round(frame.width * scale));
      encodingCanvas.height = Math.max(1, Math.round(frame.height * scale));
      encodingCanvas.getContext("2d").drawImage(frame, 0, 0, encodingCanvas.width, encodingCanvas.height);
      const jpeg = await canvasBlob(encodingCanvas, "image/jpeg", quality);
      if (revision !== previewRevision) continue;
      const url = URL.createObjectURL(jpeg);
      try {
        const image = new Image();
        image.src = url;
        await image.decode();
        if (revision !== previewRevision) continue;
        preview.width = image.naturalWidth;
        preview.height = image.naturalHeight;
        preview.getContext("2d").drawImage(image, 0, 0);
      } finally {
        URL.revokeObjectURL(url);
      }
      readyRevision = revision;
      preview.hidden = false;
      previewSize.textContent = `${preview.width} × ${preview.height} px`;
      previewStatus.textContent = "미리보기가 준비되었습니다.";
      renderRegions();
    } catch {
      if (revision !== previewRevision) continue;
      previewStatus.textContent = "";
      previewError.textContent = "미리보기를 만들지 못했습니다.";
      retryPreview.hidden = false;
    }
  }
  encodingCanvas.width = encodingCanvas.height = 0;
  encoding = false;
}

function renderRegions() {
  drawOutlines(region);
  if (region) {
    const { x, y, width, height } = region;
    drawCrop(panels[0], frame, x, y, width, height);
    if (previewReady()) {
      const left = Math.floor(x * preview.width / frame.width);
      const top = Math.floor(y * preview.height / frame.height);
      const right = Math.ceil((x + width) * preview.width / frame.width);
      const bottom = Math.ceil((y + height) * preview.height / frame.height);
      drawCrop(panels[1], preview, left, top, right - left, bottom - top);
    }
  }
  updateSaveButton();
}

function drawCrop(panel, source, x, y, width, height) {
  panel.crop.width = width;
  panel.crop.height = height;
  panel.crop.getContext("2d").drawImage(source, x, y, width, height, 0, 0, width, height);
  panel.size.textContent = `${width} × ${height} px`;
  panel.detail.hidden = false;
}

function composePng() {
  const output = document.createElement("canvas");
  output.width = 1280;
  output.height = 548;
  const drawing = output.getContext("2d");
  drawing.fillStyle = "#fff";
  drawing.fillRect(0, 0, output.width, output.height);
  drawing.fillStyle = "#1a1c1c";
  drawing.font = "bold 26px system-ui, sans-serif";
  drawing.fillText("FrameCheck · 프레임 압축 비교", 28, 44);
  drawing.font = "18px system-ui, sans-serif";
  const time = videoTime.textContent.split(" / ")[0];
  drawing.fillText(`해상도 ${resolution.value}% · JPEG 품질 ${jpegQuality.value}`, 28, 75);

  panels.forEach(({ crop, size }, index) => {
    const x = 28 + index * 622;
    const title = index === 0 ? "원본" : "변환 미리보기";
    drawing.fillStyle = "#1a1c1c";
    drawing.font = "bold 21px system-ui, sans-serif";
    drawing.fillText(title, x, 119);
    drawing.font = "17px system-ui, sans-serif";
    drawing.fillText(`시점 ${time} · 선택 영역 ${size.textContent}`, x, 147);
    drawing.fillStyle = "#1b1b1b";
    drawing.fillRect(x, 166, 602, 354);
    const scale = Math.min(602 / crop.width, 354 / crop.height);
    const width = crop.width * scale;
    const height = crop.height * scale;
    drawing.drawImage(crop, x + (602 - width) / 2, 166 + (354 - height) / 2, width, height);
  });
  return output;
}

async function savePng() {
  if (saveButton.disabled) return;
  const revision = previewRevision;
  const selection = region;
  const stillCurrent = () => previewReady() && revision === previewRevision && selection === region;
  exporting = true;
  clearSaveMessages();
  saveStatus.textContent = "PNG를 만드는 중…";
  updateSaveButton();

  try {
    const png = await canvasBlob(composePng(), "image/png");
    if (!stillCurrent()) return;
    const url = URL.createObjectURL(png);
    const link = document.createElement("a");
    link.href = url;
    link.download = "framecheck-comparison.png";
    document.body.append(link);
    try {
      link.click();
      saveStatus.textContent = "PNG 다운로드를 시작했습니다.";
    } finally {
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  } catch {
    if (stillCurrent()) {
      saveStatus.textContent = "";
      saveError.textContent = "PNG를 만들지 못했습니다. 다시 시도해 주세요.";
    }
  } finally {
    exporting = false;
    updateSaveButton();
  }
}

resolution.addEventListener("change", requestPreview);
jpegQuality.addEventListener("input", () => {
  qualityValue.value = jpegQuality.value;
  requestPreview();
});
retryPreview.addEventListener("click", requestPreview);
saveButton.addEventListener("click", savePng);
