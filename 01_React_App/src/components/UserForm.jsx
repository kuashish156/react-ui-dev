import { useState } from "react";
import Count from "./Count";

const UserForm = () => {
  const [user, setUser] = useState("");

  return (
    <section className="userForm">
      <h3>Enter your details </h3>
      <form>
        <label htmlFor="fname">First Name: </label>

        <input
          id="fname"
          type="text"
          placeholder="Enter Your First Name"
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
        />

        <p>user enter input is - {user}</p>
        <p>user enter lenght is - {user.length}</p>

        <br />

        <label htmlFor="lname">Last Nmae: </label>

        <input
          id="lname"
          type="text"
          placeholder="Enter Your Last Name"
          autoComplete="off"
        />

        <br />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default UserForm;
