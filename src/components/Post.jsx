import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Post = ({ post, setPosts }) => {
  const storedLikes = JSON.parse(localStorage.getItem(`likes-${post.id}`)) || post.likes;
  const storedComments = JSON.parse(localStorage.getItem(`comments-${post.id}`)) || [];

  const [likes, setLikes] = useState(storedLikes);
  const [comments, setComments] = useState(storedComments);
  const [newComment, setNewComment] = useState("");
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [connections, setConnections] = useState(() => {
    return JSON.parse(localStorage.getItem("connections")) || [];
  });

  useEffect(() => {
    localStorage.setItem(`likes-${post.id}`, JSON.stringify(likes));
  }, [likes, post.id]);

  useEffect(() => {
    localStorage.setItem(`comments-${post.id}`, JSON.stringify(comments));
  }, [comments, post.id]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setNewComment("");
    }
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  const handleShare = () => {
    const postUrl = `${window.location.origin}/post/${post.id}`;
    navigator.clipboard.writeText(postUrl)
      .then(() => alert("Post link copied to clipboard!"))
      .catch(err => console.error("Failed to copy:", err));
  };

  const handleFollowToggle = () => {
    const isConnected = connections.some((conn) => conn.id === post.userId);
    const updatedConnections = isConnected
      ? connections.filter((conn) => conn.id !== post.userId) 
      : [...connections, { id: post.userId, name: post.user, profilePic: post.profilePic }]; 

    setConnections(updatedConnections);
    localStorage.setItem("connections", JSON.stringify(updatedConnections));
  };

  return (
    <div className="card my-3 p-3" id="hc">
      <div className="d-flex align-items-center">
        <img
          src={post.profilePic}
          alt="profile"
          className="rounded-circle me-2"
          width="40"
          style={{ cursor: "pointer" }}
          onClick={() => setShowProfileModal(true)}
        />
        <h5 style={{ cursor: "pointer" }} onClick={() => setShowProfileModal(true)}>
          {post.user}
        </h5>
      </div>

      <p>{post.content}</p>
      {post.image && <img src={post.image} alt="post" className="img-fluid rounded mb-2" />}
      {post.video && (
        <video controls className="w-100 rounded">
          <source src={post.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <div className="d-flex mt-2">
        <button className="btn btn-outline-primary me-2" onClick={handleLike}>
          👍 Like {likes}
        </button>
        <button className="btn btn-outline-secondary me-2" onClick={() => setShowCommentModal(true)}>
          💬 Comment ({comments.length})
        </button>
        <button className="btn btn-outline-success" onClick={handleShare}>
          🔗 Share
        </button>
      </div>

      <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="btn btn-success mt-2" onClick={handleAddComment}>
            Add Comment
          </button>

          <div className="mt-3">
            {comments.map((comment, index) => (
              <div key={index} className="d-flex justify-content-between align-items-center">
                <p className="m-0">💬 {comment}</p>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteComment(index)}>
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCommentModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{post.user}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img src={post.profilePic} alt="Profile" className="rounded-circle profile-modal-img" />
          <h5 className="mt-3">{post.user}</h5>
          <p className="text-muted">{post.bio}</p>
          <p>🔗 {post.connections || "500+"} Connections</p>
          <button
            className={`btn ${connections.some((conn) => conn.id === post.userId) ? "btn-danger" : "btn-primary"}`}
            onClick={handleFollowToggle}
          >
            {connections.some((conn) => conn.id === post.userId) ? "Unfollow" : "Follow"}
          </button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProfileModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Post;
