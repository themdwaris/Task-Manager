"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserTask } from "@/context/UserTaskContext";

const Notify = () => {
  const { user, notify } = useUserTask();
  const [message, setMessage] = useState("");

  const fetchNotification = async () => {
    try {
      const res = await axios.get(`/api/notification?userId=${user?._id}`);
      if (res?.data?.length > 0) {
        const latest = res.data[0];
        if (!latest.isRead) {
          setMessage(latest.message);
          
          // Auto-hide after 3 seconds and mark as read
          setTimeout(async () => {
            setMessage(""); // hide message
            await axios.put(`/api/notification/${latest._id}`); // mark as read
          }, 5000);
        }
      }
    } catch (err) {
      console.error("Notification error:", err);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchNotification();
    }
  }, [user, notify]);

  if (!message) return null;

  return (
    <>
      <div className="fixed top-4 right-4 bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg z-50">
        {message}
      </div>
    </>
  );
};

export default Notify;
