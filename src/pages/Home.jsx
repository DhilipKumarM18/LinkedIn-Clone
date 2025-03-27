import { useEffect, useState } from "react";
import Post from "../components/Post";
import Navbar from "../components/Navbar";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [connections, setConnections] = useState(0);
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("userProfile")) || {
      name: "Dhilip Kumar M",
      profilePic: "/images/dhilip.jpg",
      headline: "Full Stack Developer | React | Node.js",
      bio: "Passionate about building scalable web applications."
    };
  });

  useEffect(() => {
    fetch("/posts.json")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));

    const storedConnections = JSON.parse(localStorage.getItem("connections")) || [];
    setConnections(storedConnections.length);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3 profile-sidebar animate-profile">
            <div className="card p-3 text-center" style={{backgroundColor:'aquamarine',fontWeight:'bold',border:'2px solid black'}}>
              <img src={user.profilePic} alt="Profile" className="rounded-circle mb-2 profile-pic-large" width="80" />
              <h5 style={{color:'blue'}}>{user.name}</h5>
              <p>{user.headline}</p>
              <p>🔗 {connections} Connections</p> 
            </div>
          </div>

          <div className="col-md-8">
            <h2 className="mb-4">Home Feed</h2>
            {posts.map((post) => (
              <Post key={post.id} post={post} setPosts={setPosts} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
