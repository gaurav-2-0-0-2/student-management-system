import { Link } from "react-router";

export default function HomePage() {
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center">
        Student Management System
      </h1>
      <div className="flex gap-2 justify-center">
        <Link
          to={"/login"}
          className="px-4 font-semibold py-2 bg-blue-700 text-white rounded-xl"
        >
          LOGIN
        </Link>
        <Link
          to={"/register"}
          className="px-4 font-semibold py-2 bg-blue-700 text-white rounded-xl"
        >
          SIGNUP
        </Link>
      </div>
    </div>
  );
}
