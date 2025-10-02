import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const useUserAuth = () => {
  // Get user and context functions to update/clear user
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If there is already a user, no need to call the API again.
    if (user) return;

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        // call API to get user info
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

        if (isMounted && response.data) {
          updateUser(response.data.user); 
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);

        if (isMounted) {
          clearUser(); 
          navigate("/login");
        }
      }
    };

    fetchUserInfo();

    // Cleanup khi component unmount
    return () => {
      isMounted = false;
    };
  }, [updateUser, clearUser, navigate]);
};
