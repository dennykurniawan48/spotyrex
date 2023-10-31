export function formatDuration(durationInSeconds: number) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    const mm = minutes < 10 ? '0' + minutes : minutes.toString();
    const ss = seconds < 10 ? '0' + seconds : seconds.toString();
    return mm + ':' + ss;
  }