"""
Generate short placeholder audio files for SPRK*Studio music presets.
These are simple synthesized beats that demonstrate the UI without requiring
licensed music downloads. In production, replace with actual licensed tracks.
"""
import wave
import struct
import math
import os

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'client', 'public', 'assets', 'audio')
os.makedirs(OUTPUT_DIR, exist_ok=True)

SAMPLE_RATE = 44100
DURATION = 30  # 30 seconds each

def write_wav(filename, frames):
    path = os.path.join(OUTPUT_DIR, filename)
    with wave.open(path, 'w') as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(SAMPLE_RATE)
        f.writeframes(frames)
    print(f"Written: {path} ({os.path.getsize(path)} bytes)")

def generate_beat(bpm, freq_pattern, duration=DURATION):
    """Generate a simple beat pattern."""
    total_samples = SAMPLE_RATE * duration
    beat_interval = int(SAMPLE_RATE * 60 / bpm)
    frames = []
    
    for i in range(total_samples):
        beat_pos = i % beat_interval
        beat_phase = beat_pos / beat_interval
        
        # Base frequency
        freq_idx = (i // beat_interval) % len(freq_pattern)
        freq = freq_pattern[freq_idx]
        
        # Envelope: sharp attack, quick decay
        if beat_phase < 0.02:
            env = beat_phase / 0.02
        elif beat_phase < 0.15:
            env = 1.0 - (beat_phase - 0.02) / 0.13 * 0.7
        else:
            env = 0.3 * (1 - beat_phase)
        
        # Synthesize tone
        sample = env * 0.4 * math.sin(2 * math.pi * freq * i / SAMPLE_RATE)
        # Add sub-bass
        sample += env * 0.3 * math.sin(2 * math.pi * (freq * 0.5) * i / SAMPLE_RATE)
        # Add harmonic
        sample += env * 0.15 * math.sin(2 * math.pi * (freq * 2) * i / SAMPLE_RATE)
        
        # Clamp
        sample = max(-0.9, min(0.9, sample))
        frames.append(struct.pack('<h', int(sample * 32767)))
    
    return b''.join(frames)

# Track 1: High-Energy Hip Hop Beat (120 BPM, punchy bass)
print("Generating Track 1: High-Energy Hip Hop Beat...")
hiphop_freqs = [80, 80, 100, 80, 80, 100, 120, 80]
hiphop_frames = generate_beat(120, hiphop_freqs)
write_wav('track_hiphop_energy.wav', hiphop_frames)

# Track 2: Mid-Tempo Pop Hit (100 BPM, melodic)
print("Generating Track 2: Mid-Tempo Pop Hit...")
pop_freqs = [220, 262, 294, 330, 262, 220, 196, 220]
pop_frames = generate_beat(100, pop_freqs)
write_wav('track_pop_midtempo.wav', pop_frames)

# Track 3: Chill Lo-Fi Trap/House (75 BPM, mellow)
print("Generating Track 3: Chill Lo-Fi Trap/House...")
lofi_freqs = [110, 110, 130, 110, 98, 110, 130, 147]
lofi_frames = generate_beat(75, lofi_freqs)
write_wav('track_lofi_chill.wav', lofi_frames)

print("\nAll audio placeholder files generated.")
print("NOTE: Replace these with licensed tracks before production deployment.")
print("Recommended sources: Pixabay (free), Bensound (attribution), or Epidemic Sound (paid license)")
