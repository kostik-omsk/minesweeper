let currentIndex = 0;
export default function createAudioElement(src) {
  if (Array.isArray(src)) {
    const audio = new Audio();
    audio.src = src[currentIndex];

    currentIndex = (currentIndex + 1) % src.length;

    return audio;
  }

  const audio = new Audio();
  audio.src = src;
  return audio;
}
