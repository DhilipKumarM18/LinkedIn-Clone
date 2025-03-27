const ProfileCard = ({ user }) => {
    return (
      <div className="card my-3 p-3 text-center">
        <img src={user.profilePic} alt="profile" className="rounded-circle mx-auto d-block" width="80" />
        <h5>{user.name}</h5>
        <p>{user.bio}</p>
        <p>🔗 {user.connections} Connections</p>
      </div>
    );
  };
  
  export default ProfileCard;
  