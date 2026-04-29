#!/usr/bin/env python3
"""
批量转换 PNG/JPG 为 WebP，输出到 assets/pages/processed/
自动删除已转换的源文件
用法: python3 convert_images.py
"""
from PIL import Image
import os

PROC = "assets/pages/processed"
ROOT = "assets/pages"

def convert():
    os.makedirs(PROC, exist_ok=True)
    converted = []
    removed = []

    # 扫描根目录和 processed/ 目录下的所有 PNG/JPG
    for folder in [ROOT, PROC]:
        for f in sorted(os.listdir(folder)):
            if f.lower().endswith(('.png', '.jpg', '.jpeg')):
                src = os.path.join(folder, f)
                name = os.path.splitext(f)[0]
                dst = os.path.join(PROC, name + ".webp")

                img = Image.open(src)
                if img.mode in ('RGBA', 'P'):
                    img.save(dst, "WEBP", quality=85, method=6)
                else:
                    rgb_img = img.convert('RGB')
                    rgb_img.save(dst, "WEBP", quality=85, method=6)

                src_size = os.path.getsize(src)
                dst_size = os.path.getsize(dst)
                converted.append(f"{f} ({src_size/1024:.0f}KB) → {name}.webp ({dst_size/1024:.0f}KB)")

                # 删除源文件
                os.remove(src)
                removed.append(src)

    print("=== Converted ===")
    for c in converted:
        print(c)
    if not converted:
        print("No new images found.")
    print(f"\nTotal converted: {len(converted)}")
    print(f"Total removed: {len(removed)}")

if __name__ == "__main__":
    convert()
