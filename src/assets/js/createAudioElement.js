export default function createAudioElement(src) {
  const audio = new Audio();
  audio.src = src;
  return audio;
}
