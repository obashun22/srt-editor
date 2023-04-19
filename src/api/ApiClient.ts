const API_ENDPOINT = "http://localhost:4000/whisper/transcribe";

export class ApiClient {
  public async translateToSrt(file: File) {
    const postData = new FormData(); // FormDataでPOSTしないとバックエンドで受け取れない？
    postData.append("file", file);
    return await fetch(API_ENDPOINT, {
      method: "POST",
      // モックサーバの場合はコメントアウト
      // body: postData,
      // headers: new Headers({
      //   "Content-Type": "multipart/form-data",
      // }),
      mode: "cors",
    })
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], "transcribe.srt", {
          type: "text/plain",
        });
        file.text().then((text) => console.log(text));
        return file;
      })
      .catch((err) => {
        throw err;
      });
  }
}
