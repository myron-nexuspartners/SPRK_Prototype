from PIL import Image
from pathlib import Path
src = Image.open('/home/ubuntu/upload/sprk_light_mockup_option1.png')
out = Path('client/public/assets/wireframe')
out.mkdir(parents=True, exist_ok=True)
# Coordinates are scaled from the displayed mockup screenshot to the 2560x1440 attachment dimensions.
scale = 2560 / 1560
centers_display = {
    'creator_aria_valk.png': (365, 158),
    'creator_kingmyron.png': (493, 158),
    'creator_lunadreams.png': (622, 158),
    'creator_itsdylan.png': (750, 158),
    'creator_melnotes.png': (877, 158),
    'creator_shotbykai.png': (1005, 158),
}
size = 92
for name, (xd, yd) in centers_display.items():
    cx, cy = int(xd * scale), int(yd * scale)
    half = int(size * scale / 2)
    box = (cx-half, cy-half, cx+half, cy+half)
    img = src.crop(box).resize((360, 360), Image.Resampling.LANCZOS)
    img.save(out / name)
    print(name, box)
