import axios from "axios";

const API_ENDPOINT = `${process.env.REACT_APP_API_HOST}/whisper/transcribe`;

export class ApiClient {
  public async translateToSrt(file: File) {
    const postData = new FormData();
    postData.append("file", file);
    try {
      const res = await axios.post(API_ENDPOINT, postData, {
        responseType: "blob",
        timeout: 7200000,
      });
      return res;
    } catch (err) {
      throw err;
    }
  }
  public async getSrt() {
    return axios
      .get(API_ENDPOINT)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }
}
