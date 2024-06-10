import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthenticatedUser } = useAuthContext();
  const login = async (userName, password) => {
    let fields = inputErrors({ userName, password });
    if (!fields) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/v1/auth/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userName, password }),
        credentials: "include",
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      localStorage.setItem("userDetails", JSON.stringify(data));
      setAuthenticatedUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { login, loading };
};

export default useLogin;

function inputErrors({ userName, password }) {
  if (!userName || !password) {
    toast.error(`fill all the fields`);
    return false;
  }
  return true;
}
