
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/utils/firebaseConfig";
import Link from "next/link";
import Image from "next/image";

export default function SignUpPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [schoolOrPhone, setSchoolOrPhone] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await signUp(id, password, name, role, schoolOrPhone);
      setIsLoading(false);
      router.push("/auth/signin"); // 회원가입 성공 시 로그인 페이지로 이동
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 flex flex-col md:flex-row">
        {/* Left Side - Form */}
        <div className="relative w-full flex items-center justify-center p-6 md:p-12">
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
              <h1 className="text-2xl font-bold text-gray-900">회원가입</h1>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    회원 유형
                  </label>
                  <select
                    id="role"
                    className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={role}
                    onChange={(e) => setRole(e.target.value as "student" | "teacher")}
                    required
                  >
                    <option value="" disabled>
                      회원 유형을 선택해주세요
                    </option>
                    <option value="teacher">교사</option>
                    <option value="student">학생</option>
                  </select>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      이름
                    </label>
                    
                  </div>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      placeholder="이름을 입력해주세요."
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    아이디
                  </label>
                  <input
                    id="text"
                    type="text"
                    placeholder="아이디를 입력해주세요."
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
                      type="text"
                      placeholder="비밀번호를 입력해주세요."
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    
                  </div>
                </div>
                {role === "student" ? (
                  <div>
                    <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
                      학교 이름
                    </label>
                    <input
                      id="school"
                      type="text"
                      placeholder="학교 이름을 입력해주세요."
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={schoolOrPhone}
                      onChange={(e) => setSchoolOrPhone(e.target.value)}
                      required
                    />
                  </div>) : (
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        전화번호
                      </label>
                      <input
                        id="phone"
                        type="text"
                        placeholder="전화번호를 입력해주세요."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={schoolOrPhone}
                        onChange={(e) => setSchoolOrPhone(e.target.value)}
                        required
                      />
                    </div>
                  )}
                
              </div>
              {error && <p className="text-red-500">{error}</p>}

              <button
                type="submit"
                className={`cursor-pointer w-full py-2 px-4 rounded-md text-white font-medium ${
                  isLoading ? "bg-blue-400" : "bg-[#3BB7EB] hover:bg-[#3BB7EB]"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "회원가입 중..." : "회원가입"}
              </button>

              <div className="text-center mt-[-8px]">
                <Link href="/auth/signin" className="text-[#3BB7EB] hover:underline">
                  로그인하기
                </Link>
              </div>
              
            </form>
          </div>
        </div>

      </main>
    </div>
  );
}

