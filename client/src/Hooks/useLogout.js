import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthenticatedUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/v1/auth/logout`, {
        credentials: `include`,
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAuthenticatedUser(null);
      localStorage.removeItem("userDetails");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
};

export default useLogout;
