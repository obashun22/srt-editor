import axios from "axios";

const API_ENDPOINT = `${process.env.REACT_APP_API_HOST}/whisper/transcribe`;

export class ApiClient {
  public async translateToSrt(file: File) {
    const postData = new FormData();
    postData.append("file", file);
    try {
      const response = await axios.post(API_ENDPOINT, postData, {
        responseType: "blob",
        timeout: 7200000,
      });
      const file = new File([response.data], "transcribe.srt", {
        type: "text/plain",
      });
      return file;
    } catch (err) {
      throw err;
    }
  }
}
