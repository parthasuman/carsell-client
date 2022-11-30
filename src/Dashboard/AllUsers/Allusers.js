import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../Pages/Shared/ConfirmationModal/ConfirmationModal";

const Allusers = () => {
  const [deletingCar, setDeletingCar] = useState(null);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      return data;
    },
  });

  const handleMakeAdmin = (id) => {
    fetch(`http://localhost:5000/users/admin/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Make Admin successdul.");
          refetch();
        }
      });
  };

  const closeModal = () => {
    setDeletingCar(null);
  };

  const handleDeleteCar = (user) => {
    fetch(`http://localhost:5000/users/${user._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`user ${user.name} deleted succesfuly`);
        }
      });
  };

  return (
    <div>
      <h2 className="text-3xl">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button className="btn btn-xs btn-primary">
                    {user.role}
                  </button>
                </td>
                <td>
                  {user?.role !== "admin" && (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-xs btn-primary"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  <label
                    onClick={() => setDeletingCar(user)}
                    htmlFor="confirmation-modal"
                    className="btn-btn-sm btn-error"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingCar && (
        <ConfirmationModal
          title={`Are you sure you want to delete`}
          message={`if you delete ${deletingCar.name}. It cannot be undone`}
          successAction={handleDeleteCar}
          successButtonName="Delete"
          modalData={deletingCar}
          closeModal={closeModal}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default Allusers;
