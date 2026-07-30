import sys
from PIL import Image

def process_image(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    new_data = []

    for item in data:
        r, g, b, a = item
        # Calculate luminance
        lum = (r + g + b) / 3
        
        # If it's very dark (black background), make it transparent
        if lum < 20:
            new_data.append((r, g, b, 0))
        else:
            # Keep original colors and alpha for the neon lines
            new_data.append((r, g, b, 255))

    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    process_image(sys.argv[1], sys.argv[2])
