import { useState } from "react";

function CreateTeamForm({ onCreateTeam }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreateTeam({ name, description });
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Team</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button type="submit">Create</button>
    </form>
  );
}

export default CreateTeamForm;
