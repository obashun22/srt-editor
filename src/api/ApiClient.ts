import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_API_HOST;

export class ApiClient {
  public async translateToSrt(file: File) {
    const postData = new FormData();
    postData.append("file", file);
    try {
      const res = await axios.post(
        `${API_ENDPOINT}/whisper/transcribe`,
        postData,
        {
          responseType: "blob",
        }
      );
      return res;
    } catch (err) {
      throw err;
    }
  }
  public async getSrt() {
    return axios
      .get(`${API_ENDPOINT}/whisper/download`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }
}
