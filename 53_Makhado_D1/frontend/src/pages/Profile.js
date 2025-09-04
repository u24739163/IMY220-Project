import React from "react";
import Navbar from "../components/Navbar";
import BigBlock from "../components/BigBlock";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default function Profile() {
  let userData = {
    name: "Alice Johnson",
    joined: "January 1, 2020",
    bio: "Full-stack developer passionate about creating innovative web applications. Love working with React, Node.js, and modern web technologies.",
    image: "/assets/images/profilePlaceholder.png",
    email: "alice.johnson@example.com",
    location: "San Francisco, CA",
    website: "alicejohnson.dev",
  };

  let activityData = [
    {
      id: 1,
      username: "Alice Johnson",
      repo: "React-Project",
      action: "Checked out a new branch",
      repoImage: "/assets/images/imagePlaceholder.jpg",
      time: "2 hours ago",
    },
    {
      id: 2,
      username: "Alice Johnson",
      repo: "React-Project",
      action: "Opened a pull request",
      repoImage: "/assets/images/imagePlaceholder.jpg",
      time: "5 hours ago",
    },
    {
      id: 3,
      username: "Alice Johnson",
      repo: "React-Project",
      action: "Merged a pull request",
      repoImage: "/assets/images/imagePlaceholder.jpg",
      time: "1 day ago",
    },
    {
      id: 4,
      username: "Alice Johnson",
      repo: "React-Project",
      action: "Pushed changes to the main branch",
      repoImage: "/assets/images/imagePlaceholder.jpg",
      time: "2 days ago",
    },
  ];

  let friendData = [
    {
      id: 1,
      name: "Bob Smith",
      image: "/assets/images/profilePlaceholder.png",
      role: "Frontend Developer",
    },
    {
      id: 2,
      name: "Charlie Brown",
      image: "/assets/images/profilePlaceholder.png",
      role: "Backend Engineer",
    },
    {
      id: 3,
      name: "David Wilson",
      image: "/assets/images/profilePlaceholder.png",
      role: "UI/UX Designer",
    },
  ];

  function profileHeader({ userData }) {
    return (
      <>
        <div className="col-2 d-flex align-items-center justify-content-center p-0">
          <img
            src={userData.image}
            alt="Profile"
            className="img-fluid"
            style={{
              borderRadius: "60px",
              height: "80px",
              width: "80px",
              objectFit: "cover",
              border: "3px solid #000",
            }}
          />
        </div>
        <div className="col-4 d-flex flex-column justify-content-center ps-3">
          <h2 style={{ fontFamily: "SudoFont", fontWeight: "600", margin: 0 }}>
            {userData.name}
          </h2>
          <p
            style={{
              fontFamily: "SudoFont",
              opacity: 0.7,
              margin: "4px 0",
              fontSize: "14px",
            }}
          >
            Joined {userData.joined}
          </p>
          <div className="d-flex gap-3">
            <span
              style={{
                fontFamily: "SudoFont",
                fontSize: "12px",
                opacity: 0.6,
              }}
            >
              {userData.location}
            </span>
            <span
              style={{
                fontFamily: "SudoFont",
                fontSize: "12px",
                opacity: 0.6,
              }}
            >
              {userData.website}
            </span>
          </div>
        </div>
        <div
          className="col d-flex flex-column justify-content-center ps-4"
          style={{ borderLeft: "2px solid #000" }}
        >
          <h4 style={{ fontFamily: "SudoFont", fontWeight: "600", margin: 0 }}>
            Biography
          </h4>
          <p
            style={{
              fontFamily: "SudoFont",
              opacity: 0.7,
              margin: "8px 0 0 0",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            {userData.bio}
          </p>
        </div>
      </>
    );
  }

  function profileInfo({ userData }) {
    return (
      <>
        <div className="container">
          <h4
            style={{
              fontFamily: "SudoFont",
              fontWeight: "600",
              marginBottom: "20px",
              color: "#555",
            }}
          >
            Account Information
          </h4>
          <div className="row mb-3">
            <InputField
              placeholder={userData.name}
              label="Username"
              disabled={true}
              style={{
                backgroundColor: "#f8f9fa",
                borderColor: "#ddd",
              }}
            />
          </div>
          <div className="row mb-3">
            <InputField
              placeholder={userData.email}
              label="Email"
              disabled={true}
              style={{
                backgroundColor: "#f8f9fa",
                borderColor: "#ddd",
              }}
            />
          </div>
          <div className="row mb-4">
            <InputField
              label="Password"
              placeholder="••••••••"
              type="password"
              disabled={true}
              style={{
                backgroundColor: "#f8f9fa",
                borderColor: "#ddd",
              }}
            />
          </div>
          <div className="row">
            <div className="col-12">
              <Button
                label="Edit Profile"
                onClick={() => console.log("Edit clicked")}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  function activityFeed({ activityData }) {
    return (
      <>
        <div className="ms-1 me-1">
          <h4
            style={{
              fontFamily: "SudoFont",
              fontWeight: "600",
              marginBottom: "20px",
              color: "#555",
            }}
          >
            Recent Activity
          </h4>
          {activityData.map((activity) => preview(activity))}
        </div>
      </>
    );
  }

  function preview(activity) {
    return (
      <div
        key={activity.id}
        className="row mb-3 p-3"
        style={{
          border: "2px solid #000",
          borderRadius: "60px",
          fontFamily: "SudoFont",
          backgroundColor: "#fafafa",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateX(4px)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateX(0)")
        }
      >
        <div className="col-2 d-flex align-items-center justify-content-center p-0">
          <img
            src={activity.repoImage}
            alt={activity.repo}
            className="img-fluid"
            style={{
              borderRadius: "60px",
              height: "50px",
              width: "50px",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="col mt-1">
          <p
            style={{
              fontFamily: "SudoFont",
              fontSize: "14px",
              margin: 0,
              fontWeight: "500",
            }}
          >
            {activity.username} {activity.action} in {activity.repo}
          </p>
          <span
            style={{
              fontFamily: "SudoFont",
              fontSize: "12px",
              opacity: 0.6,
            }}
          >
            {activity.time}
          </span>
        </div>
      </div>
    );
  }

  function friendList({ friendData }) {
    return (
      <>
        <h4
          style={{
            fontFamily: "SudoFont",
            fontWeight: "600",
            marginBottom: "20px",
            color: "#555",
          }}
        >
          Friends ({friendData.length})
        </h4>
        {friendData.map((friend) => friendPreview({ friend }))}
      </>
    );
  }

  function friendPreview({ friend }) {
    return (
      <div key={friend.id} className="row mb-3 align-items-center">
        <div className="col-3 d-flex justify-content-center p-0">
          <img
            src={friend.image}
            alt={friend.name}
            className="img-fluid"
            style={{
              borderRadius: "60px",
              height: "50px",
              width: "50px",
              objectFit: "cover",
              border: "2px solid #000",
            }}
          />
        </div>
        <div className="col">
          <p
            style={{
              fontFamily: "SudoFont",
              fontWeight: "500",
              margin: 0,
            }}
          >
            {friend.name}
          </p>
          <span
            style={{
              fontFamily: "SudoFont",
              fontSize: "12px",
              opacity: 0.6,
            }}
          >
            {friend.role}
          </span>
        </div>
      </div>
    );
  }

  function content() {
    return (
      <>
        <div className="container align-self-start">
          {/* Profile Header */}
          <div
            className="row align-items-center py-4"
            style={{
              borderBottom: "2px solid #000",
              backgroundColor: "#f8f9fa",
              borderRadius: "12px 12px 0 0",
              padding: "20px",
            }}
          >
            {profileHeader({ userData })}
          </div>

          {/* Main Content */}
          <div className="row py-4" style={{ minHeight: "500px" }}>
            {/* Left Column - Profile Info */}
            <div className="col pe-4">{profileInfo({ userData })}</div>

            {/* Middle Column - Activity Feed */}
            <div
              className="col-5 px-4"
              style={{
                borderLeft: "2px solid #eee",
                borderRight: "2px solid #eee",
              }}
            >
              {activityFeed({ activityData })}
            </div>

            {/* Right Column - Friends */}
            <div className="col ps-4">{friendList({ friendData })}</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <Navbar />
        </div>
        <div className="row justify-content-center">
          <BigBlock content={content()} />
        </div>
      </div>
    </>
  );
}
