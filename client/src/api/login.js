import axios from "axios";

export async function login(loginData){
    try {
      const res = await axios.post("http://localhost:3000/auth/login", loginData);
      if (res.status !== 200) {
        throw new Error("Error while login");
      }
      console.log(res.data)
      return await res.data;
    } catch (err) {
      console.error("Error while login:", err);
    }
}