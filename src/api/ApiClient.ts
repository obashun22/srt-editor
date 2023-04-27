const API_ENDPOINT = `${process.env.REACT_APP_API_HOST}/whisper/transcribe`;

export class ApiClient {
  public async translateToSrt(file: File) {
    const postData = new FormData();
    postData.append("file", file);
    return await fetch(API_ENDPOINT, {
      method: "POST",
      body: postData,
    })
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
