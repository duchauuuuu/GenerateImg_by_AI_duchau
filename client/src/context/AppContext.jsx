import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [credit, setCredit] = useState(0);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const navigate = useNavigate();

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/image/generate-image',
        { prompt },
        { headers: { token, Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        loadCreditsData();
        return data.resultImage;
      } else {
        toast.error(data.message);
        loadCreditsData();
        if (data.creditBalance === 0) {
          navigate('/buy');
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setCredit(0);
    toast.success("Đã đăng xuất");
  };

  const loadCreditsData = async () => {
    try {
      console.log("Token sent to /api/user/credits:", token);
      if (!token) {
        console.log("No token available, skipping API call");
        setShowLogin(true);
        return;
      }
      const { data } = await axios.get(backendUrl + '/api/user/credits', {
        headers: {
          token,
          // Authorization: `Bearer ${token}`,
        },
      });
      console.log("API /api/user/credits response:", data);
      if (data.success) {
        setCredit(data.credits || 0);
        const decodedToken = jwtDecode(token);
        setUser({ _id: decodedToken.id, name: data.user.name });
      } else {
        console.log("API failed:", data.message);
        toast.error(data.message || "Không thể tải số dư tín dụng");
        if (data.message.includes("Không xác thực được")) {
          setShowLogin(true);
        }
      }
    } catch (error) {
      console.log("Error in loadCreditsData:", error.message);
      toast.error(error.message);
      if (error.response?.data?.message?.includes("Không xác thực được")) {
        setShowLogin(true);
      }
    }
  };

  useEffect(() => {
    console.log("AppContextProvider mounted, initial token:", token);
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendUrl,
        token,
        setToken,
        credit,
        setCredit,
        loadCreditsData,
        logout,
        generateImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;