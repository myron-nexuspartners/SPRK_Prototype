from PIL import Image
from pathlib import Path
src = Image.open('/home/ubuntu/upload/sprk_light_mockup_option1.png')
out = Path('client/public/assets/wireframe')
out.mkdir(parents=True, exist_ok=True)
# Tighter, face-centered crops from the provided light mockup creator row.
# Each crop intentionally avoids the original circular UI border so the app-level circular avatar shows the person clearly.
crops = {
    'creator_aria_valk.png': (338, 126, 397, 188),
    'creator_kingmyron.png': (468, 127, 526, 188),
    'creator_lunadreams.png': (594, 123, 656, 189),
    'creator_itsdylan.png': (723, 126, 782, 188),
    'creator_melnotes.png': (851, 126, 911, 188),
    'creator_shotbykai.png': (976, 126, 1038, 188),
}
for name, box in crops.items():
    img = src.crop(box).resize((360, 360), Image.Resampling.LANCZOS)
    img.save(out / name)
print('Regenerated creator crops:', ', '.join(crops.keys()))
