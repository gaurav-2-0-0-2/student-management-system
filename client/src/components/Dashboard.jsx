import React, { useState, useEffect } from "react";
import { fetchAllUsers } from "../api/fetchAllUsers";
import { MdOutlineDelete, MdEdit } from "react-icons/md";
import { deleteUser } from "../api/deleteUser";
import { Modal } from "antd";
import EditForm from "./EditForm";
import { updateUserById } from "../api/updateUserById";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (id) => {
    setIsEditing(id);
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    setIsEditing(null);
    window.location.reload();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditing(null);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetchAllUsers();
      setUsers(res.users);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    console.log("Delete user with id:", id);
    await deleteUser(id);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const handleSave = async (id, formData) => {
    try {
      console.log("This is the user ID:", id);
      console.log("This is the formData:", formData);
      const res = await updateUserById(id, { updatedData: formData });

      if (res?.message === "User updated successfully.") {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, ...formData } : user,
          ),
        );
        alert("Updated user hit Ok to confirm");
      } else {
        console.error("Failed to update user:", res?.message);
        alert("Update failed. Please try again.");
      }
      console.log("API response:", res);
    } catch (error) {
      console.error("Error in handleSave:", error);
      alert("An error occurred while updating the user. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="flex flex-col items-center justify-center w-full space-y-5">
        <div className="flex flex-col items-center justify-center w-full space-y-5">
          <h2 className="text-2xl font-bold">Welcome to the dashboard</h2>
          <p className="text-lg">
            This is the dashboard page of the student management system
          </p>
          <div>
            {users.length > 0 && (
              <table className="table-auto w-full bg-gray-100 border-separate border-spacing-2">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Pfp</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Branch</th>
                    <th className="px-4 py-2 text-left">Semester</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <React.Fragment key={user.id}>
                      {isEditing === user.id ? (
                        <Modal
                          title="Basic Modal"
                          open={isModalOpen}
                          onOk={handleOk}
                          onCancel={handleCancel}
                        >
                          <EditForm
                            id={user.id}
                            name={user.name}
                            email={user.email}
                            branch={user.branch}
                            semester={user.semester}
                            onSave={(formData) => handleSave(user.id, formData)}
                          />
                        </Modal>
                      ) : (
                        <tr>
                          <td>
                            {user.profilePhoto ? (
                              <img
                                src={"https://placehold.co/5"}
                                //src={`data:${user.profilePhotoType};base64,${user.profilePhoto}`}
                                alt={`${user.name}'s profile`}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                }}
                              />
                            ) : (
                              <img
                                src={"https://placehold.co/60"}
                                alt={`${user.name}'s profile`}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                }}
                              />
                            )}
                          </td>
                          <td className="px-4 py-2">{user.name}</td>
                          <td className="px-4 py-2">{user.email}</td>
                          <td className="px-4 py-2">{user.branch}</td>
                          <td className="px-4 py-2">{user.semester}</td>
                          <td
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 cursor-pointer"
                          >
                            <MdOutlineDelete size={18} />
                          </td>
                          <td className="text-blue-600 cursor-pointer">
                            <MdEdit
                              onClick={() => showModal(user.id)}
                              size={18}
                            />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
