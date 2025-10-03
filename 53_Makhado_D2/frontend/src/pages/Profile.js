import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import BigBlock from "../components/BigBlock";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { userAPI, friendAPI, activityAPI } from "../api/api";

export default function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [activityData, setActivityData] = useState([]);
  const [friendData, setFriendData] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [friendshipStatus, setFriendshipStatus] = useState("none");
  const [processingFriendAction, setProcessingFriendAction] = useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const isOwnProfile = !id || id === currentUser._id;

  useEffect(() => {
    fetchProfileData();
  }, [id]);

  async function fetchProfileData() {
    try {
      setLoading(true);

      // Fetch user data
      let user;
      if (isOwnProfile) {
        user = await userAPI.getCurrentUser();
      } else {
        user = await userAPI.getUserById(id);
      }
      setUserData(user);
      setEditForm({
        username: user.username || "",
        bio: user.bio || "",
        email: user.email || "",
      });

      if (!isOwnProfile) {
        const statusResponse = await friendAPI.getFriendshipStatus(id);
        setFriendshipStatus(statusResponse.status);
      }

      if (isOwnProfile) {
        const activities = await activityAPI.getFriendsFeed(10);
        const userActivities = activities.filter(
          (activity) =>
            activity.user_id === currentUser._id ||
            activity.user?._id === currentUser._id
        );
        setActivityData(userActivities);

        const friends = await friendAPI.getFriends();
        setFriendData(Array.isArray(friends) ? friends : []);

        const requests = await friendAPI.getPendingRequests();
        setPendingRequests(Array.isArray(requests) ? requests : []);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateProfile() {
    try {
      const updateData = { ...editForm };

      if (selectedProfileImage) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          updateData.profile_picture = reader.result;
          await userAPI.updateProfile(updateData);
          await fetchProfileData();
          setIsEditing(false);
          setSelectedProfileImage(null);
          setImagePreview(null);
        };
        reader.readAsDataURL(selectedProfileImage);
        return;
      }

      await userAPI.updateProfile(updateData);
      await fetchProfileData();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  }

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        return;
      }
      setSelectedProfileImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
  }

  function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

    return date.toLocaleDateString();
  }

  // Friend action handlers
  async function handleSendFriendRequest() {
    try {
      setProcessingFriendAction(true);
      await friendAPI.sendFriendRequest(id);
      setFriendshipStatus("request_sent");
      alert("Friend request sent!");
    } catch (error) {
      console.error("Error sending friend request:", error);
      alert("Failed to send friend request");
    } finally {
      setProcessingFriendAction(false);
    }
  }

  async function handleAcceptFriendRequest() {
    try {
      setProcessingFriendAction(true);
      await friendAPI.acceptFriendRequest(id);
      setFriendshipStatus("friends");
      alert("Friend request accepted!");
      await fetchProfileData();
    } catch (error) {
      console.error("Error accepting friend request:", error);
      alert("Failed to accept friend request");
    } finally {
      setProcessingFriendAction(false);
    }
  }

  async function handleDeclineFriendRequest() {
    try {
      setProcessingFriendAction(true);
      await friendAPI.declineRequest(id);
      setFriendshipStatus("none");
      alert("Friend request declined");
      await fetchProfileData();
    } catch (error) {
      console.error("Error declining friend request:", error);
      alert("Failed to decline friend request");
    } finally {
      setProcessingFriendAction(false);
    }
  }

  async function handleUnfriend(friendId) {
    try {
      if (!confirm("Are you sure you want to unfriend this person?")) {
        return;
      }

      await friendAPI.unfriend(friendId);
      alert("Friend removed successfully!");

      if (!isOwnProfile && id === friendId) {
        setFriendshipStatus("none");
      }

      await fetchProfileData();
    } catch (error) {
      console.error("Error unfriending:", error);
      alert("Failed to remove friend");
    }
  }

  async function handleAcceptRequest(requesterId) {
    try {
      await friendAPI.acceptFriendRequest(requesterId);
      alert("Friend request accepted!");
      await fetchProfileData();
    } catch (error) {
      console.error("Error accepting friend request:", error);
      alert("Failed to accept friend request");
    }
  }

  async function handleDeclineRequest(requesterId) {
    try {
      await friendAPI.declineRequest(requesterId);
      alert("Friend request declined");
      await fetchProfileData();
    } catch (error) {
      console.error("Error declining friend request:", error);
      alert("Failed to decline friend request");
    }
  }

  async function handleUnfriendFromProfile() {
    if (confirm("Are you sure you want to unfriend this user?")) {
      try {
        setProcessingFriendAction(true);
        await friendAPI.unfriend(id);
        setFriendshipStatus("none");
        alert("User unfriended");
      } catch (error) {
        console.error("Error unfriending user:", error);
        alert("Failed to unfriend user");
      } finally {
        setProcessingFriendAction(false);
      }
    }
  }

  function profileHeader() {
    if (!userData) return null;

    return (
      <>
        <div className="col-2 d-flex align-items-center justify-content-center p-0">
          <img
            src={
              userData.profile_picture ||
              "/assets/images/profilePlaceholder.png"
            }
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
            {userData.username}
          </h2>
          <p
            style={{
              fontFamily: "SudoFont",
              opacity: 0.7,
              margin: "4px 0",
              fontSize: "14px",
            }}
          >
            Joined {formatDate(userData.created_at)}
          </p>
          <p
            style={{
              fontFamily: "SudoFont",
              opacity: 0.6,
              margin: "4px 0",
              fontSize: "12px",
            }}
          >
            {userData.email}
          </p>

          {!isOwnProfile && (
            <div className="mt-3">
              {friendshipStatus === "none" && (
                <Button
                  label="Send Friend Request"
                  onClick={handleSendFriendRequest}
                />
              )}

              {friendshipStatus === "request_sent" && (
                <Button
                  label="Friend Request Sent"
                  onClick={() => {}}
                  style={{ opacity: 0.7, cursor: "default" }}
                />
              )}

              {friendshipStatus === "request_received" && (
                <div className="d-flex gap-2">
                  <Button
                    label="Accept Request"
                    onClick={handleAcceptFriendRequest}
                  />
                  <Button
                    label="Decline"
                    onClick={handleDeclineFriendRequest}
                    style={{
                      backgroundColor: "#dc3545",
                      borderColor: "#dc3545",
                    }}
                  />
                </div>
              )}

              {friendshipStatus === "friends" && (
                <Button
                  label="Unfriend"
                  onClick={handleUnfriendFromProfile}
                  style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }}
                />
              )}
            </div>
          )}
        </div>
        <div
          className="col d-flex flex-column justify-content-center ps-4"
          style={{ borderLeft: "2px solid #000" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h4
              style={{ fontFamily: "SudoFont", fontWeight: "600", margin: 0 }}
            >
              Biography
            </h4>
            {isOwnProfile && (
              <Button
                label={isEditing ? "Cancel" : "Edit Profile"}
                onClick={() => setIsEditing(!isEditing)}
              />
            )}
          </div>
          {isEditing ? (
            <div className="mt-3">
              <div className="mb-3">
                <label
                  className="form-label"
                  style={{ fontFamily: "SudoFont" }}
                >
                  Profile Image
                </label>
                <div className="d-flex align-items-center gap-3">
                  <div>
                    <img
                      src={
                        imagePreview ||
                        userData.profile_picture ||
                        "/assets/images/profilePlaceholder.png"
                      }
                      alt="Profile preview"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "3px solid #000",
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      style={{
                        fontFamily: "SudoFont",
                        border: "2px solid #000",
                        borderRadius: "8px",
                        padding: "8px",
                      }}
                    />
                    <small
                      style={{
                        display: "block",
                        marginTop: "4px",
                        opacity: 0.7,
                      }}
                    >
                      Max size: 5MB
                    </small>
                  </div>
                </div>
              </div>

              <InputField
                id="username"
                label="Username"
                value={editForm.username}
                onChange={(e) =>
                  setEditForm({ ...editForm, username: e.target.value })
                }
              />
              <div className="mb-3">
                <label
                  className="form-label"
                  style={{ fontFamily: "SudoFont" }}
                >
                  Bio
                </label>
                <textarea
                  className="form-control"
                  value={editForm.bio}
                  onChange={(e) =>
                    setEditForm({ ...editForm, bio: e.target.value })
                  }
                  style={{
                    fontFamily: "SudoFont",
                    borderRadius: "20px",
                    border: "3px solid #000",
                  }}
                  rows="3"
                />
              </div>
              <Button label="Save Changes" onClick={handleUpdateProfile} />
            </div>
          ) : (
            <p
              style={{
                fontFamily: "SudoFont",
                opacity: 0.7,
                margin: "8px 0 0 0",
                fontSize: "14px",
                lineHeight: "1.5",
              }}
            >
              {userData.bio || "No bio available"}
            </p>
          )}
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

  function activityFeed() {
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
          {activityData.length > 0 ? (
            activityData.map((activity) => preview(activity))
          ) : (
            <p
              style={{
                fontFamily: "SudoFont",
                opacity: 0.7,
                textAlign: "center",
              }}
            >
              No recent activity
            </p>
          )}
        </div>
      </>
    );
  }

  function preview(activity) {
    const getActivityMessage = (activity) => {
      if (
        activity.type === "checkin" &&
        activity.checkin &&
        activity.checkin[0]
      ) {
        return activity.checkin[0].message;
      }
      if (activity.type === "checkout") {
        return activity.message || "Project checked out";
      }
      return "Activity occurred";
    };

    const getProjectName = (activity) => {
      if (activity.project && activity.project[0]) {
        return activity.project[0].name;
      }
      return "Unknown Project";
    };

    return (
      <div
        key={activity._id}
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
            src={
              activity.user?.profile_picture ||
              "/assets/images/profilePlaceholder.png"
            }
            alt="User"
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
            {getActivityMessage(activity)} • {getProjectName(activity)}
          </p>
          <span
            style={{
              fontFamily: "SudoFont",
              fontSize: "12px",
              opacity: 0.6,
            }}
          >
            {formatTimeAgo(activity.timestamp)}
          </span>
        </div>
      </div>
    );
  }

  function pendingRequestsList() {
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
          Friend Requests ({pendingRequests.length})
        </h4>
        {pendingRequests.length > 0 ? (
          pendingRequests.map((request) => (
            <div
              key={request._id}
              className="mb-3 p-3"
              style={{
                border: "2px solid #000",
                borderRadius: "12px",
                backgroundColor: "#f8f9fa",
              }}
            >
              <div className="d-flex align-items-center mb-2">
                <img
                  src={
                    request.sender.profile_picture ||
                    "/assets/images/profilePlaceholder.png"
                  }
                  alt="Sender"
                  className="img-fluid me-3"
                  style={{
                    borderRadius: "50px",
                    height: "40px",
                    width: "40px",
                    objectFit: "cover",
                  }}
                />
                <div className="flex-grow-1">
                  <p
                    style={{
                      fontFamily: "SudoFont",
                      margin: 0,
                      fontWeight: "500",
                    }}
                  >
                    {request.sender.username}
                  </p>
                  {request.sender.bio && (
                    <small
                      style={{
                        fontFamily: "SudoFont",
                        opacity: 0.7,
                        fontSize: "12px",
                      }}
                    >
                      {request.sender.bio}
                    </small>
                  )}
                </div>
              </div>
              <div className="d-flex gap-2">
                <Button
                  label="Accept"
                  onClick={() => handleAcceptRequest(request.sender._id)}
                  style={{ fontSize: "12px", padding: "4px 12px" }}
                />
                <Button
                  label="Decline"
                  onClick={() => handleDeclineRequest(request.sender._id)}
                  style={{
                    fontSize: "12px",
                    padding: "4px 12px",
                    backgroundColor: "#dc3545",
                    borderColor: "#dc3545",
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <p
            style={{
              fontFamily: "SudoFont",
              opacity: 0.7,
              textAlign: "center",
            }}
          >
            No pending requests
          </p>
        )}
      </>
    );
  }

  function friendList() {
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
        {friendData.length > 0 ? (
          friendData.map((friendItem, index) =>
            friendPreview(friendItem, index)
          )
        ) : (
          <p
            style={{
              fontFamily: "SudoFont",
              opacity: 0.7,
              textAlign: "center",
            }}
          >
            No friends yet
          </p>
        )}
      </>
    );
  }

  function friendPreview(friendItem, index) {
    if (!friendItem || !friendItem.friend) {
      return null;
    }

    return (
      <div
        key={friendItem.friend._id || index}
        className="row mb-3 align-items-center"
      >
        <div className="col-3 d-flex justify-content-center p-0">
          <img
            src={
              friendItem.friend.profile_picture ||
              "/assets/images/profilePlaceholder.png"
            }
            alt={friendItem.friend.username}
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
            {friendItem.friend.username}
          </p>
          <span
            style={{
              fontFamily: "SudoFont",
              fontSize: "12px",
              opacity: 0.6,
            }}
          >
            {friendItem.friend.bio || "No bio available"}
          </span>
        </div>
        {isOwnProfile && (
          <div className="col-auto">
            <Button
              label="Unfriend"
              onClick={() => handleUnfriend(friendItem.friend._id)}
              style={{
                fontSize: "12px",
                padding: "4px 8px",
                backgroundColor: "#dc3545",
                borderColor: "#dc3545",
                color: "white",
              }}
            />
          </div>
        )}
      </div>
    );
  }

  function content() {
    if (loading) {
      return (
        <div className="container text-center p-4">
          <div style={{ fontFamily: "SudoFont" }}>Loading profile...</div>
        </div>
      );
    }

    if (!userData) {
      return (
        <div className="container text-center p-4">
          <div style={{ fontFamily: "SudoFont", opacity: 0.7 }}>
            Profile not found
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="container align-self-start">
          <div
            className="row align-items-center py-4"
            style={{
              borderBottom: "2px solid #000",
              backgroundColor: "#f8f9fa",
              borderRadius: "12px 12px 0 0",
              padding: "20px",
            }}
          >
            {profileHeader()}
          </div>
          <div className="row py-4" style={{ minHeight: "500px" }}>
            <div className="col pe-4">
              {isOwnProfile && pendingRequestsList()}
            </div>
            <div
              className="col-6 px-4"
              style={{
                borderLeft: "2px solid #eee",
                borderRight: "2px solid #eee",
              }}
            >
              {activityFeed()}
            </div>
            <div className="col ps-4">{isOwnProfile && friendList()}</div>
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
