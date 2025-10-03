import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { activityAPI } from "../api/api";

export default function Feed({ scope, searchQuery }) {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, [scope]);

  async function fetchActivities() {
    try {
      setLoading(true);
      let data;

      if (scope === "friends") {
        data = await activityAPI.getFriendsFeed();
      } else {
        data = await activityAPI.getGlobalFeed();
      }

      setActivities(data || []);
    } catch (error) {
      console.error("Error fetching activities:", error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString) {
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

  function getActivityMessage(activity) {
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
  }

  function getProjectName(activity) {
    if (activity.project && activity.project[0]) {
      return activity.project[0].name;
    }
    return "Unknown Project";
  }

  function getProjectTags(activity) {
    if (activity.project && activity.project[0] && activity.project[0].tags) {
      return activity.project[0].tags;
    }
    return [];
  }

  function preview(activity) {
    // Extract project ID from the nested project structure
    let projectId = null;

    if (activity.project_id) {
      // Direct project_id if available
      projectId = activity.project_id;
    } else if (
      activity.project &&
      activity.project[0] &&
      activity.project[0]._id
    ) {
      // Project ID from nested project array
      projectId = activity.project[0]._id;
    } else if (
      activity.checkin &&
      activity.checkin[0] &&
      activity.checkin[0].project_id
    ) {
      // Project ID from nested checkin
      projectId = activity.checkin[0].project_id;
    }

    const handleClick = () => {
      if (projectId) {
        navigate(`/project/${projectId}`);
      } else {
        console.log("No project ID found in activity:", activity);
      }
    };

    const hasValidProject = !!projectId;

    return (
      <div
        key={activity._id}
        className="row mb-3 p-3"
        style={{
          border: "2px solid #000",
          borderRadius: "60px",
          fontFamily: "SudoFont",
          cursor: hasValidProject ? "pointer" : "default",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          margin: "0 10px",
          opacity: hasValidProject ? 1 : 0.8,
        }}
        onClick={hasValidProject ? handleClick : undefined}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div className="col-1 d-flex align-items-center justify-content-center p-0">
          <img
            src={
              activity.user?.profile_picture ||
              "/assets/images/profilePlaceholder.png"
            }
            alt={activity.user?.username}
            className="img-fluid"
            style={{
              borderRadius: "60px",
              height: "60px",
              width: "60px",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="col d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-between align-items-start">
            <h5
              className="mb-1"
              style={{ fontFamily: "SudoFont", fontWeight: "600" }}
            >
              {activity.user?.username}
            </h5>
            <span
              style={{
                fontSize: "12px",
                opacity: 0.6,
                backgroundColor: "#f0f0f0",
                padding: "4px 12px",
                borderRadius: "20px",
                border: "1px solid #ddd",
                fontFamily: "SudoFont",
              }}
            >
              {activity.type === "checkin"
                ? "Check-in"
                : activity.type === "checkout"
                ? "Check-out"
                : activity.type}
            </span>
          </div>
          <p
            style={{
              margin: "8px 0",
              opacity: 0.7,
              fontWeight: "normal",
              fontSize: "14px",
              fontFamily: "SudoFont",
            }}
          >
            {getActivityMessage(activity)} • {getProjectName(activity)}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <span
              style={{
                fontSize: "12px",
                opacity: 0.5,
                fontFamily: "SudoFont",
              }}
            >
              {formatDate(activity.timestamp)}
            </span>
            <div className="d-flex gap-2">
              {getProjectTags(activity).map((tag, index) => (
                <span
                  key={index}
                  style={{
                    fontSize: "11px",
                    fontFamily: "SudoFont",
                    backgroundColor: "#e9ecef",
                    padding: "2px 8px",
                    borderRadius: "15px",
                    border: "1px solid #dee2e6",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Filter activities based on search query
  const filteredActivities = activities.filter((activity) => {
    if (!searchQuery) return true;

    const username = activity.user?.username?.toLowerCase() || "";
    const message = getActivityMessage(activity).toLowerCase();
    const projectName = getProjectName(activity).toLowerCase();
    const tags = getProjectTags(activity).join(" ").toLowerCase();
    const query = searchQuery.toLowerCase();

    return (
      username.includes(query) ||
      message.includes(query) ||
      projectName.includes(query) ||
      tags.includes(query)
    );
  });

  if (loading) {
    return (
      <div className="container text-center p-4">
        <div style={{ fontFamily: "SudoFont" }}>Loading activities...</div>
      </div>
    );
  }

  if (filteredActivities.length === 0) {
    return (
      <div className="container text-center p-4">
        <div style={{ fontFamily: "SudoFont", opacity: 0.7 }}>
          {searchQuery
            ? "No activities found matching your search."
            : "No activities to display."}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        {filteredActivities.map((activity) => preview(activity))}
      </div>
    </>
  );
}
