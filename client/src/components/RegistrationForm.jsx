import { useState } from "react";
import { signup } from "../api/signup";
import { Link, useNavigate } from "react-router";

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    branch: "",
    semester: "",
    profilePhoto: null,
  });

  const handleChange = (e) => {
    const { name, type } = e.target;

    // Handle file input separately
    if (type === "file") {
      const file = e.target.files[0];
      setRegistrationData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      // Handle other inputs normally
      const { value } = e.target;
      setRegistrationData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(registrationData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await signup(formData);
      if (res.message === "success") {
        alert("Registration successful");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <form
      className="flex flex-col justify-center items-center w-full"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl font-bold">Registration Form</h1>
      <div className="max-w-screen-sm w-full space-y-7">
        <div className="input-div">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={registrationData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-div">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={registrationData.email}
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
            value={registrationData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-div">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={registrationData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-div">
          <label htmlFor="branch">Branch</label>
          <input
            type="text"
            id="branch"
            name="branch"
            value={registrationData.branch}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-div">
          <label htmlFor="semester">Semester</label>
          <input
            type="text"
            id="semester"
            name="semester"
            value={registrationData.semester}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-div">
          <label htmlFor="profilePhoto">Profile Photo</label>
          <input
            type="file"
            id="profilePhoto"
            name="profilePhoto"
            //value={registrationData.profilePhoto}
            onChange={handleChange}
            accept="image/*"
            required
          />
        </div>
        <button
          className="w-full px-4 py-2 rounded-md text-center bg-blue-500 text-white font-semibold"
          type="submit"
        >
          Submit
        </button>
        <p>
          If already registered then{" "}
          <Link className="text-blue-500 hover:underline" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
