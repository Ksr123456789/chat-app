import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";
import { useEffect, useState } from "react";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { selectedUser, messages, setMessages } = useAuthContext();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const id = selectedUser._id;
        const res = await fetch(
          `http://localhost:8080/api/v1/message/get/${id}`,
          {
            credentials: `include`,
          }
        );
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedUser?._id) getMessages();
  }, [selectedUser?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
