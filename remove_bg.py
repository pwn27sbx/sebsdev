import sys
from PIL import Image

def remove_black_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        r, g, b, a = item
        # Calculate luminance (simple average or perceived)
        lum = (r + g + b) / 3
        
        # If it's pure black or very dark, make it transparent
        if lum < 15:
            new_data.append((r, g, b, 0))
        else:
            # Map luminance to alpha for smooth blending of glows
            # We want full color but alpha adjusted
            # if luminance is low, it becomes semi-transparent
            alpha = int(min(255, lum * 2))
            new_data.append((r, g, b, alpha))
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    remove_black_background(sys.argv[1], sys.argv[2])
