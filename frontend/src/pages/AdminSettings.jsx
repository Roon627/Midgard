import { contactEmail, setContactEmail } from "../data/settings";
import { useState } from "react";

export default function AdminSettings() {
  const [email, setEmail] = useState(contactEmail);

  function updateEmail(e) {
    e.preventDefault();
    setContactEmail(email);
    alert("Contact email updated (mocked)");
  }

  return (
    <div className="container">
      <h1>Admin Settings</h1>
      <form onSubmit={updateEmail}>
        <label>
          Contact Email: <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "0.5rem", width: "100%", marginBottom: "1rem" }}
          />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
