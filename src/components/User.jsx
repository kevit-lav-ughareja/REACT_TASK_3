import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./User.css";
import Form from "./Form";
const User = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [creatingUser, setCreatingUser] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const datafetch = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/users");
        const data = await response.json();
        setUsers(
          data.map((user) => ({
            ...user,
            name: user.name || { firstname: "", lastname: "" },
          }))
        );
        console.log(users);
      } catch (eroor) {
        toast.error("Data Fetching Faild");
      }
    };
    datafetch();
  }, []);

  const deletePost = async (id) => {
    const confirmed = window.confirm("Are Your Sure want to delete this Post!");
    if (!confirmed) return;
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setUsers(
          users.filter((user) => {
            return user.id !== id;
          })
        );
        toast.success("User deleted successfully");
      }
    } catch (e) {
      toast.error("Not deleting post ");
    }
  };

  const updateUser = async (id, updatedData) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: updatedData.email,
          username: updatedData.username,

          name: {
            firstname: updatedData.firstname,
            lastname: updatedData.lastname,
          },
          phone: updatedData.phone,
        }),
      });
      if (!response.ok) {
        toast.error("Not update data");
        return;
      }
      const updatedUser = await response.json();
      toast.success("update User");

      setUsers((prev) =>
        prev.map((user) =>
          user.id === id
            ? {
                ...user,
                name: {
                  firstname: updatedUser.name.firstname,
                  lastname: updatedUser.name.lastname,
                },
                username: updatedUser.username,
                email: updatedUser.email,
                phone: updatedUser.phone,
              }
            : user
        )
      );

      setEditingUser(null);
    } catch (e) {
      toast.error("Error accurse");
    }
  };

  const createUser = async (newUser) => {
    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newUser.email,
          username: newUser.username,
          name: {
            firstname: newUser.firstname,
            lastname: newUser.lastname,
          },
          phone: newUser.phone,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to create user");
        return;
      }

      const createdUser = await response.json();
      toast.success("User created successfully");

      setUsers((prev) => [
        ...prev,
        {
          ...createdUser,
          name: createdUser.name || {
            firstname: newUser.firstname,
            lastname: newUser.lastname,
          },
          email: newUser.email,
          username: newUser.username,
          phone: newUser.phone,
        },
      ]);
      setCreatingUser(false);
    } catch (e) {
      toast.error("Error while creating user");
    }
  };

  return (
    <>
      {" "}
      <button
        className="insert-btn"
        onClick={() => {
          setCreatingUser(true);
          setFormData({
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            phone: "",
          });
        }}
      >
        Create User
      </button>{" "}
      <div className="user-container">
        {users.map((user) => {
          return (
            <div
              className="user-card"
              key={user.id}
              style={{
                border: "1px solid gray",
                margin: "10px",
                padding: "10px",
              }}
            >
              <p>
                <strong>Name:</strong> {user.name.firstname}{" "}
                {user.name.lastname}
              </p>

              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>

              <div className="btn-wrapper">
                <button onClick={() => deletePost(user.id)}>Delete</button>
                <button
                  onClick={() => {
                    setEditingUser(user.id);
                    setFormData({
                      firstname: user.name.firstname,
                      lastname: user.name.lastname,
                      username: user.username,
                      email: user.email,
                      phone: user.phone,
                    });
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {editingUser && (
        <Form
          formData={formData}
          setFormData={setFormData}
          onSubmit={(e) => {
            e.preventDefault();
            updateUser(editingUser, formData);
          }}
        />
      )}
      {creatingUser && (
        <Form
          formData={formData}
          setFormData={setFormData}
          onSubmit={(e) => {
            e.preventDefault();
            createUser(formData);
          }}
        />
      )}
    </>
  );
};

export default User;
