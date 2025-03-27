import { useState } from "react";

const ConnectionCard = ({ user }) => {
  const [connected, setConnected] = useState(
    JSON.parse(localStorage.getItem(`connect-${user.id}`)) || false
  );

  const handleConnect = () => {
    localStorage.setItem(`connect-${user.id}`, JSON.stringify(!connected));
    setConnected(!connected);
  };

  return (
    <div className="card my-2 p-2">
      <div className="d-flex align-items-center">
        <img src={user.profilePic} alt="profile" className="rounded-circle me-2" width="40" />
        <h5>{user.name}</h5>
      </div>
      <button className={`btn ${connected ? "btn-secondary" : "btn-outline-primary"}`} onClick={handleConnect}>
        {connected ? "✔ Connected" : "Connect"}
      </button>
    </div>
  );
};

export default ConnectionCard;
