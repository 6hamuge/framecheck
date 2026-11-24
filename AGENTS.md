# Repository Guidelines

## Project Structure

FrameCheck is a planned single-page app for comparing a video frame before and after resizing and JPEG compression. Put `index.html`, `app.js`, CSS, and the sample clip in `framecheck/dist/`. Document the sample's source and usage rights.

## Local Development

Once the entry point exists, run `python3 -m http.server 8000 --bind 127.0.0.1 --directory framecheck/dist` from the workspace root and open `http://127.0.0.1:8000/`. The planned browser-native app needs no build step. Check JavaScript syntax with `node --check framecheck/dist/app.js`.

## Working on Changes

- Inspect the relevant files first. State assumptions that affect behavior. If plausible interpretations would produce different results, explain the tradeoff and clarify intent before editing. Point out a simpler approach when one meets the goal.
- Implement the requested behavior with the smallest clear change. Keep single-use logic local and add options or error handling for supported use cases.
- Match nearby style and keep every edit tied to the request. Remove code made unused by your change. Flag unrelated issues separately.
- For multi-step work, pair each step with a check. Reproduce bugs before changing code and rerun the same check afterward. Log any checks you could not run.

## Coding Style

Use two-space indentation, camelCase for JavaScript, and kebab-case for CSS classes and asset filenames. Write UI labels and status messages in Korean. Process user videos in the browser and revoke replaced object URLs.

## Testing

There is no automated test suite yet. With both the sample and a local MP4 or WebM, select a frame and region, change each control independently, and export a PNG. Verify that lower resolution reduces the region's pixel dimensions, JPEG quality preserves them, and both panels show the same timestamp and region. Check mobile layout and rejection of unsupported formats, files over 50 MB, and clips over 30 seconds.

## Commits and Pull Requests

No Git history is available yet. Use short imperative subjects such as `Add frame region selection`. Summarize the user-visible change and checks in pull requests, link any related issue, and include a screenshot or recording for UI changes.
