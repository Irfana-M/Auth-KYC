import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import api from "../api/axiosInstance";

type User = {
  id: string;
  email: string;
  kycSubmitted: boolean;
};

interface AuthContextType {
  accessToken: string | null;
  user: User | null;

  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const login = (token: string, userData: User) => {
    setAccessToken(token);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post("users/logout");
    } catch (err) {
      console.error(err);
    }
    setAccessToken(null);
    setUser(null);
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    try {
      const response = await api.post("/users/refresh");
      const newToken = response.data?.data?.accessToken;
      const userData: User | undefined = response.data?.data?.user;
      if (newToken) {
        setAccessToken(newToken);
        if (userData) setUser(userData);
        return newToken;
      }
      return null;
    } catch (err) {
      console.error("Refresh token failed", err);
      setAccessToken(null);
      return null;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        await refreshAccessToken();
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url?.includes("/users/refresh")
        ) {
          originalRequest._retry = true;

          const newToken = await refreshAccessToken();

          if (newToken) {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return api(originalRequest);
          } else {
            setAccessToken(null);
            window.location.href = "users/login";
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  useEffect(() => {
    const interceptor = api.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    return () => api.interceptors.request.eject(interceptor);
  }, [accessToken]);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        login,
        logout,
        isAuthenticated: !!accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
