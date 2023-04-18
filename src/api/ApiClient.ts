const API_ENDPOINT = "http://localhost:4000/whisper";

export class ApiClient {
  public async translateToSrt(file: File) {
    return await fetch(API_ENDPOINT)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], "transcribe.srt", {
          type: "text/plain",
        });
        return file;
      })
      .catch((err) => {
        throw err;
      });
  }
}
