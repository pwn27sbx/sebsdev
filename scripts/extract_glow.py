import sys
from PIL import Image

def process_image(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    new_data = []

    for r, g, b, a in data:
        alpha = max(r, g, b)
        if alpha < 5:
            new_data.append((0, 0, 0, 0))
        else:
            r_new = int(r * 255 / alpha)
            g_new = int(g * 255 / alpha)
            b_new = int(b * 255 / alpha)
            # Boost alpha slightly to preserve glow intensity
            alpha_boost = min(255, int(alpha * 1.2))
            new_data.append((r_new, g_new, b_new, alpha_boost))

    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    process_image(sys.argv[1], sys.argv[2])
