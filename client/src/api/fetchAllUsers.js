import axios from "axios";

export async function fetchAllUsers() {
  try {
    const res = await axios.get("http://localhost:3000/user/users");
    if (res.status !== 200) {
      throw new Error("Error while signup");
    }
    console.log(res.data);
    return await res.data;
  } catch (err) {
    console.error("Error while signup:", err);
  }
}