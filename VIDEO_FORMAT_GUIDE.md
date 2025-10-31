# Video Format Issues and Solutions

## Problem Summary

### Issue 1: Videos Not Playing in Fullscreen LightGallery
**Symptoms:**
- Videos show loading spinner indefinitely when clicked in fullscreen mode
- Occurs in both Firefox and Microsoft Edge
- Affects both MP4 and MKV files

**Root Cause:**
MKV (Matroska) video format is **NOT supported by HTML5 video players** or browsers. While some browsers may attempt to play MKV files, they are not guaranteed to work reliably.

### Issue 2: Videos Not Autoplaying in Firefox
**Symptoms:**
- Videos autoplay in Microsoft Edge but not in Firefox
- Only affects the gallery preview (not fullscreen)

**Root Cause:**
Browser-specific autoplay policies. Firefox has stricter autoplay restrictions than Edge.

---

## Solution

### 1. Convert MKV Videos to MP4 Format

**Why MP4?**
- MP4 (H.264) is universally supported by all modern browsers
- Works with HTML5 `<video>` element and Video.js
- Best compatibility across devices

**How to Convert:**

#### Option A: Using FFmpeg (Recommended)

1. **Install FFmpeg:**
   - **Windows:** Download from https://ffmpeg.org/download.html
   - **Mac:** `brew install ffmpeg`
   - **Linux:** `sudo apt-get install ffmpeg`

2. **Run the conversion script:**
   ```bash
   cd public/projects/project_complex_mapping_vibration
   python convert_videos.py
   ```

3. **Manual FFmpeg command** (if you prefer):
   ```bash
   ffmpeg -i input.mkv -c:v libx264 -c:a aac -strict experimental -b:a 192k -movflags +faststart output.mp4
   ```

#### Option B: Using Online Converters
- CloudConvert: https://cloudconvert.com/mkv-to-mp4
- FreeConvert: https://www.freeconvert.com/mkv-to-mp4
- Convertio: https://convertio.co/mkv-mp4/

### 2. Update Your Files

After conversion:

1. **Replace video files:**
   - Move MP4 files to the `videos/` folder
   - Remove or backup old MKV files

2. **Update `files.json`:**
   ```json
   {
     "id": 1,
     "name": "Video Name",
     "loc": "/projects/project_name/videos/video.mp4",  // Changed from .mkv
     "thumb": "/projects/project_name/images/thumb.png",
     "poster": "/projects/project_name/images/poster.png",
     "type": "video"
   }
   ```

---

## Technical Details

### Supported Video Formats

| Format | Extension | Browser Support | Recommended |
|--------|-----------|----------------|-------------|
| MP4 (H.264) | .mp4 | ✅ All browsers | ✅ Yes |
| WebM | .webm | ✅ Most browsers | ⚠️ Optional |
| OGG | .ogg, .ogv | ⚠️ Limited | ❌ No |
| MKV | .mkv | ❌ Not supported | ❌ No |

### Video.js Configuration

The following settings are configured in `LGComponent.tsx`:

```typescript
videojsOptions={{
  muted: false,        // Allow sound in fullscreen
  controls: true,      // Show player controls
  autoplay: false,     // Don't autoplay in lightbox
  preload: 'auto',     // Preload video metadata
  fluid: true,         // Responsive sizing
  playbackRates: [0.5, 1, 1.5, 2],  // Speed controls
}}
```

### Autoplay in Gallery Preview

For videos to autoplay in the gallery preview:
- Must be `muted`
- Must have `playsInline` attribute
- May still be blocked by browser policies

Current `VideoDock.tsx` settings:
```tsx
<video
  autoPlay
  loop
  muted          // Required for autoplay
  playsInline    // Required for mobile
  preload="metadata"
  // ... other attributes
/>
```

---

## Troubleshooting

### Videos Still Not Playing?

1. **Check browser console** for errors (F12 → Console tab)
2. **Verify video format:**
   ```bash
   ffprobe video.mp4
   ```
3. **Ensure file paths are correct** in `files.json`
4. **Check network tab** (F12 → Network) to see if videos are loading
5. **Try a different browser** to isolate browser-specific issues

### File Not Found Errors?

- Verify the video file exists at the path specified in `files.json`
- Check that the path starts with `/projects/` not `./projects/`
- Ensure Next.js is serving files from the `public/` folder

### Videos Load But Show Black Screen?

- The video codec might not be supported
- Re-encode with H.264 video and AAC audio:
  ```bash
  ffmpeg -i input.mp4 -c:v libx264 -c:a aac output.mp4
  ```

---

## Browser Compatibility Notes

### Firefox
- Stricter autoplay policies
- Requires user interaction for unmuted videos
- Full support for MP4 (H.264)

### Microsoft Edge / Chrome
- More lenient autoplay policies
- Full support for MP4 (H.264)
- Best performance with Video.js

### Safari
- Requires `playsInline` for inline playback
- Prefers MP4 with specific H.264 profiles
- May need `-pix_fmt yuv420p` flag in FFmpeg

---

## Project Structure

```
public/projects/project_complex_mapping_vibration/
├── files.json              # Gallery configuration
├── convert_videos.py       # Conversion script
├── images/                 # Image files and thumbnails
│   ├── *.png
│   └── ...
└── videos/                 # Video files (should be MP4)
    ├── *.mp4              # ✅ Supported
    └── *.mkv              # ❌ Not supported - convert these!
```

---

## Next Steps

1. Run `python convert_videos.py` in each project folder with MKV videos
2. Update all `files.json` to reference `.mp4` files
3. Test in multiple browsers (Firefox, Chrome, Edge)
4. Delete old MKV files to save space (optional)

---

## Questions?

If videos still don't play after conversion:
1. Check the browser console for specific errors
2. Verify the MP4 file plays in VLC or another video player
3. Ensure the conversion completed successfully
4. Try a simple test MP4 file to isolate the issue
