import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedUser, messages, setMessages } = useAuthContext();
  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/message/send/${selectedUser._id}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ message }),
          credentials: "include",
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.error) throw new Error(data.error);
      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading };
};

export default useSendMessage;
