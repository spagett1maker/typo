"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/AuthContext"
import { LockOpen, Users } from "lucide-react"
import Footer from "@/components/footer"

const navigationItems = [
  {
    title: "만들기",
    submenu: [
      { title: "작품", href: "https://typo.run/compiler" },
      { title: "AI", href: "https://colab.research.google.com/" },
    ],
  },
  {
    title: "공유하기",
    href: "/projects",
  },
  {
    title: "커뮤니티",
    submenu: [
      { title: "공지사항", href: "/board" },
      { title: "출석체크", href: "/board" },
      { title: "와글와글 아카데미", href: "/board" },
    ],
  },
  {
    title: "선생님 공간",
    href: "/teacher",
  }
]

export default function TeacherPage() {

  const { user, logout } = useAuth()
  const router = useRouter()


  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-white/ backdrop-blur-sm/ border-b-[0.5px] border-gray-500">
        <div className="container mx-auto px-4 flex items-center justify-between h-20">
          <div className="flex items-center gap-4">

            {/* Colorful Logo */}
            <Link href="/" className="relative">
              <Image
                src="/TYPO_logo.svg"
                alt="typo logo"
                width={200}
                height={200}
                className="h-20 w-auto"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="text-black text-base flex items-center space-x-12 ">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative group">
                <Link
                  href={item.href || "#"}
                  className={`cursor-pointer py-1 px-2 hover:text-[#3BB7EB] text-base font-medium group-hover:text-[#3BB7EB] ${item.submenu?.length ? "group-hover:after:content-[''] group-hover:after:absolute group-hover:after:left-0 group-hover:after:right-0 group-hover:after:bottom-0 group-hover:after:h-[1px] group-hover:after:bg-[#3BB7EB]" : ""}`}
                >
                  {item.title}
                </Link>
                {item.submenu && (
                  <ul className="bg-gray-50 absolute mt-4 top-full left-0 w-40 bg-white/ border-[0.3px] border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all ease-in-out">
                    {item.submenu.map((subitem, subindex) => (
                      <div key={subindex}>
                        <Link href={subitem.href} className="text-base text-black block px-4 py-2 hover:text-[#3BB7EB] bg-gray-50 hover:bg-blue-50 rounded-lg">
                          {subitem.title}
                        </Link>
                      </div>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            {user ? (
              <button onClick={logout} className="cursor-pointer font-medium flex items-center gap-1 hover:gap-2 transition-all ease-in-out border-[0.3px] px-4 py-2 rounded-full">
                <LockOpen className="h-5"/> 로그아웃
              </button>
            ) : (
            <Link href="/auth/signin" className="cursor-pointer font-medium flex items-center gap-1 hover:gap-2 transition-all ease-in-out border-[0.3px] px-4 py-2 rounded-full">
              <Users className="h-5"/> 로그인
            </Link>
            )}
          </nav>

        </div>
      </header>

      <div className="relative w-full h-64 bg-gradient-to-r from-[#3BB7EB] to-[#73d5ff] overflow-hidden py-8 mt-[80px]">
        {/* Binary code background */}
        <div className="absolute inset-0 opacity-20">
          <div className="text-white text-xs font-mono leading-loose tracking-wider overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="whitespace-nowrap">
                {Array.from({ length: 500 }).map((_, j) => (
                  <span key={j}>{Math.round(Math.random()) ? "1" : "0"}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <div className="relative w-12 h-12">
              <div className="w-12 h-12 bg-white rounded-md">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-4 h-4 bg-red-500 rounded-full"></div>
                <div className="absolute top-1/2 left-0 w-3 h-4 bg-blue-400 rounded-r-md"></div>
                <div className="absolute top-1/2 right-0 w-3 h-4 bg-yellow-400 rounded-l-md"></div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-red-700"></div>
            </div>

            <h1 className="text-4xl font-bold text-white">선생님 공간</h1>

            <div className="relative w-12 h-12">
              <div className="w-12 h-12 bg-white rounded-md">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-4 h-4 bg-red-500 rounded-full"></div>
                <div className="absolute top-1/2 left-0 w-3 h-4 bg-blue-400 rounded-r-md"></div>
                <div className="absolute top-1/2 right-0 w-3 h-4 bg-yellow-400 rounded-l-md"></div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-red-700"></div>
            </div>
          </div>
        </div>

        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
      d="M0,50 Q360,100 720,50 T1440,50 L1440,100 L0,100 Z"
      fill="white"
    />          </svg>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-16">수업 자료 보러가기</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div
            className="bg-yellow-50 rounded-lg p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => router.push("https://drive.google.com/drive/folders/1gwOhMTs7NxuO4QodwhD4nWe4Hq31CtiQ")}
          >
            <div className="mb-2">Contents 01</div>
            <h2 className="text-xl font-bold mb-2">전체 수업 자료 확인하러 가기!</h2>
            <p className="text-gray-500 mb-6">(이미지 클릭!)</p>

            <div className="relative w-40 h-40">
              <Image
                src="/t1.png"
                alt="Folder with documents"
                width={160}
                height={160}
                className="object-contain"
              />
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="bg-red-50 rounded-lg p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => router.push("https://scratch.mit.edu/users/CODENAME_JL/")}
          >
            <div className="mb-2">Contents 02</div>
            <h2 className="text-xl font-bold mb-2">스크래치 코드 확인하러 가기!</h2>
            <p className="text-gray-500 mb-6">(이미지 클릭!)</p>

            <div className="relative w-40 h-40">
              <Image
                src="/t2.png"
                alt="Laptop with video call"
                width={160}
                height={160}
                className="object-contain"
              />
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="bg-blue-50 rounded-lg p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => router.push("https://acoustic-beechnut-d15.notion.site/_-4f99e1e3bc77414a83189d53b390cb3a")}
          >
            <div className="mb-2">Contents 03</div>
            <h2 className="text-xl font-bold mb-2">학생 프로젝트 페이지</h2>
            <p className="text-gray-500 mb-6">(이미지 클릭!)</p>

            <div className="relative w-40 h-40">
              <Image
                src="/t3.png"
                alt="Rocket launch"
                width={160}
                height={160}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

