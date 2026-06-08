export interface FeedPost {
  id: string;
  author: string;
  community: string;
  time: string;
  title: string;
  deck: string;
  image: string;
  imageAlt: string;
  comments: string;
  shares: string;
  likes: string;
  category: string;
  contentType: "article" | "video" | "shorts" | "tool";
  isAiAssisted?: boolean;
  sponsored?: boolean;
  cta?: string;
  body: string[];
  quote?: string;
  creatorBio: {
    name: string;
    handle: string;
    metric: string;
    survey: {
      culture: string;
      vibe: string;
      focus: string;
    };
  };
}

export const feedPosts: FeedPost[] = [
{
    id: "sprk-0025",
    author: "Generra_Sprrkles",
    community: "↑ /FashionDrops",
    time: "3 hours ago",
    title: "Yoouu Already knowwww! The SPRK 0025 collection is LIVE!",
    deck: "A new collection has arrived for creators, collectors, and authentic passion populations ready to turn launch-day energy into shared culture.",
    image: "/SPRK_Prototype/assets/wireframe/ProtoSPRK0025.png",
    imageAlt: "Hip young Black man in sunglasses and denim presenting the SPRK 0025 collection hero",
    comments: "67",
    shares: "1.2K",
    likes: "842",
    category: "fashion",
    contentType: "article",
    sponsored: false,
    cta: "Shop the drop",
    body: [
      "It has only been a few months, but SPRK is all the way live thanks to a thriving community of passionate doers, thinkers, makers, and breakers. The brands that believe like us and swag like us collaborate with us because culture has a signature, and this release carries it in full.",
      "From sneakers with NB and our SPRK*Telfair bag, to the SPRK*Supreme decks and LVMH*SPRK hoods, 25 partners, 25 clues, and 2,500 items form the first connected scavenger hunt across the SPRK ecosystem.",
      "Start the scavenger hunt inside Pavilion, where exclusive sale windows open for members and shakers. Use code COLLAB to enter and see what the movers and makers do next."
    ],
    quote: "The release is not just a product moment. It is a proof point for what happens when creators own the runway, the room, and the receipt.",
    creatorBio: {
      name: "Generra Sprrkles",
      handle: "@Generra_Sprrkles",
      metric: "890K Reach",
      survey: { culture: "Streetwear Drops", vibe: "Premium", focus: "Collaborative Commerce" }
    }
  },
{
    id: "makeup-artist-glow-map",
    author: "glowbyimani",
    community: "✦ /BeautyLab",
    time: "12 hours ago",
    title: "A make-up artist maps the glow: how I turned one client story into a look that photographed like memory.",
    deck: "A human-centered beauty breakdown where complexion, undertone, lighting, and identity stay visible from chair to final cut.",
    image: "/SPRK_Prototype/assets/wireframe/home_makeup_artist_live.png",
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
    id: "balenciaga-drop-cards",
    author: "streetwear_drop",
    community: "✦ /FashionDrops",
    time: "2 hours ago",
    title: "SPRK x Balenciaga drop goes live with a photoreal hoodie campaign built for the open-norm runway.",
    deck: "A creator-first streetwear launch turns a luxury hoodie moment into a warmer, more inclusive culture signal.",
    image: "/SPRK_Prototype/assets/wireframe/home_balenciaga_hoodie_drop.png",
    imageAlt: "Photorealistic creator wearing a SPRK x Balenciaga-style hoodie in a bright city plaza",
    comments: "2.1K",
    shares: "16K",
    likes: "12.4K",
    category: "fashion",
    contentType: "article",
    sponsored: true,
    cta: "Claim drop card",
    body: [
      "Balenciaga and SPRK have officially unlocked the next generation of streetwear activation. This drop features redemption cards that grant holders priority access to physical garments and creator-hosted styling rooms.",
      "The drop is built around public discovery but private ownership. Every share, save, and Pavilion RSVP becomes part of a transparent launch graph that creators can reference before they sign the next collaboration.",
      "To participate, creators connect their yourSPRK profile, choose a drop lane, and claim a card before the public tier opens. The result is a commerce mechanic that feels like culture instead of inventory management."
    ],
    quote: "Drops work when the community can see the rules, feel the scarcity, and trust that creators share in the upside.",
    creatorBio: { name: "Aria 'Valkyrie' Chen", handle: "@aria_valk", metric: "450K Reach", survey: { culture: "Cyberpunk / Techwear", vibe: "Aesthetic", focus: "Sneaker Drops" } }
  },
{
    id: "trans-fashion-designer-open-norm",
    author: "ateliernova",
    community: "✦ /OpenNormFashion",
    time: "8 hours ago",
    title: "A transfeminine fashion designer shares how one jacket became a story about fit, safety, and being seen.",
    deck: "Inside a warm atelier where identity, patternmaking, and community feedback turn a garment fitting into proof of belonging.",
    image: "/SPRK_Prototype/assets/wireframe/home_trans_fashion_designer.png",
    imageAlt: "Transfeminine fashion designer fitting a crimson-orange jacket on a dress form",
    comments: "689",
    shares: "3.6K",
    likes: "18.2K",
    category: "fashion",
    contentType: "article",
    isAiAssisted: true,
    body: [
      "Nova calls the jacket a memoir with seams. The shoulder line changed after a community fitting, the lining color came from a childhood room, and the final silhouette was built to feel protective without hiding the person wearing it.",
      "SPRK turns that process into context instead of flattening it into a trend. The article holds sketches, fit notes, fabric references, and the designer's own language around safety, glamour, and being recognized in public.",
      "That is the open-norm ecosystem at work: content, commerce, and community making room for creators whose stories have too often been edited out of the frame."
    ],
    quote: "Fit is technical, but belonging is the brief.",
    creatorBio: { name: "Nova Reyes", handle: "@ateliernova", metric: "520K Reach", survey: { culture: "Open-Norm Fashion", vibe: "Warm / Defiant", focus: "Story-Led Design" } }
  },
{
    id: "crimson-dawn-blindfolded",
    author: "ingaming",
    community: "✦ /CrimsonDawn",
    time: "4 hours ago",
    title: "Crimson Dawn's first blindfolded boss clear turned a live-stream into a full community ritual.",
    deck: "A bright, high-energy creator breakdown of the run, chat-driven route voting, and the exact ten-second clip that broke the feed.",
    image: "/SPRK_Prototype/assets/wireframe/home_crimson_dawn_game_stream.png",
    imageAlt: "Gaming creator celebrating a Crimson Dawn boss clear on stream",
    comments: "902",
    shares: "88",
    likes: "5.8K",
    category: "gaming",
    contentType: "video",
    body: [
      "It took 14 hours, three broken controllers, and an absolute miracle, but the blindfolded Crimson Dawn boss clear is officially complete. The community voted live on boss routes, recovery windows, and one dangerously ambitious no-hit detour.",
      "The run became a showcase for why SPRK clips need context. A single highlight carried the spectacle, but the article template lets the creator document preparation, risk, and the collaborative mechanics that made the moment legible.",
      "SPRK*OS now packages the run into short hooks, long-form recap notes, and sponsor-safe overlays without removing the original creator voice."
    ],
    quote: "The best gaming content does not just show the win. It shows the room that helped build the attempt.",
    creatorBio: { name: "Myron 'KingMyron' Sterling", handle: "@kingmyron", metric: "1.2M Reach", survey: { culture: "Crimson Dawn Runs", vibe: "High-Octane", focus: "Action RPGs" } }
  },
{
    id: "cyberpunk-netrunner-build",
    author: "cosplay_nexus",
    community: "✦ /AnimeExpo",
    time: "1 day ago",
    title: "Full cosplay showcase of my custom Cyberpunk netrunner build from Momo Con 2026.",
    deck: "A fiber-optic fabrication process breakdown for builders who want the glow without losing mobility.",
    image: "/SPRK_Prototype/assets/wireframe/home_black_woman_cosplay.png",
    imageAlt: "Black woman creator wearing custom cyberpunk cosplay on a convention floor",
    comments: "407",
    shares: "318",
    likes: "8.1K",
    category: "anime",
    contentType: "shorts",
    body: [
      "The illuminated netrunner suit started as a sketch and became a six-week build involving foam shaping, translucent panel tests, and a custom Arduino controller synchronized to live-stream triggers.",
      "Instead of posting a finished look without context, the creator used the article template to show costs, failures, and the signal path from first concept to convention floor reveal.",
      "The final build proves that cosplay documentation can be technical, emotional, and commerce-ready without becoming a generic tutorial."
    ],
    quote: "Process is not extra content. For builders, process is the proof of authorship.",
    creatorBio: { name: "Yuki 'Momo_Cos' Tanaka", handle: "@yuki_momo", metric: "680K Reach", survey: { culture: "Cosplay Fabrication", vibe: "Creative", focus: "Cyberpunk Builds" } }
  },
{
    id: "michael-movie-review-empathy",
    author: "reelcareclub",
    community: "✦ /FilmRoom",
    time: "6 hours ago",
    title: "Review: Michael works best when it lets the myth breathe and remembers the person inside the choreography.",
    deck: "A high-relevance, high-empathy film review built for fans who need craft, context, memory, and care in the same place.",
    image: "/SPRK_Prototype/assets/wireframe/home_michael_movie_review.png",
    imageAlt: "Black woman film critic taking notes during a music-biopic screening",
    comments: "1.4K",
    shares: "4.7K",
    likes: "22.8K",
    category: "film",
    contentType: "article",
    isAiAssisted: true,
    body: [
      "The most useful way to review a legacy performance is not to ask whether any film can contain the entire phenomenon. It cannot. The better question is whether the work creates enough room for a human being to exist inside an image the world has already over-owned.",
      "At its strongest, the film treats performance as language rather than spectacle. Dance sequences carry biography, pressure, family inheritance, and the cost of precision. SPRK's AI-assisted notes help separate craft observations from reaction noise, giving fans a place to disagree without flattening grief, admiration, or critique.",
      "The review format matters because cultural memory is crowded. A high-empathy article can hold joy and discomfort at once, letting readers talk about choreography, childhood, celebrity, and accountability without turning a person into a content war."
    ],
    quote: "The film is most moving when the iconography stops performing certainty and lets uncertainty stay in the frame.",
    creatorBio: { name: "Nia Okafor", handle: "@reelcareclub", metric: "640K Reach", survey: { culture: "Film Criticism", vibe: "Careful / Fan-Literate", focus: "Music Biopics" } }
  },
{
    id: "hiphop-short-form-structures",
    author: "hiphop_central",
    community: "✦ /HipHopVibe",
    time: "4 days ago",
    title: "The death of the 16-bar verse: how short-form video algorithms are reshaping modern song structures.",
    deck: "A music-tech essay on hook-first writing, creator distribution, and what artists lose when songs start at the chorus.",
    image: "/SPRK_Prototype/assets/wireframe/home_16_bar_verse.png",
    imageAlt: "Up-and-coming musician performing with guitar in a warm live room",
    comments: "310",
    shares: "245",
    likes: "4.4K",
    category: "music",
    contentType: "article",
    isAiAssisted: true,
    body: [
      "With the average listener attention span shrinking, producers are ditching the classic intro-verse-chorus-verse structure in favor of immediate, hook-first designs engineered for replay and remix.",
      "The shift is not just musical. It changes contracts, creator strategy, and the kind of emotional patience audiences bring to a record.",
      "SPRK communities are using article posts to preserve context around singles that first appear as fragments, dances, or meme loops."
    ],
    quote: "The verse is not dead, but it is negotiating with the feed.",
    creatorBio: { name: "Metro Synth", handle: "@metro_synth", metric: "320K Reach", survey: { culture: "Hip-Hop Production", vibe: "Analytical", focus: "Music Tech & Trends" } }
  },
{
    id: "creator-guidelines-meme",
    author: "giga_chuckle",
    community: "✦ /Humor",
    time: "5 days ago",
    title: "When the brand asks for organic TikTok vibes but hands you a 45-page PDF of strict script guidelines.",
    deck: "A creator economy comedy post that doubles as a warning about over-managed authenticity.",
    image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Person laughing while looking at a laptop",
    comments: "188",
    shares: "94",
    likes: "3.2K",
    category: "humor",
    contentType: "shorts",
    body: [
      "We have all been there. Brand: just make it feel like a casual vlog. Also brand: please say the phrase integrated lifestyle optimization paradigm exactly three times in the first four seconds.",
      "The joke landed because it names a real tension. Creators are hired for instinct, but too many campaigns bury that instinct under compliance language that audiences can smell immediately.",
      "Pavilion workflows are designed to clarify rights, deliverables, and approvals before the creator voice gets sanded down."
    ],
    quote: "Authenticity cannot be added in post after the brief has already removed it.",
    creatorBio: { name: "Alex 'Chuckle' Miller", handle: "@giga_chuckle", metric: "180K Reach", survey: { culture: "Creator Comedy", vibe: "Satirical", focus: "Industry Memes" } }
  },
{
    id: "rtfkt-nike-secondary-market",
    author: "sneaker_head",
    community: "✦ /FashionDrops",
    time: "6 days ago",
    title: "RTFKT x Nike Clone X Sneaker Drops: secondary market prices surge after redemption closes.",
    deck: "A market-tracking article on hybrid physical-digital assets, collector psychology, and drop scarcity.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Bright red sneakers on a matching background",
    comments: "290",
    shares: "112",
    likes: "6.5K",
    category: "fashion",
    contentType: "article",
    isAiAssisted: true,
    body: [
      "Now that the physical redemption window is locked, rare sneaker models have become premium collector pieces. The market is moving quickly, but the story is bigger than price charts.",
      "Hybrid assets reveal how fans assign value to proof, participation, and future access. The strongest drops give collectors a reason to hold that is not limited to resale speculation.",
      "SPRK article posts make those dynamics visible by pairing trend data with community commentary and creator-led interpretation."
    ],
    quote: "A drop becomes durable when ownership has memory, not just scarcity.",
    creatorBio: { name: "Marcus 'Sole' Vance", handle: "@sneaker_head", metric: "510K Reach", survey: { culture: "Sneaker Investing", vibe: "Informative", focus: "Web3 Streetwear" } }
  },
{
    id: "neo-tokyo-shader-study",
    author: "concept_craft",
    community: "✦ /SciFiAnticipation",
    time: "8 days ago",
    title: "Neo-Tokyo 2099 skylines: a comprehensive matte painting study using custom neural shaders.",
    deck: "A visual workflow article about rain reflections, neon atmosphere, and concept art systems inside SPRK*OS.",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Person playing a video game in a neon-lit room",
    comments: "72",
    shares: "41",
    likes: "1.8K",
    category: "art",
    contentType: "tool",
    isAiAssisted: true,
    body: [
      "The matte painting began as a single skyline plate and expanded through layered rain maps, volumetric light passes, and neural shader experiments inside SPRK*OS.",
      "This walkthrough shows how creators can keep authorship visible even when AI tools accelerate iteration. The prompt stack is documented alongside manual paintovers and final grading choices.",
      "The result is a workflow that treats AI as studio infrastructure rather than a substitute for taste."
    ],
    quote: "The future of creative tooling is not faster sameness. It is traceable iteration with room for taste.",
    creatorBio: { name: "Sarah 'Concept' Chen", handle: "@concept_craft", metric: "240K Reach", survey: { culture: "Sci-Fi Concept Art", vibe: "Educational", focus: "Neural Shading" } }
  },
{
    id: "sprk-os-touch-grass",
    author: "dev_struggles",
    community: "✦ /Humor",
    time: "10 days ago",
    title: "I asked SPRK*OS to optimize my code pipeline and it sent me a notification to touch grass.",
    deck: "A developer lifestyle post about burnout, automation, and the unexpected value of humane tooling.",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Developer workstation with code on monitors",
    comments: "420",
    shares: "310",
    likes: "7.3K",
    category: "technology",
    contentType: "article",
    body: [
      "I spent six hours trying to refactor my rendering loops. I finally ran the SPRK*OS diagnostic agent, and the very first recommendation was: your screen time is fourteen hours today. Touch grass and sleep. The loop is fine.",
      "The post went viral because the joke contains a product truth. Tools that understand creators should optimize the system around the human, not just the output artifact.",
      "The best content editor is not another dashboard demanding attention. It is a workspace that can protect creative energy while still shipping polished work."
    ],
    quote: "The humane tool is the one brave enough to tell you the pipeline is not the bottleneck.",
    creatorBio: { name: "Dev Struggles", handle: "@dev_struggles", metric: "95K Reach", survey: { culture: "Tech Humor", vibe: "Sarcastic", focus: "Developer Lifestyle" } }
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
    id: "community-dance-review-empathy",
    author: "reelcareclub",
    community: "✦ /CultureRoom",
    time: "18 hours ago",
    title: "When a dance review remembers the room, fans get craft, context, and care without losing joy.",
    deck: "A high-empathy culture essay built for audiences who need memory, movement, and disagreement in the same place.",
    image: "/SPRK_Prototype/assets/wireframe/home_dance_review.png",
    imageAlt: "Bright concert and dance crowd moment with community energy",
    comments: "1.4K",
    shares: "4.7K",
    likes: "22.8K",
    category: "film",
    contentType: "article",
    isAiAssisted: true,
    body: [
      "The most useful way to review a legacy performance is not to ask whether any film can contain the entire phenomenon. It cannot. The better question is whether the work creates enough room for a human being to exist inside an image the world has already over-owned.",
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
  }

];

export function getFeedPost(id?: string) {
  return feedPosts.find((post) => post.id === id) ?? feedPosts[0];
}
