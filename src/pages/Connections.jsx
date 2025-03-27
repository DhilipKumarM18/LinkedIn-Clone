import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "../App.css";

const Connections = () => {
  const [people, setPeople] = useState([]);
  const [connections, setConnections] = useState(() => {
    return JSON.parse(localStorage.getItem("connections")) || [];
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("/users.json")
      .then((response) => response.json())
      .then((data) => setPeople(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleConnectToggle = (user) => {
    const updatedConnections = connections.some((conn) => conn.id === user.id)
      ? connections.filter((conn) => conn.id !== user.id) // Unfollow
      : [...connections, user]; // Follow

    setConnections(updatedConnections);
    localStorage.setItem("connections", JSON.stringify(updatedConnections));
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <h3 className="mb-3">My Connections</h3>
          {connections.length > 0 ? (
            <div className="connections-grid">
              {connections.map((user) => (
                <div key={user.id} className="card p-3 text-center shadow-sm animate-fade" style={{ backgroundColor: "aquamarine" }}>
                  <img
                    src={user.profilePic}
                    alt="profile"
                    className="rounded-circle mx-auto d-block profile-pic"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowModal(true);
                    }}
                  />
                  <h6 className="mt-2">{user.name}</h6>
                  <small>{user.bio}</small>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">You have no connections yet.</p>
          )}
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm" style={{ border: "2px solid black" }}>
            <h5>People You May Know</h5>
            {people.map((person) => {
              const isConnected = connections.some((conn) => conn.id === person.id);
              return (
                <div key={person.id} className="d-flex align-items-center my-2 animate-slide">
                  <img
                    src={person.profilePic}
                    alt="profile"
                    className="rounded-circle me-2 profile-pic-small"
                    onClick={() => {
                      setSelectedUser(person);
                      setShowModal(true);
                    }}
                  />
                  <div>
                    <h6 className="mb-0">{person.name}</h6>
                    <small className="text-muted">{person.bio}</small>
                  </div>
                  <button
                    className={`btn btn-sm ${isConnected ? "btn-outline-danger" : "btn-primary"} ms-auto`}
                    onClick={() => handleConnectToggle(person)}
                  >
                    {isConnected ? "Unfollow" : "Connect"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedUser?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div className="text-center">
              <img src={selectedUser.profilePic} alt="Profile" className="rounded-circle mb-2" width="80" />
              <h5>{selectedUser.name}</h5>
              <p className="job-title">{selectedUser.jobTitle}</p>
              <p className="company-name">{selectedUser.company}</p>
              <p>{selectedUser.bio}</p>
              <p>🔗 {selectedUser.connections || "500+"} Connections</p>

              <button
                className={`btn ${connections.some((conn) => conn.id === selectedUser.id) ? "btn-outline-danger" : "btn-primary"}`}
                onClick={() => handleConnectToggle(selectedUser)}
              >
                {connections.some((conn) => conn.id === selectedUser.id) ? "Unfollow" : "Follow"}
              </button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Connections;
