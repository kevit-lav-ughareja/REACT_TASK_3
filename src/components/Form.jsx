import React from "react";
import "./Form.css";

const Form = ({ formData, setFormData, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="form-container">
      <input
        type="text"
        placeholder="First Name"
        value={formData.firstname}
        onChange={(e) =>
          setFormData({ ...formData, firstname: e.target.value })
        }
      ></input>
      <input
        type="text"
        placeholder="Last Name"
        value={formData.lastname}
        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
      ></input>
      <input
        type="text"
        placeholder="User Name"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      ></input>
      <input
        type="text"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      ></input>

      <input
        type="text"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      ></input>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
