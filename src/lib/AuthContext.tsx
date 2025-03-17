"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// 🔹 사용자 정보 타입 정의
interface User {
  id: string;
  name: string;
  role: "student" | "teacher";
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// 🔹 AuthContext 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_EXPIRATION_TIME = 60 * 60 * 1000; // 1시간 (밀리초)

// 🔹 AuthProvider 구현
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const router = useRouter();

  // 🔹 로그인 시 사용자 정보 저장
  const login = (userData: User) => {
    const loginTime = new Date().getTime();
    
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // 현재 탭에서 세션 유지
    localStorage.setItem("loginTime", loginTime.toString()); // 로그인 시간 저장
  };

  // 🔹 로그아웃 시 상태 초기화 및 로컬 스토리지 제거
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("loginTime");
    router.push("/auth/signin");
  };

  // 🔹 새로고침 시 로그인 상태 복구
  useEffect(() => {
    const restoreSession = () => {
      const storedUser = localStorage.getItem("user");
      const loginTime = localStorage.getItem("loginTime");

      if (storedUser && loginTime) {
        const elapsedTime = new Date().getTime() - parseInt(loginTime, 10);
        
        if (elapsedTime > SESSION_EXPIRATION_TIME) {
          logout(); // 1시간이 지나면 자동 로그아웃
        } else {
          setUser(JSON.parse(storedUser)); // 🔹 새로고침 후 로그인 상태 유지
        }
      } else {
        setUser(null); // 🔹 세션 정보가 없으면 null 설정
      }
    };

    restoreSession();
  }, []); 
  
  // 🔹 초기 `undefined` 상태를 처리하기 위해 로딩 표시
  if (user === undefined) {
    return ;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 AuthContext를 쉽게 사용하기 위한 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
