import axios from "axios";

export async function deleteUser(id) {
  try {
    const res = await axios.get(`http://localhost:3000/user/delete/${id}`);
    if (res.status !== 200) {
      throw new Error("Error while signup");
    }
    console.log(res.data);
  } catch (err) {
    console.error("Error while signup:", err);
  }
}