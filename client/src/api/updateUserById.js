import axios from "axios";

export async function updateUserById(id, { updatedData:updatedData }) {
  try {
    const res = await axios.put(`http://localhost:3000/user/update/${id}`, updatedData);
    if (res.status !== 200) {
      throw new Error("Error while updating user");
    }
    return res.data
  } catch (err) {
    console.error("Error while updating user:", err);
  }
}