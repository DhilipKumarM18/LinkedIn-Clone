import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { FaHome, FaBriefcase, FaUserFriends, FaUser, FaBars, FaSignOutAlt, FaMoon, FaSun } from "react-icons/fa";
import "../App.css";

const Navbar = () => {
  const navigate = useNavigate();
  const defaultUser = {
    name: "Dhilip Kumar M",
    profilePic: "/images/dhilip.jpg",
    headline: "Full Stack Developer | React | Node.js",
    bio: "Passionate about building scalable web applications.",
  };

  const [user, setUser] = useState(defaultUser);
  const [connections, setConnections] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [bio, setBio] = useState(user.bio);
  const [headline, setHeadline] = useState(user.headline);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const storedConnections = JSON.parse(localStorage.getItem("connections")) || [];
    setConnections(storedConnections.length);

    document.body.setAttribute("data-theme", theme); 
    localStorage.setItem("theme", theme); 
  }, [theme]);

  const handleUpdate = () => {
    setUser({ ...user, name, profilePic, bio, headline });
    setIsEditing(false);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/home">LinkedIn Clone</Link>

          <button className="navbar-toggler" type="button" onClick={() => setIsNavOpen(!isNavOpen)}>
            <FaBars />
          </button>

          <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  <FaHome className="nav-icon" /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/jobs">
                  <FaBriefcase className="nav-icon" /> Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/connections">
                  <FaUserFriends className="nav-icon" /> Connections
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  <FaUser className="nav-icon" /> Profile
                </Link>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
            <button className="theme-toggle me-3" onClick={toggleTheme}>
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>

            <img
              src={user.profilePic}
              alt="Profile"
              className="rounded-circle profile-icon"
              width="40"
              onClick={() => setShowModal(true)}
            />
            <button className="btn btn-danger ms-3" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </nav>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>My Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img src={user.profilePic} alt="Profile" className="rounded-circle profile-modal-img" />
          </div>
          {isEditing ? (
            <div className="mt-3">
              <input type="text" className="form-control mb-2" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="text" className="form-control mb-2" value={profilePic} onChange={(e) => setProfilePic(e.target.value)} placeholder="Image URL" />
              <input type="text" className="form-control mb-2" value={headline} onChange={(e) => setHeadline(e.target.value)} />
              <textarea className="form-control mb-2" value={bio} onChange={(e) => setBio(e.target.value)} />
              <p><strong>Connections:</strong> {connections}</p>
              <button className="btn btn-success me-2" onClick={handleUpdate}>Save</button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <div>
              <h3 className="mt-2">{user.name}</h3>
              <p>{user.headline}</p>
              <p>🔗 {connections} Connections</p>
              <p>{user.bio}</p>
              <button className="btn btn-outline-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
