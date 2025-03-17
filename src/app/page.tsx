"use client";

import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Eye, Heart, MessageSquare, Users, LockOpen } from "lucide-react"
import { useRef } from "react"
import { useAuth } from "@/lib/AuthContext";
import Footer from "@/components/footer";


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

export default function Home() {
  const { user, logout } = useAuth();
  const targetRef = useRef<HTMLDivElement>(null);

  const scrollToTarget = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div className="relative min-h-screen">
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-50 bg-white/ backdrop-blur-sm/ /border-b-[0.1px] border-white/20">
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
            <nav className="text-white text-base flex items-center space-x-12">
              {navigationItems.map((item, index) => (
                <div key={index} className="relative group">
                  <Link
                    href={item.href || "#"}
                    className={`cursor-pointer py-1 px-2 text-white hover:text-[#3BB7EB] text-base font-medium group-hover:text-[#3BB7EB] ${item.submenu?.length ? "group-hover:after:content-[''] group-hover:after:absolute group-hover:after:left-0 group-hover:after:right-0 group-hover:after:bottom-0 group-hover:after:h-[1px] group-hover:after:bg-[#3BB7EB]" : ""}`}
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

        {/* Hero Section */}
        <section className="relative pt-20 min-h-[880px] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/main.png"
              alt="Children learning"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-black/40 z-10"></div>

          <div className="container mx-auto px-4 relative z-20">
            <div className="max-w-xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                무엇이든 만들 수 있어요!
              </h1>
              <p className="mt-6 text-sm md:text-base leading-relaxed">
                수업으로 사고력이 확대됩니다.
                <br />
                교실에서 눈에 띄는 아이로 성장합니다.
              </p>

              <div className="mt-8">
                <Link href="https://typo.run/compiler" className="bg-[#3BB7EB] hover:bg-[#3bb6ebcf] cursor-pointer text-white px-6 py-3 rounded-full">Go to Create</Link>
              </div>
            </div>
          </div>

          {/* Down Arrow */}
          <div onClick={scrollToTarget} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer">
            <div className="w-12 h-12 bg-[#3BB7EB] hover:bg-[#3bb6ebcf] rounded-full flex items-center justify-center animate-bounce">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </section>

{/*
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-5 gap-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <Image src="/placeholder.svg?height=32&width=32" alt="공부수업" width={32} height={32} />
                </div>
                <span className="text-sm text-center">공부수업</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <Image src="/placeholder.svg?height=32&width=32" alt="ToMA" width={32} height={32} />
                </div>
                <span className="text-sm text-center">ToMA</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <Image src="/placeholder.svg?height=32&width=32" alt="성취활동" width={32} height={32} />
                </div>
                <span className="text-sm text-center">성취활동</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
                  <Image src="/placeholder.svg?height=32&width=32" alt="창의공간" width={32} height={32} />
                </div>
                <span className="text-sm text-center">창의공간</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-3">
                  <Image src="/placeholder.svg?height=32&width=32" alt="가정연계" width={32} height={32} />
                </div>
                <span className="text-sm text-center">가정연계</span>
              </div>
            </div>
          </div>
        </section>
              **/}
        
        <section className="py-12 bg-gray-100" ref={targetRef}>
          <div>
            <h2 className="text-2xl font-bold text-center">우리 아이들이 만드는 세계</h2>
            <p className="text-center text-gray-600 mt-1">typo는 아이들이 즐겁게 코딩을 배울 수 있도록 도와줍니다.</p>
          </div>

        </section>

        <div className="min-h-screen bg-white">
          {/* Popular Works Section */}
          <section className="py-12 container mx-auto px-12">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">인기 작품</h2>
                <p className="text-gray-600 mt-1">이 작품들이 최근 주목 받고 있어요!</p>
              </div>
              <Link href="/projects" className="px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50">
                더 보기
              </Link>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1 - LIGHT */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="relative">
                  <div className="absolute top-2 left-2 z-10 bg-blue-600 text-white text-xs px-2 py-0.5 rounded flex items-center">
                    <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                    <span>NEW!</span>
                  </div>

                  <div className="absolute bottom-2 right-2 z-10">
                    <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded-md">입장</button>
                  </div>
                  <Image
                    src="/i1.png"
                    alt="i1"
                    width={300}
                    height={150}
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold">로봇이 아닙니다</h3>
                  <div className="flex items-center mt-1">
                    <div className="w-6 h-6 rounded-full bg-gray-300 mr-2"></div>
                    <span className="text-sm text-gray-600">DASH_stone</span>
                  </div>
                  <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      <span>737</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      <span>66</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      <span>36</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Chess It */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="relative">
                  <div className="absolute bottom-2 left-2 z-10 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                    기타
                  </div>
                  <div className="absolute bottom-2 right-2 z-10">
                    <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded-md hover:bg-blue-600">입장</button>
                  </div>
                  <Image
                    src="/i2.png"
                    alt="i2"
                    width={300}
                    height={150}
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold">미니 탱크 포트리스</h3>
                  <div className="flex items-center mt-1">
                    <div className="w-6 h-6 rounded-full bg-yellow-300 mr-2"></div>
                    <span className="text-sm text-gray-600">스파게티메이커</span>
                  </div>
                  <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      <span>8.6K</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      <span>148</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      <span>76</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Python in entry */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="relative">
                  <div className="absolute bottom-2 left-2 z-10 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                    기타
                  </div>
                  <div className="absolute bottom-2 right-2 z-10">
                    <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded-md hover:bg-blue-600">입장</button>
                  </div>
                  <Image
                    src="/i3.png"
                    alt="i3"
                    width={300}
                    height={150}
                    className="w-full h-40 object-cover bg-blue-100"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold">인생 첫 타이포</h3>
                  <div className="flex items-center mt-1">
                    <div className="w-6 h-6 rounded-full bg-orange-300 mr-2"></div>
                    <span className="text-sm text-gray-600">DirectX</span>
                  </div>
                  <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      <span>1.4K</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      <span>111</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      <span>84</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4 - Korean Title */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="relative">
                  <div className="absolute bottom-2 left-2 z-10 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                    예술
                  </div>
                  <div className="absolute bottom-2 right-2 z-10">
                    <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded-md hover:bg-blue-600">입장</button>
                  </div>
                  <Image
                    src="/i4.png"
                    alt="i4"
                    width={300}
                    height={150}
                    className="w-full h-40 object-cover bg-black"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold">Q is Queen</h3>
                  <div className="flex items-center mt-1">
                    <div className="w-6 h-6 rounded-full bg-green-300 mr-2"></div>
                    <span className="text-sm text-gray-600">최강팀</span>
                  </div>
                  <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      <span>608</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      <span>67</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      <span>50</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Explore Section */}
          <section className="py-12 bg-blue-400/ bg-[#3BB7EB]">
            <div className="container mx-auto px-12">
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h2 className="text-2xl font-bold text-white">탐험하기</h2>
                  <p className="text-white/80 mt-1">블록 코딩으로 만드는 우리들의 세계</p>
                </div>
              </div>

              {/* Game Cards */}
              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Game Card 1 */}
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="relative">
                      <Image
                        src="/i5.png"
                        alt="50u1World"
                        width={300}
                        height={150}
                        className="w-full h-40 object-cover"
                      />
                      
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">뽀로로의 숨겨진 비밀</h3>
                      <div className="flex items-center mt-2">
                        <span className="text-sm text-gray-600">50u1</span>
                      </div>
                    </div>
                  </div>

                  {/* Game Card 2 */}
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="relative">
                      <Image
                        src="/i6.png"
                        alt="무궁화 꽃이 피었습니다[BETA]"
                        width={300}
                        height={150}
                        className="w-full h-40 object-cover"
                      />
                      
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">우주전쟁 3.1</h3>
                      <div className="flex items-center mt-2">
                        <span className="text-sm text-gray-600">〈SOUTH〉</span>
                      </div>
                    </div>
                  </div>

                  {/* Game Card 3 */}
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="relative">
                      <Image
                        src="/i7.png"
                        alt="모아모아 모아잡아 월드"
                        width={300}
                        height={150}
                        className="w-full h-40 object-cover"
                      />
                      
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">해리포터와 불사조 기사단 8인</h3>
                      <div className="flex items-center mt-2">
                        <span className="text-sm text-gray-600">MoaGom</span>
                      </div>
                    </div>
                  </div>

                  {/* Game Card 4 */}
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="relative">
                      <Image
                        src="/i8.png"
                        alt="좀비한국구역"
                        width={300}
                        height={150}
                        className="w-full h-40 object-cover"
                      />

                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">2025</h3>
                      <div className="flex items-center mt-2">
                        <span className="text-sm text-gray-600">팀하이</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* More Button */}
              <div className="flex justify-center mt-16">
                <Link href="/projects" className="px-5 py-3 rounded-full bg-black/80 text-white hover:bg-black flex items-center">
                  인기 월드 더 보기
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </section>

          {/* Pixel Art Footer */}
          <div className="relative h-48 bg-gradient-to-b from-blue-400/ to-blue-500/ from-[#3BB7EB] to-[#3bb6eb4a] overflow-hidden">
            {/* Animated Clouds */}
            <div className="absolute top-4 left-1/4 w-16 h-8 bg-white rounded-full opacity-80 animate-pulse"></div>
            <div
              className="absolute top-8 left-2/3 w-20 h-10 bg-white rounded-full opacity-80 animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className="absolute top-2 left-1/2 w-12 h-6 bg-white rounded-full opacity-80 animate-pulse"
              style={{ animationDelay: "0.8s" }}
            ></div>

            {/* Sun with code symbol */}
            <div className="absolute top-6 right-12 w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center animate-pulse">
              <div className="text-yellow-600 font-bold text-xl">{"{}"}</div>
            </div>

            {/* Ground with pixel pattern */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-yellow-700 to-yellow-800">
              <div className="absolute top-0 left-0 right-0 h-2 w-full flex">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="h-2 w-[2.5%] bg-yellow-600"></div>
                ))}
              </div>
            </div>

            {/* Grass with pixel pattern */}
            <div className="absolute bottom-12 left-0 right-0 h-4 flex">
              {Array.from({ length: 80 }).map((_, i) => (
                <div key={i} className="h-4 w-[1.25%] bg-green-600"></div>
              ))}
            </div>

            {/* Pixel Art Elements */}
            <div className="container mx-auto relative h-full">
              {/* Pixel Trees */}
              <div className="absolute bottom-16 left-[10%]">
                <div className="w-20 h-4 bg-green-700 mx-auto"></div>
                <div className="w-24 h-4 bg-green-700 mx-auto -mt-2"></div>
                <div className="w-28 h-4 bg-green-700 mx-auto -mt-2"></div>
                <div className="w-32 h-4 bg-green-700 mx-auto -mt-2"></div>
                <div className="w-6 h-8 bg-brown-600 mx-auto"></div>
              </div>

              <div className="absolute bottom-16 right-[15%]">
                <div className="w-20 h-4 bg-green-700 mx-auto"></div>
                <div className="w-24 h-4 bg-green-700 mx-auto -mt-2"></div>
                <div className="w-28 h-4 bg-green-700 mx-auto -mt-2"></div>
                <div className="w-32 h-4 bg-green-700 mx-auto -mt-2"></div>
                <div className="w-6 h-8 bg-brown-600 mx-auto"></div>
              </div>

              <div className="absolute bottom-16 left-[60%]">
                <div className="w-20 h-4 bg-green-700 mx-auto"></div>
                <div className="w-24 h-4 bg-green-700 mx-auto -mt-2"></div>
                <div className="w-28 h-4 bg-green-700 mx-auto -mt-2"></div>
                <div className="w-32 h-4 bg-green-700 mx-auto -mt-2"></div>
                <div className="w-6 h-8 bg-brown-600 mx-auto"></div>
              </div>

              {/* Robot Character */}
              <div className="absolute bottom-16 left-[30%]">
                <div className="w-12 h-10 bg-gray-300 rounded-t-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
                <div className="w-16 h-8 bg-gray-400 -mt-1"></div>
                <div className="flex justify-center -mt-1">
                  <div className="w-3 h-6 bg-gray-600 mr-4"></div>
                  <div className="w-3 h-6 bg-gray-600"></div>
                </div>
              </div>

              {/* Kid Programmer */}
              <div className="absolute bottom-16 right-[30%]">
                <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-black rounded-full absolute left-2 top-3"></div>
                  <div className="w-1 h-1 bg-black rounded-full absolute right-2 top-3"></div>
                  <div className="w-3 h-1 bg-red-500 rounded-full absolute bottom-2"></div>
                </div>
                <div className="w-12 h-10 bg-blue-500 -mt-1 flex items-center justify-center">
                  <div className="w-6 h-6 bg-white flex items-center justify-center">
                    <span className="text-[8px] text-black font-bold">{"</>"}</span>
                  </div>
                </div>
                <div className="flex justify-center -mt-1">
                  <div className="w-2 h-6 bg-purple-500 mr-4"></div>
                  <div className="w-2 h-6 bg-purple-500"></div>
                </div>
              </div>

              {/* Floating Code Blocks */}
              <div className="absolute bottom-32 left-[20%] animate-bounce" style={{ animationDuration: "3s" }}>
                <div className="w-10 h-10 bg-white/80 rounded flex items-center justify-center">
                  <span className="text-[10px] text-blue-600 font-mono">{"if()"}</span>
                </div>
              </div>

              <div
                className="absolute bottom-28 right-[40%] animate-bounce"
                style={{ animationDuration: "4s", animationDelay: "1s" }}
              >
                <div className="w-12 h-10 bg-white/80 rounded flex items-center justify-center">
                  <span className="text-[10px] text-green-600 font-mono">{"for{}"}</span>
                </div>
              </div>

              {/* Pixel Art Animals */}
              <div className="absolute bottom-16 left-[45%]">
                <div className="w-10 h-6 bg-white rounded-t-lg"></div>
                <div className="w-8 h-2 bg-pink-200 mx-auto -mt-1 rounded-b-lg"></div>
                <div className="flex justify-center mt-1">
                  <div className="w-2 h-3 bg-white mr-2"></div>
                  <div className="w-2 h-3 bg-white"></div>
                </div>
              </div>

              {/* Flying Bird with Code */}
              <div className="absolute top-16 left-[35%] animate-pulse">
                <div className="flex">
                  <div className="w-4 h-1 bg-blue-700"></div>
                  <div className="w-6 h-4 bg-blue-700 flex items-center justify-center">
                    <span className="text-[6px] text-white">01</span>
                  </div>
                  <div className="w-4 h-1 bg-blue-700"></div>
                </div>
              </div>

              {/* Animated Pixel Blocks */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-4 h-4 bg-purple-500 animate-bounce"
                  style={{
                    bottom: `${20 + i * 10}px`,
                    left: `${10 + i * 15}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${1 + i * 0.5}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}

