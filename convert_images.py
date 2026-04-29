#!/usr/bin/env python3
"""
批量转换 PNG/JPG 为 WebP，输出到 assets/pages/processed/
用法: python3 convert_images.py
"""
from PIL import Image
import os

SRC_DIR = "assets/pages"
DST_DIR = "assets/pages/processed"

def convert():
    os.makedirs(DST_DIR, exist_ok=True)
    converted = []
    skipped = []

    for root, _, files in os.walk(SRC_DIR):
        for f in sorted(files):
            if f.lower().endswith(('.png', '.jpg', '.jpeg')):
                src = os.path.join(root, f)
                name = os.path.splitext(f)[0]
                dst = os.path.join(DST_DIR, name + ".webp")

                # 如果源文件已经在 processed/ 目录且目标也是同路径，跳过（避免原地转换循环）
                if root == os.path.abspath(DST_DIR):
                    continue

                img = Image.open(src)
                if img.mode in ('RGBA', 'P'):
                    img.save(dst, "WEBP", quality=85, method=6)
                else:
                    rgb_img = img.convert('RGB')
                    rgb_img.save(dst, "WEBP", quality=85, method=6)

                src_size = os.path.getsize(src)
                dst_size = os.path.getsize(dst)
                converted.append(f"{f} ({src_size/1024:.0f}KB) → {name}.webp ({dst_size/1024:.0f}KB)")

    print("=== Converted ===")
    for c in converted:
        print(c)
    if not converted:
        print("No new images found.")
    print(f"\nTotal: {len(converted)} files")

if __name__ == "__main__":
    convert()
