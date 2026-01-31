from PIL import Image, ImageDraw
import os

# Create images directory if not exists
os.makedirs('images', exist_ok=True)

# List of image files to create
images = ['bike1.jpg', 'bike2.jpg', 'bike3.jpg', 'bmx-pro.jpg', 'cruiser-lady.jpg', 'mountain-elite.jpg', 'helmet.jpg', 'lock.jpg', 'about.jpg']

# Create simple placeholder images for each
colors = [
    (255, 107, 53),   # Primary accent
    (247, 147, 30),   # Secondary accent
    (0, 212, 255),    # Neon cyan
    (179, 0, 255),    # Neon purple
    (0, 255, 65),     # Neon green
    (245, 245, 245),  # Light gray
    (26, 26, 26),     # Dark gray
    (255, 152, 0),    # Warning
    (76, 175, 80),    # Success
]

for idx, img_name in enumerate(images):
    # Create image with gradient-like effect
    img = Image.new('RGB', (400, 300), color=colors[idx % len(colors)])
    draw = ImageDraw.Draw(img)
    
    # Add text
    text = img_name.replace('.jpg', '').replace('-', ' ').upper()
    draw.text((200, 140), text, fill=(255, 255, 255), anchor="mm")
    draw.text((200, 170), "SE BIKES", fill=(255, 255, 255), anchor="mm")
    
    # Save image
    img.save(f'images/{img_name}')
    print(f'Created {img_name}')

print('All placeholder images created successfully!')
