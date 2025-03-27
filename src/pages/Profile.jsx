import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const Profile = () => {
  const defaultUser = {
    name: "Dhilip Kumar M",
    profilePic: "/images/dhilip.jpg",
    headline: "Full Stack Developer | React | Node.js",
    bio: "Passionate about building scalable web applications.",
  };

  const defaultPosts = [
    {
      id: 1,
      caption: "Mastering JavaScript step by step!",
      image: "/images/js.jpg",
      likes: 0,
      comments: [],
    },
    {
      id: 2,
      caption: "Exploring React’s powerful features!",
      image: "/images/react.png",
      likes: 0,
      comments: [],
    },
  ];

  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("userProfile")) || defaultUser);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [bio, setBio] = useState(user.bio);
  const [headline, setHeadline] = useState(user.headline);
  const [connections, setConnections] = useState(() => JSON.parse(localStorage.getItem("connections"))?.length || 0);
  const [posts, setPosts] = useState(() => JSON.parse(localStorage.getItem("userPosts")) || defaultPosts);
  const [savedJobs, setSavedJobs] = useState(() => JSON.parse(localStorage.getItem("savedJobs")) || []);

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(user));
    localStorage.setItem("userPosts", JSON.stringify(posts));
  }, [user, posts]);

  const handleUpdate = () => {
    const updatedUser = { ...user, name, profilePic, bio, headline };
    setUser(updatedUser);
    localStorage.setItem("userProfile", JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem("userPosts", JSON.stringify(updatedPosts));
  };

  const handleOpenCommentModal = (post) => {
    setSelectedPost(post);
    setShowCommentModal(true);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setPosts((prevPosts) => {
      const updatedPosts = prevPosts.map((post) =>
        post.id === selectedPost.id
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      );
      localStorage.setItem("userPosts", JSON.stringify(updatedPosts));
      return updatedPosts;
    });
    setNewComment("");
    setShowCommentModal(false);
  };

  const handleDeleteComment = (postId, commentIndex) => {
    setPosts((prevPosts) => {
      const updatedPosts = prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: post.comments.filter((_, index) => index !== commentIndex) }
          : post
      );
      localStorage.setItem("userPosts", JSON.stringify(updatedPosts));
      return updatedPosts;
    });

    if (selectedPost?.id === postId) {
      setSelectedPost((prevPost) => ({
        ...prevPost,
        comments: prevPost.comments.filter((_, index) => index !== commentIndex),
      }));
    }
  };

  const handleUnsaveJob = (jobId) => {
    const updatedJobs = savedJobs.filter((job) => job.id !== jobId);
    setSavedJobs(updatedJobs);
    localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
  };

  return (
    <div className="container mt-4">
      <div className="row" >
        <div className="col-md-8" >
          <div className="card p-3" style={{border:'2px solid skyblue'}}>
            <div className="d-flex align-items-center">
              <img src={user.profilePic} alt="profile" className="rounded-circle me-3" width="80" />
              <div>
                <h3>{user.name}</h3>
                <p>{headline}</p>
                <p>🔗 {connections} Connections</p>
              </div>
            </div>

            {isEditing ? (
              <div className="mt-3">
                <input type="text" className="form-control mb-2" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" className="form-control mb-2" value={profilePic} onChange={(e) => setProfilePic(e.target.value)} placeholder="Image URL" />
                <input type="text" className="form-control mb-2" value={headline} onChange={(e) => setHeadline(e.target.value)} />
                <textarea className="form-control mb-2" value={bio} onChange={(e) => setBio(e.target.value)} />
                <button className="btn btn-success me-2" onClick={handleUpdate}>Save</button>
                <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            ) : (
              <>
                <p className="mt-3">{user.bio}</p>
                <button className="btn btn-outline-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
              </>
            )}
          </div>

          <h4 className="mt-4">Your Posts</h4>
          <div className="row">
            {posts.map((post) => (
              <div className="col-md-6 mb-3" key={post.id} >
                <div className="card p-2" style={{border:'2px solid black',backgroundColor:'aquamarine'}}>
                  <p>{post.caption}</p>
                  <img src={post.image} alt="Post" className="img-fluid rounded" />
                  <div className="d-flex justify-content-between mt-2">
                    <button className="btn btn-outline-primary" onClick={() => handleLike(post.id)}>
                      👍 {post.likes}
                    </button>
                    <button className="btn btn-outline-secondary" onClick={() => handleOpenCommentModal(post)}>
                      💬 {post.comments.length}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3" style={{border:'2px solid black',backgroundColor:'aquamarine'}}>
            <h5>Saved Jobs</h5>
            {savedJobs.length > 0 ? (
              savedJobs.map((job) => (
                <div key={job.id} className="d-flex align-items-center justify-content-between my-2">
                  <div>
                    <h6 className="mb-0">{job.title}</h6>
                    <small>{job.company} - {job.location}</small>
                  </div>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleUnsaveJob(job.id)}>
                    Unsave
                  </button>
                </div>
              ))
            ) : (
              <p>No saved jobs.</p>
            )}
          </div>
        </div>
      </div>

      <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPost?.comments.map((comment, index) => (
            <p key={index}>
              💬 {comment}
              <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDeleteComment(selectedPost.id, index)}>❌</button>
            </p>
          ))}
          <input type="text" className="form-control" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment..." />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddComment}>Post</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
