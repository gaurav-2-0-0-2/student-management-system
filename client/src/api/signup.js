import axios from "axios";

export async function signup(postData) {
  try {
    const res = await axios.post("http://localhost:3000/auth/signup", postData);
    if (res.status !== 200) {
      throw new Error("Error while signup");
    }
    console.log(res.data);
    return await res.data;
  } catch (err) {
    console.error("Error while signup:", err);
  }
}
