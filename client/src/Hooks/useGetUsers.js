import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8080/api/v1/users/all`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        //console.log(data);
        setUsers(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getAllUsers();
  }, []);

  return { users, loading };
};

export default useGetUsers;
