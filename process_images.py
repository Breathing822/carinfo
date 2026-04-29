#!/usr/bin/env python3
"""
Batch process vehicle brochure images into unified brand-style card thumbnails.
Strategy: crop top headline area → place vehicle on brand gradient canvas
→ add glow, reflection, and subtle decoration.
"""

import os
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

INPUT_DIR = "assets/pages"
OUTPUT_DIR = "assets/pages/processed"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Brand colors
BRAND_BG_TOP = (247, 245, 237)      # #f7f5ed
BRAND_BG_BOTTOM = (231, 236, 239)   # #e7ecef
BRAND_GREEN = (13, 95, 82)          # #0d5f52
BRAND_GOLD = (184, 135, 61)         # #b8873d

CANVAS_W, CANVAS_H = 1200, 720


def draw_gradient_bg(draw, w, h):
    """Vertical subtle gradient from top to bottom."""
    for y in range(h):
        ratio = y / h
        r = int(BRAND_BG_TOP[0] * (1 - ratio) + BRAND_BG_BOTTOM[0] * ratio)
        g = int(BRAND_BG_TOP[1] * (1 - ratio) + BRAND_BG_BOTTOM[1] * ratio)
        b = int(BRAND_BG_TOP[2] * (1 - ratio) + BRAND_BG_BOTTOM[2] * ratio)
        draw.line([(0, y), (w, y)], fill=(r, g, b))


def draw_brand_glow(canvas):
    """Add a subtle brand-colored radial glow in top-right corner."""
    glow = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    cx, cy = int(CANVAS_W * 0.82), int(CANVAS_H * 0.18)
    max_r = 420
    for r in range(max_r, 0, -2):
        alpha = int(18 * (1 - r / max_r))
        color = (*BRAND_GOLD, alpha)
        glow_draw.ellipse(
            [cx - r, cy - r, cx + r, cy + r],
            fill=color,
        )
    canvas = Image.alpha_composite(canvas, glow)

    # Second subtle green glow bottom-left
    glow2 = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    glow2_draw = ImageDraw.Draw(glow2)
    cx2, cy2 = int(CANVAS_W * 0.15), int(CANVAS_H * 0.85)
    max_r2 = 320
    for r in range(max_r2, 0, -2):
        alpha = int(12 * (1 - r / max_r2))
        color = (*BRAND_GREEN, alpha)
        glow2_draw.ellipse(
            [cx2 - r, cy2 - r, cx2 + r, cy2 + r],
            fill=color,
        )
    canvas = Image.alpha_composite(canvas, glow2)
    return canvas


def draw_top_light(canvas):
    """A soft white light gradient from the top."""
    light = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    light_draw = ImageDraw.Draw(light)
    for y in range(180):
        alpha = int(35 * (1 - y / 180))
        light_draw.line([(0, y), (CANVAS_W, y)], fill=(255, 255, 255, alpha))
    return Image.alpha_composite(canvas, light)


def add_reflection(canvas, vehicle_img, paste_x, paste_y):
    """Add a subtle reflection below the vehicle."""
    vw, vh = vehicle_img.size
    # Take bottom 22% of vehicle
    reflect_h = int(vh * 0.22)
    reflect = vehicle_img.crop((0, vh - reflect_h, vw, vh))
    reflect = reflect.transpose(Image.FLIP_TOP_BOTTOM)

    # Create gradient mask for reflection (fade out)
    mask = Image.new("L", (vw, reflect_h), 0)
    mask_draw = ImageDraw.Draw(mask)
    for y in range(reflect_h):
        alpha = int(90 * (1 - y / reflect_h))
        mask_draw.line([(0, y), (vw, y)], fill=alpha)

    # Blur reflection slightly
    reflect = reflect.filter(ImageFilter.GaussianBlur(radius=2))

    canvas.paste(reflect, (paste_x, paste_y + vh + 4), mask)
    return canvas


def add_vignette(canvas):
    """Subtle dark vignette around edges to draw eye to center."""
    vig = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    vig_draw = ImageDraw.Draw(vig)
    cx, cy = CANVAS_W // 2, CANVAS_H // 2
    max_dist = ((cx ** 2) + (cy ** 2)) ** 0.5
    for r in range(int(max_dist), int(max_dist * 0.55), -4):
        alpha = int(30 * ((r - max_dist * 0.55) / (max_dist * 0.45)))
        vig_draw.ellipse(
            [cx - r, cy - r, cx + r, cy + r],
            outline=(0, 0, 0, alpha),
        )
    return Image.alpha_composite(canvas, vig)


def add_decoration(canvas):
    """Minimalist brand decoration: thin gold line top-left."""
    deco = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    deco_draw = ImageDraw.Draw(deco)
    # Horizontal thin line
    deco_draw.line([(40, 40), (140, 40)], fill=(*BRAND_GOLD, 80), width=2)
    # Small circle accent
    deco_draw.ellipse([40, 50, 48, 58], fill=(*BRAND_GREEN, 60))
    return Image.alpha_composite(canvas, deco)


def process_image(filename):
    input_path = os.path.join(INPUT_DIR, filename)
    output_path = os.path.join(OUTPUT_DIR, filename)

    print(f"Processing {filename}...")

    # Open original
    orig = Image.open(input_path).convert("RGBA")
    w, h = orig.size

    # Crop top 42% and bottom 14% to remove all headline & footer text
    crop_top = int(h * 0.42)
    crop_bottom = int(h * 0.86)
    vehicle = orig.crop((0, crop_top, w, crop_bottom))

    # Enhance: slight contrast boost, slight saturation reduction for unity
    vehicle = ImageEnhance.Contrast(vehicle).enhance(1.08)
    vehicle = ImageEnhance.Color(vehicle).enhance(0.92)

    # Create canvas
    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), (*BRAND_BG_TOP, 255))
    draw = ImageDraw.Draw(canvas)
    draw_gradient_bg(draw, CANVAS_W, CANVAS_H)

    # Brand glows
    canvas = draw_brand_glow(canvas)

    # Top light
    canvas = draw_top_light(canvas)

    # Resize vehicle to fit nicely
    vw, vh = vehicle.size
    target_w = int(CANVAS_W * 0.86)
    target_h = int(vh * (target_w / vw))

    # If too tall, constrain by height
    max_h = int(CANVAS_H * 0.72)
    if target_h > max_h:
        target_h = max_h
        target_w = int(vw * (target_h / vh))

    vehicle_resized = vehicle.resize((target_w, target_h), Image.LANCZOS)

    # Compute paste position (center horizontally, bottom-aligned with padding)
    paste_x = (CANVAS_W - target_w) // 2
    paste_y = CANVAS_H - target_h - 55

    # Feather mask for top & bottom edges (blend into background)
    mask = Image.new("L", (target_w, target_h), 255)
    mask_draw = ImageDraw.Draw(mask)
    # Bottom feather
    b_feather = int(target_h * 0.12)
    for y in range(b_feather):
        alpha = int(255 * (y / b_feather))
        mask_draw.line(
            [(0, target_h - b_feather + y), (target_w, target_h - b_feather + y)],
            fill=alpha,
        )
    # Top feather (hide remaining headline text)
    t_feather = int(target_h * 0.22)
    for y in range(t_feather):
        alpha = int(255 * (1 - y / t_feather))
        mask_draw.line(
            [(0, y), (target_w, y)],
            fill=alpha,
        )

    # Add reflection BEFORE pasting vehicle (so reflection is behind)
    canvas = add_reflection(canvas, vehicle_resized, paste_x, paste_y)

    # Paste vehicle with feather mask
    canvas.paste(vehicle_resized, (paste_x, paste_y), mask)

    # Subtle shadow behind vehicle (simple dark ellipse)
    shadow = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    sw, sh = target_w + 60, 30
    sx = (CANVAS_W - sw) // 2
    sy = paste_y + target_h + 8
    for r in range(15, 0, -1):
        alpha = int(25 * (r / 15))
        shadow_draw.ellipse([sx + r, sy + r, sx + sw - r, sy + sh - r], fill=(0, 0, 0, alpha))
    canvas = Image.alpha_composite(canvas, shadow)

    # Vignette
    canvas = add_vignette(canvas)

    # Decoration
    canvas = add_decoration(canvas)

    # Composite to final RGB
    final = Image.new("RGB", (CANVAS_W, CANVAS_H), BRAND_BG_TOP)
    final.paste(canvas, (0, 0), canvas)

    # Very subtle sharpen
    final = final.filter(ImageFilter.UnsharpMask(radius=1, percent=80, threshold=3))

    final.save(output_path, "PNG", optimize=True)
    print(f"  → Saved {output_path}")


def main():
    files = [f for f in os.listdir(INPUT_DIR) if f.lower().endswith(".png")]
    files.sort()
    print(f"Found {len(files)} images to process.\n")
    for f in files:
        process_image(f)
    print("\nAll done!")


if __name__ == "__main__":
    main()
