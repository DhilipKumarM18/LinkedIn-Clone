import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "../App.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [savedJobs, setSavedJobs] = useState(() => {
    return JSON.parse(localStorage.getItem("savedJobs")) || [];
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("/jobs.json")
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data);
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  useEffect(() => {
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [search, jobs]);

  const handleSaveJob = (job) => {
    if (!savedJobs.some((saved) => saved.id === job.id)) {
      const updatedSavedJobs = [...savedJobs, job];
      setSavedJobs(updatedSavedJobs);
      localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Job Listings</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by job title or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{border:'2px solid skyblue'}}
      />

      <div className="row">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div key={job.id} className={`col-md-6 mb-3 job-card ${index % 2 === 0 ? "slide-left" : "slide-right"}`}>
              <div className="card p-3" style={{border:'2px solid skyblue'}}>
                <div className="d-flex align-items-center">
                  <img src={job.logo} alt="Company Logo" className="job-logo me-2" />
                  <h5>{job.company}</h5>
                </div>
                <p className="mt-2">{job.title}</p>
                <p>📍 {job.location}</p>
                <button className="btn btn-primary me-2" onClick={() => { setSelectedJob(job); setShowModal(true); }}>
                  View Details
                </button>
                <br />
                <button
                  className={`btn ${savedJobs.some((saved) => saved.id === job.id) ? "btn-success" : "btn-outline-success"}`}
                  onClick={() => handleSaveJob(job)}
                >
                  {savedJobs.some((saved) => saved.id === job.id) ? "Saved" : "Save Job"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedJob?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img src={selectedJob?.logo} alt="Company Logo" className="job-modal-logo" />
            <h4>{selectedJob?.company}</h4>
            <p>📍 {selectedJob?.location}</p>
          </div>
          <p><strong>Job Description:</strong> {selectedJob?.description || "Develop, test, and deploy scalable applications. Collaborate with cross-functional teams to build innovative solutions."}</p>
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

export default Jobs;
