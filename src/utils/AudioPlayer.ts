export class AudioPlayer {
  audio: HTMLAudioElement;

  constructor() {
    this.audio = document.createElement("audio");
  }
  get src() {
    return this.audio.src;
  }
  set src(src: string) {
    this.audio.src = src;
  }
  get currentTime() {
    return this.audio.currentTime;
  }
  set currentTime(time: number) {
    this.audio.currentTime = time;
  }

  play() {
    if (this.audio.currentSrc) {
      this.audio.play();
      console.log("Played");
    }
  }
  pause() {
    if (this.audio.currentSrc) {
      this.audio.pause();
      console.log("Paused");
    }
  }
  seek(time: number) {
    if (this.audio.currentSrc) {
      if (time < 0 || time > this.audio.duration) {
        console.log("指定した時間が範囲外です");
        return;
      }
      this.audio.currentTime = time;
      console.log("Seeked to: " + this.audio.currentTime);
    }
  }
}
