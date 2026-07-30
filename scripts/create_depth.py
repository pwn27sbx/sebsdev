import sys
from PIL import Image, ImageFilter, ImageOps

def create_depth_map(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    
    # Extract alpha channel to use as base for depth
    r, g, b, a = img.split()
    
    # The solid parts of the mask should be the highest (white)
    # We will just use the alpha channel
    depth = a.copy()
    
    # Blur heavily to create a smooth slope rather than jagged spikes
    # A large blur radius creates a nice smooth bulge
    depth = depth.filter(ImageFilter.GaussianBlur(radius=15))
    
    # Increase contrast so the center is pure white
    depth = ImageOps.autocontrast(depth)
    
    depth.save(output_path, "PNG")

if __name__ == "__main__":
    create_depth_map(sys.argv[1], sys.argv[2])
