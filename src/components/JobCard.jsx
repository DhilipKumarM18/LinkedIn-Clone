import { useState } from "react";

const JobCard = ({ job }) => {
  const [saved, setSaved] = useState(
    JSON.parse(localStorage.getItem(`saved-${job.id}`)) || false
  );

  const handleSave = () => {
    localStorage.setItem(`saved-${job.id}`, JSON.stringify(!saved));
    setSaved(!saved);
  };

  return (
    <div className="card my-3 p-3">
      <div className="d-flex align-items-center">
        <img src={job.logo} alt="company-logo" className="me-2" width="50" />
        <h5>{job.company}</h5>
      </div>
      <h6>{job.title} - {job.location}</h6>
      <button className={`btn ${saved ? "btn-success" : "btn-outline-success"}`} onClick={handleSave}>
        {saved ? "✔ Saved" : "Save Job"}
      </button>
    </div>
  );
};

export default JobCard;
