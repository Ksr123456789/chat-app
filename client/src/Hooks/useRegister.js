import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthenticatedUser } = useAuthContext();
  const register = async (
    fullName,
    userName,
    password,
    confirmPassword,
    gender
  ) => {
    const fields = inputError(
      fullName,
      userName,
      password,
      confirmPassword,
      gender
    );

    if (!fields) return;

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/v1/auth/register`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fullName,
          userName,
          password,
          confirmPassword,
          gender,
        }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      console.log(data);
      localStorage.setItem("userDetails", JSON.stringify(data));
      setAuthenticatedUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
};

export default useRegister;

function inputError(fullName, userName, password, confirmPassword, gender) {
  if (!fullName || !userName || !password || !confirmPassword || !gender) {
    toast.error(`fill all the fields`);
    return false;
  } else if (password !== confirmPassword) {
    toast.error(`password does't match`);
    return false;
  }
  return true;
}
