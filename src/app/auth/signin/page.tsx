"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { logIn } from "@/utils/firebaseConfig";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";
import Image from "next/image";

export default function SignInPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {login} = useAuth();
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const userData = await logIn(id, password);
      const userdata = {
        id: userData.id,
        name: userData.name,
        role: userData.role,
      };
      console.log(userdata)
      login(userdata);
      setIsLoading(false);
      router.push("/projects");
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 flex flex-col md:flex-row">
        {/* Left Side - Form */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <Link href="/" className="flex items-center gap-2 absolute top-0 left-0 ml-10 mt-2">
          <div className="relative">
            <Image
              src="/TYPO_logo.svg"
              alt="typo logo"
              width={100}
              height={100}
              className="h-20 w-auto"
            />
          </div>
        </Link>
          <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">로그인</h1>
              <p className="mt-2 text-gray-600">TYPO에 오신 것을 환영합니다!</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    아이디
                  </label>
                  <input
                    id="text"
                    type="text"
                    placeholder="gildong"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      비밀번호
                    </label>
                    
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "숨기기" : "보기"}
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    로그인 상태 유지
                  </label>
                </div>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className={`cursor-pointer w-full py-2 px-4 rounded-md text-white font-medium ${
                  isLoading ? "bg-blue-400" : "bg-[#3BB7EB] hover:bg-[#3BB7EB]"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "로그인 중..." : "로그인"}
              </button>

              <div className="text-center mt-[-8px]">
                <Link href="/auth/signup" className="text-[#3BB7EB] hover:underline">
                  회원가입
                </Link>
              </div>
              
              
            </form>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="relative hidden md:flex md:w-1/2 bg-blue-100 items-center justify-center ">
          <div className="max-w-md text-center">
            <div className="absolute inset-0 z-0 w-full h-full mx-auto">
              <Image
                src="/WELCOME.png"
                alt="Kids learning"
                width={1000}
                height={500}
                className="object-cover w-full h-full z-0"
              />
              <div className="absolute inset-0 bg-black/50 z-10"></div>
            </div>
            
          </div>
          <div className="mt-8 z-20 text-center">
              <h2 className="text-4xl font-bold text-white">우리 아이의 미래를 함께 만들어요</h2>
              <p className="mt-2 text-white text-xl">TYPO와 함께 아이의 학습 여정을 시작하세요.</p>
            </div>
        </div>
      </main>
    </div>
    
  );
}
