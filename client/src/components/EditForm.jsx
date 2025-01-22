import { useState } from "react";

export default function EditForm({
  id,
  name,
  email,
  branch,
  semester,
  onSave,
}) {
  const [formData, setFormData] = useState({
    name: name,
    email: email,
    branch: branch,
    semester: semester,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({updatedData:formData});
  };

  return (
    <form key={id} onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-7">
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="branch"
          id="branch"
          value={formData.branch}
          onChange={handleChange}
        />
        <input
          type="text"
          name="semester"
          id="semester"
          value={formData.semester}
          onChange={handleChange}
        />
        <button type="submit" className="rounded-full text-lg text-white font-semibold px-4 py-1 bg-green-500">
          save
        </button>
      </div>
    </form>
  );
}
