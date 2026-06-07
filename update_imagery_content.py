from pathlib import Path
from PIL import Image

root = Path('/home/ubuntu/sprk_work')
asset_dir = root / 'client' / 'public' / 'assets' / 'wireframe'
asset_dir.mkdir(parents=True, exist_ok=True)

light = Image.open('/home/ubuntu/upload/sprk_light_mockup_option1.png')
dark = Image.open('/home/ubuntu/upload/sprk_mockup_option1.png')

# Crops are derived from the visible mockup screenshots supplied by the user.
# They intentionally avoid re-viewing the images through the file viewer while preserving the prior exploration imagery.
light_crops = {
    'creator_aria_valk.png': (325, 116, 405, 200),
    'creator_kingmyron.png': (454, 116, 535, 200),
    'creator_lunadreams.png': (582, 116, 663, 200),
    'creator_itsdylan.png': (710, 116, 792, 200),
    'creator_melnotes.png': (840, 116, 922, 200),
    'creator_shotbykai.png': (968, 116, 1050, 200),
    'clip_balenciaga_human.png': (314, 303, 412, 474),
    'clip_skater.png': (432, 303, 532, 474),
    'clip_makeup_artist.png': (551, 303, 649, 474),
    'clip_basketball.png': (667, 303, 765, 474),
    'clip_neon_city.png': (784, 303, 883, 474),
    'clip_musician_human.png': (902, 303, 1001, 474),
    'clip_waterfall.png': (1016, 303, 1110, 474),
    'light_balenciaga_card.png': (322, 502, 657, 677),
    'light_elden_card.png': (322, 708, 657, 884),
}

dark_crops = {
    'dark_sprk_0025_hero.png': (404, 144, 1088, 448),
    'dark_cyberpunk_video.png': (387, 580, 1088, 807),
    'dark_trending_sneaker.png': (1185, 156, 1306, 247),
    'dark_trending_anime.png': (1185, 275, 1306, 367),
    'dark_trending_concert.png': (1185, 524, 1306, 615),
}

for name, box in light_crops.items():
    light.crop(box).save(asset_dir / name)
for name, box in dark_crops.items():
    dark.crop(box).save(asset_dir / name)

feed_path = root / 'client' / 'src' / 'data' / 'feedContent.ts'
text = feed_path.read_text()

replacements = {
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85': '/assets/wireframe/dark_sprk_0025_hero.png',
    'Fashion model in a dramatic streetwear editorial setting': 'SPRK 0025 streetwear creator from the dark wireframe mockup',
    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85': '/assets/wireframe/light_balenciaga_card.png',
    'Colorful streetwear garments hanging on a rack': 'Balenciaga drop card from the light wireframe mockup with a human streetwear model',
    'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=85': 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1200&q=85',
    'Gaming controller and keyboard lit by neon light': 'Diverse gaming creator immersed in a competitive setup',
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=85': 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=1200&q=85',
    'Cosplay performer in dramatic convention lighting': 'Expressive cosplay creator in a detailed handmade costume',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=85': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=85',
    'Musician performing on stage under red light': 'Up-and-coming musician performing with guitar in a warm live room',
    'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=85': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85',
    'Gaming mouse and keyboard on a desk': 'Esports creator testing hardware during a live competitive session',
}
for old, new in replacements.items():
    text = text.replace(old, new)

insert = '''
  {
    id: "makeup-artist-glow-map",
    author: "glowbyimani",
    community: "✦ /BeautyLab",
    time: "12 hours ago",
    title: "A make-up artist maps the glow: how I turned one client story into a look that photographed like memory.",
    deck: "A human-centered beauty breakdown where complexion, undertone, lighting, and identity stay visible from chair to final cut.",
    image: "/assets/wireframe/clip_makeup_artist.png",
    imageAlt: "Make-up artist portrait from the light wireframe short clip row",
    comments: "512",
    shares: "2.8K",
    likes: "14.6K",
    category: "beauty",
    contentType: "article",
    isAiAssisted: true,
    body: [
      "Imani starts every look with a listening pass before the palette opens. The client wanted softness, but not invisibility; color, but not costume. SPRK*OS translated the brief into lighting notes, undertone references, and a shot list that kept the artist's hand at the center.",
      "The article template turns a fifteen-second transformation clip into a fuller record of decisions: skin prep, shade matching, accessibility notes, and the emotional reason the final shimmer mattered.",
      "That is the high-empathy use case for AI assistance on SPRK. It does not flatten beauty into a trend; it helps a creator explain why one face, one room, and one story needed a specific kind of glow."
    ],
    quote: "The best beauty content does not erase the person under the look. It makes the person easier to see.",
    creatorBio: { name: "Imani Bello", handle: "@glowbyimani", metric: "390K Reach", survey: { culture: "Beauty Storytelling", vibe: "Warm / Precise", focus: "Inclusive Complexion Work" } }
  },
  {
    id: "up-next-musician-room-tone",
    author: "solsundays",
    community: "✦ /NewMusicRoom",
    time: "14 hours ago",
    title: "The first hook came from a laundromat voice memo. Now Sol is turning neighborhood sound into a debut EP.",
    deck: "An up-and-coming musician shows the person behind the sound: family harmonies, bus-stop melodies, and a release plan built for real listeners.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Up-and-coming musician performing with guitar in an intimate live room",
    comments: "287",
    shares: "1.1K",
    likes: "9.3K",
    category: "music",
    contentType: "article",
    isAiAssisted: true,
    body: [
      "Sol's breakout post is not a microphone glamour shot. It is a person in process: a notebook full of auntie phrases, a cracked guitar pick, and harmonies learned from cousins singing over a kitchen fan.",
      "SPRK*OS helped organize the release without replacing the vulnerability. The system pulled out chorus options, caption drafts, and community tags, but the creator chose the final emotional route: a small room, a real story, and a hook that sounds lived-in.",
      "For emerging musicians, empathy means the platform can hold context before virality arrives. Fans are not just hearing a song; they are meeting the conditions that made it possible."
    ],
    quote: "A debut does not need to look expensive to feel inevitable. It needs to feel like somebody real is arriving.",
    creatorBio: { name: "Sol Alvarez", handle: "@solsundays", metric: "118K Reach", survey: { culture: "Indie Soul", vibe: "Tender / Neighborhood", focus: "First EP Rollout" } }
  },
  {
    id: "michael-movie-review-empathy",
    author: "reelcareclub",
    community: "✦ /FilmRoom",
    time: "18 hours ago",
    title: "Review: Michael works best when it lets the myth breathe and remembers the person inside the choreography.",
    deck: "A high-relevance, high-empathy film review built for fans who need craft, context, memory, and care in the same place.",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "A vibrant concert crowd with performers and fans sharing a collective music moment",
    comments: "1.4K",
    shares: "4.7K",
    likes: "22.8K",
    category: "film",
    contentType: "article",
    isAiAssisted: true,
    body: [
      "The most useful way to review Michael is not to ask whether any film can contain the entire phenomenon. It cannot. The better question is whether the movie creates enough room for a human being to exist inside an image the world has already over-owned.",
      "At its strongest, the film treats performance as language rather than spectacle. Dance sequences carry biography, pressure, family inheritance, and the cost of precision. SPRK's AI-assisted notes help separate craft observations from reaction noise, giving fans a place to disagree without flattening grief, admiration, or critique.",
      "The review format matters because cultural memory is crowded. A high-empathy article can hold joy and discomfort at once, letting readers talk about choreography, childhood, celebrity, and accountability without turning a person into a content war."
    ],
    quote: "The film is most moving when the iconography stops performing certainty and lets uncertainty stay in the frame.",
    creatorBio: { name: "Nia Okafor", handle: "@reelcareclub", metric: "640K Reach", survey: { culture: "Film Criticism", vibe: "Careful / Fan-Literate", focus: "Music Biopics" } }
  },
  {
    id: "the-burroughs-netflix-op-ed",
    author: "streamingcommons",
    community: "✦ /TVCulture",
    time: "1 day ago",
    title: "Op-ed: Netflix's The Burroughs understands that family drama hits harder when the block has a memory.",
    deck: "A culturally aware television essay on neighborhood belonging, class pressure, and why ensemble shows need more than prestige lighting.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Diverse friends and neighbors gathered outdoors in a warm community setting",
    comments: "763",
    shares: "2.2K",
    likes: "12.1K",
    category: "television",
    contentType: "article",
    isAiAssisted: true,
    body: [
      "The Burroughs works because it treats place as a character with receipts. Every argument carries rent history, school history, migration history, and the tiny rituals that tell viewers who belongs before anyone says it out loud.",
      "SPRK's AI-assisted article layer is useful here because relevance is not just recap speed. The tool helps surface character arcs, community themes, and audience questions while leaving room for lived interpretation from viewers who recognize the stakes.",
      "The result is an op-ed that can praise the series for texture while still asking what happens when streaming platforms package neighborhood intimacy for scale. The show feels strongest when it trusts ordinary people to be cinematic."
    ],
    quote: "A neighborhood drama becomes powerful when the camera understands that the corner store, the stoop, and the family table are all archives.",
    creatorBio: { name: "Darius Bell", handle: "@streamingcommons", metric: "410K Reach", survey: { culture: "Television Essays", vibe: "Community-Literate", focus: "Ensemble Drama" } }
  },
'''

marker = '\n];\n\nexport function getFeedPost'
if 'id: "michael-movie-review-empathy"' not in text:
    text = text.replace(marker, ',' + insert + '];\n\nexport function getFeedPost')

feed_path.write_text(text)
print('Updated wireframe crops and feed content at', asset_dir)
