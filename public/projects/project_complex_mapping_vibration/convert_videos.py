"""
Video Conversion Script for MKV to MP4

This script converts MKV video files to MP4 format for better browser compatibility.
MKV files are not natively supported by HTML5 video players or Video.js in browsers.

Requirements:
    pip install ffmpeg-python
    
    OR use ffmpeg command line directly (recommended):
    - Windows: Download from https://ffmpeg.org/download.html
    - Mac: brew install ffmpeg
    - Linux: sudo apt-get install ffmpeg

Usage:
    python convert_videos.py
"""

import os
import subprocess
from pathlib import Path

def convert_mkv_to_mp4(input_folder='videos', output_folder='videos_mp4'):
    """Convert all MKV files in input_folder to MP4 in output_folder"""
    
    # Create output folder if it doesn't exist
    Path(output_folder).mkdir(exist_ok=True)
    
    # Get all MKV files
    mkv_files = [f for f in os.listdir(input_folder) if f.endswith('.mkv')]
    
    if not mkv_files:
        print("No MKV files found in the videos folder.")
        return
    
    print(f"Found {len(mkv_files)} MKV files to convert...")
    
    for mkv_file in mkv_files:
        input_path = os.path.join(input_folder, mkv_file)
        output_filename = mkv_file.replace('.mkv', '.mp4')
        output_path = os.path.join(output_folder, output_filename)
        
        print(f"\nConverting: {mkv_file} -> {output_filename}")
        
        # FFmpeg command for conversion
        # -c:v copy: Copy video codec (fast, no re-encoding if possible)
        # -c:a aac: Convert audio to AAC (better browser support)
        # -strict experimental: Allow experimental codecs
        cmd = [
            'ffmpeg',
            '-i', input_path,
            '-c:v', 'libx264',  # Re-encode to H.264 for better compatibility
            '-c:a', 'aac',
            '-strict', 'experimental',
            '-b:a', '192k',
            '-movflags', '+faststart',  # Enable streaming
            output_path
        ]
        
        try:
            subprocess.run(cmd, check=True)
            print(f"✓ Successfully converted: {output_filename}")
        except subprocess.CalledProcessError as e:
            print(f"✗ Error converting {mkv_file}: {e}")
        except FileNotFoundError:
            print("\n✗ ERROR: FFmpeg not found!")
            print("Please install FFmpeg:")
            print("  Windows: Download from https://ffmpeg.org/download.html")
            print("  Mac: brew install ffmpeg")
            print("  Linux: sudo apt-get install ffmpeg")
            return
    
    print(f"\n✓ Conversion complete! MP4 files saved to '{output_folder}' folder")
    print("\nNext steps:")
    print("1. Move the MP4 files to replace the MKV files in the 'videos' folder")
    print("2. Update files.json to reference .mp4 instead of .mkv")
    print("3. Delete the old MKV files (optional)")

if __name__ == "__main__":
    convert_mkv_to_mp4()
