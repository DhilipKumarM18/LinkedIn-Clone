#LinkedIn Clone

A Social Media Application Inspired by LinkedIn
A professional networking platform built with React Vite, featuring interactive posts, job listings, and connections management. Check out the Live Demo to explore its features.

#Features
Responsive UI for desktop and mobile
Interactive Posts (Like, Comment, Save Jobs)
Profile Editing with persistent user details
Job Listings (Save & Unsave jobs dynamically)
Connections System (Follow/Unfollow users)
Dark/Light Mode Toggle
Local Storage Persistence

#Technologies Used
React (Vite) → For fast and efficient UI rendering

Bootstrap & CSS → For a clean, responsive UI

React Router → For seamless navigation between pages

LocalStorage → To persist user data without a backend

Vercel → For hosting and continuous deployment

#Main Pages and Their Roles

Home Page → Displays user posts with like and comment options.
Jobs Page → Shows job listings with a save job feature.
Connections Page → Allows users to connect and follow/unfollow others.
Profile Page → Displays user details, saved jobs, and posts.
Login Page → Authenticates users with basic validation.

#Components Created and Usage
 Home Page Components:
  Navbar.jsx → Main navigation with profile, theme toggle, and logout.
  Post.jsx → Displays individual posts with Like & Comment buttons.
  CommentModal.jsx → Modal for adding/viewing comments.
  Sidebar.jsx → Shows suggested connections.

#Jobs Page Components:
  JobList.jsx → Displays job listings dynamically from JSON.
  JobDetails.jsx → Shows job details when clicked.
  SavedJobsSidebar.jsx → Lists saved jobs with an Unsave option.

#Connections Page Components:
  ConnectionsList.jsx → Lists connected users.
  SuggestedUsers.jsx → Shows People You May Know suggestions.
  FollowButton.jsx → Toggles Follow/Unfollow dynamically.

#Profile Page Components:
  ProfileDetails.jsx → Displays user information with an Edit Profile option.
  UserPosts.jsx → Shows posts created by the user.
  SavedJobs.jsx → Lists saved jobs in the sidebar.

#GitHub Repository
The source code for this project is available here:
🔗 GitHub Repository : https://github.com/DhilipKumarM18/LinkedIn-Clone

#Getting Started
Prerequisites
Node.js (v14 or higher)

npm or Yarn (for dependency management)

Installation Steps
1️ .Clone the repository:
    git clone https://github.com/DhilipKumarM18/LinkedIn-Clone.git

2️ . Navigate to the project directory:
    cd LinkedIn-Clone
  
3️. Install dependencies:
    npm install
4️. Start the development server:
    npm run dev
5️. Open http://localhost:5173/ in your browser to view the app.

  Folder Structure

  LinkedIn-Clone/
  ┣ src/
  ┃ ┣ components/      # Reusable UI components
  ┃ ┃ ┣ Home/          # Components for Home Page
  ┃ ┃ ┣ Jobs/          # Components for Jobs Page
  ┃ ┃ ┣ Connections/   # Components for Connections Page
  ┃ ┃ ┣ Profile/       # Components for Profile Page
  ┃ ┣ pages/           # Main pages (Home, Profile, Jobs, etc.)
  ┃ ┣ context/         # React Context API for global state
  ┃ ┣ hooks/           # Custom React hooks
  ┃ ┣ assets/          # Images and static assets
  ┃ ┣ App.jsx          # Main App Component
  ┃ ┣ main.jsx         # Entry point
  ┃ ┗ styles.css       # Global styles
  ┣ public/            # JSON files for posts, users, and jobs
  ┃ ┣ posts.json       # Post data
  ┃ ┣ users.json       # User data
  ┃ ┣ jobs.json        # Job listings
  ┃ ┗ pass.json        # Mock authentication data
  ┣ .gitignore         # Files to ignore in Git
  ┣ package.json       # Project dependencies
  ┣ README.md          # Project documentation
  ┗ vite.config.js     # Vite configuration
  
#Best Practices
 Component-Based Architecture → Modular and reusable components.
 React Hooks for State Management → useState, useEffect, useContext.
 Responsive Design → Works on mobile & desktop.
 LocalStorage Integration → Saves user posts, jobs, and profile edits persistently.
 Minimal External Dependencies → Lightweight and fast performance.

# API / JSON Documentation
#posts.json (Stores Posts Data)

[
  {
    "id": 1,
    "user": { "name": "John Doe", "profilePic": "/images/user1.jpg" },
    "content": "Excited to start my new job at Google!",
    "image": "/images/google_office.jpg",
    "likes": 15,
    "comments": ["Congrats!", "Well done!"]
  }
]
# users.json (Stores User Data)

[
  {
    "id": 1,
    "name": "John Doe",
    "profilePic": "/images/user1.jpg",
    "bio": "Software Engineer at Google",
    "connections": 500
  }
]
# jobs.json (Stores Job Listings)

[
  {
    "id": 1,
    "title": "Frontend Developer",
    "company": "Google",
    "location": "Remote",
    "logo": "/images/google_logo.png"
  }
]
# pass.json (Stores Mock Authentication Data)

{
  "email": "test@example.com",
  "password": "Test@123"
}
# UI / UX Guidelines
Clean & Minimalistic Design → Bootstrap-based UI.
Consistent Spacing & Colors → Light & dark mode compatibility.
User-Friendly Interactions → Smooth transitions & modals.
Responsive Layout → Grid-based system for different devices.

# Error Handling & Debugging
 Try-Catch Blocks for API fetch failures.
 Error Boundaries to prevent crashes.
 LocalStorage Fallbacks for missing data.
 React Testing Library for UI unit testing.
 
 #Deployment Details
 Live Demo: https://linked-in-clone-drab.vercel.app/

Deployment Steps (Vercel)
1️ Push code to GitHub
2️ Login to Vercel (https://vercel.com)
3️ Import GitHub Repo
4️ Select LinkedIn-Clone and deploy 🎉

 Contribution Guide
 Want to contribute? Follow these steps:

1️ Fork the repository
2️ Create a new branch
  git checkout -b feature/new-feature
3️ Make changes and commit
  git commit -m "Added a new feature"
4️ Push the branch
  git push origin feature/new-feature
5️ Submit a Pull Request on GitHub

#Conclusion
    The LinkedIn Clone project successfully replicates core LinkedIn features such as profile   management, job saving, connections, and interactive posts using React Vite, Bootstrap, and     LocalStorage.

 Live Demo:  https://linked-in-clone-drab.vercel.app/
 GitHub Repo: [LinkedIn Clone Source Code](https://github.com/DhilipKumarM18/LinkedIn-Clone
)
