import React, { useContext, useState } from "react";

/* import { useForm } from "../UseContext"; */

function CreditCard({ setIsActive }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  /* const { setIsActive, user, setUser } = useForm(); */

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      setIsActive(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreditCard;
