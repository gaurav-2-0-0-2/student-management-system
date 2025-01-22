import { useState } from "react";
import { login } from "../api/login";
import { Link, useNavigate } from "react-router";

export default function LoginForm() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(loginData);
    const res = await login(loginData);
    if (res.message === "success") {
      alert("Login successful");
      navigate("/dashboard");
    }
  };

  return (
    <form
      className="flex flex-col justify-center items-center w-full"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl font-bold">Login Form</h1>
      <div className="max-w-screen-sm w-full space-y-7">
        <div className="input-div">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-div">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="w-full px-4 py-2 rounded-md text-center bg-blue-500 text-white font-semibold"
          type="submit"
        >
          Login
        </button>
        <p>
          If not registered then{" "}
          <Link className="text-blue-500 hover:underline" to={"/register"}>
            Register
          </Link>
        </p>
      </div>
    </form>
  );
}
