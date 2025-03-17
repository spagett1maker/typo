"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/AuthContext"
import { Bell, Calendar, MessageSquare, CheckCircle, Pin, Star, Heart, LockOpen, Users } from "lucide-react"
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

export default function NoticeBoardPage() {
  const [activeTab, setActiveTab] = useState<"notice" | "attendance" | "bulletin">("notice")
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-[#3BB7EB]/10">
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

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#3BB7EB] to-[#73d5ff] text-white py-8 mt-[80px]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-2">게시판</h1>
            <p className="text-lg opacity-90">공지사항, 출석체크, 자유게시판을 확인하세요.</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex">
            <button
              className={`px-6 py-4 font-medium flex items-center ${
                activeTab === "notice"
                  ? "text-[#3BB7EB] border-b-2 border-[#3BB7EB]"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("notice")}
            >
              <Bell className="w-4 h-4 mr-2" />
              새싹마당
            </button>
            <button
              className={`px-6 py-4 font-medium flex items-center ${
                activeTab === "attendance"
                  ? "text-[#3BB7EB] border-b-2 border-[#3BB7EB]"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("attendance")}
            >
              <Calendar className="w-4 h-4 mr-2" />
              출석체크
            </button>
            <button
              className={`px-6 py-4 font-medium flex items-center ${
                activeTab === "bulletin"
                  ? "text-[#3BB7EB] border-b-2 border-[#3BB7EB]"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("bulletin")}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              와글와글 아카데미
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "notice" && <NoticeTabContent />}
        {activeTab === "attendance" && <AttendanceTabContent />}
        {activeTab === "bulletin" && <BulletinTabContent />}
      </main>
      <Footer />
    </div>
  )
}

function NoticeTabContent() {
  // Mock data for notices
  const pinnedNotices = [
    {
      id: "1",
      title: "한아이트 봄방학 특강 안내",
      author: "관리자",
      date: "2025-03-10",
      views: 342,
      isPinned: true,
    },
    {
      id: "2",
      title: "3월 프로그래밍 대회 참가자 모집",
      author: "관리자",
      date: "2025-03-08",
      views: 287,
      isPinned: true,
    },
  ]

  const regularNotices = [
    {
      id: "3",
      title: "코딩 캠프 후기 이벤트 당첨자 발표",
      author: "이벤트팀",
      date: "2025-03-05",
      views: 213,
    },
    {
      id: "4",
      title: "1분기 우수 회원 발표 및 혜택 안내",
      author: "관리자",
      date: "2025-03-03",
      views: 189,
    },
    {
      id: "5",
      title: "서비스 점검 안내 (3/15 오전 2시-6시)",
      author: "기술팀",
      date: "2025-03-01",
      views: 156,
    },
    {
      id: "6",
      title: "새로운 코딩 과정 추가 안내",
      author: "교육팀",
      date: "2025-02-28",
      views: 201,
    },
    {
      id: "7",
      title: "2월 우수 프로젝트 선정 결과",
      author: "심사위원단",
      date: "2025-02-25",
      views: 178,
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">공지사항</h2>
        <div className="flex gap-2">
          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
            <option>전체</option>
            <option>제목</option>
            <option>내용</option>
            <option>작성자</option>
          </select>
          <input type="text" placeholder="검색어 입력" className="border border-gray-300 rounded px-3 py-1 text-sm" />
          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">검색</button>
        </div>
      </div>

      {/* Notice List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                번호
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                작성자
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                작성일
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                조회
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Pinned Notices */}
            {pinnedNotices.map((notice) => (
              <tr key={notice.id} className="bg-blue-50 hover:bg-blue-100 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-600 text-white">
                    공지
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Pin size={16} className="text-red-500 mr-2" />
                    <span className="font-medium">{notice.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notice.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notice.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notice.views}</td>
              </tr>
            ))}

            {/* Regular Notices */}
            {regularNotices.map((notice, index) => (
              <tr key={notice.id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {pinnedNotices.length + index + 1}
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium">{notice.title}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notice.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notice.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{notice.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <nav className="inline-flex rounded-md shadow">
          <a
            href="#"
            className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            이전
          </a>
          <a
            href="#"
            className="px-3 py-2 border-t border-b border-gray-300 bg-blue-600 text-sm font-medium text-white"
          >
            1
          </a>
          <a
            href="#"
            className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            2
          </a>
          <a
            href="#"
            className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            3
          </a>
          <a
            href="#"
            className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            다음
          </a>
        </nav>
      </div>
    </div>
  )
}

function AttendanceTabContent() {
  // Current month days for attendance calendar
  const getCurrentMonthDays = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()

    const days = []
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }

  const days = getCurrentMonthDays()

  // Mock data for attended days
  const attendedDays = [1, 2, 3, 5, 8, 9, 10, 11, 12]
  const currentDay = new Date().getDate()

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold">출석체크</h2>
        <p className="text-gray-600 mt-1">매일 출석체크를 하면 포인트를 받을 수 있어요!</p>
      </div>

      {/* Attendance Stats Card */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">3월 출석 현황</h3>
          <span className="text-blue-600 font-bold">{attendedDays.length}일 출석</span>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-4">
          <div className="text-sm font-medium text-red-500">일</div>
          <div className="text-sm font-medium">월</div>
          <div className="text-sm font-medium">화</div>
          <div className="text-sm font-medium">수</div>
          <div className="text-sm font-medium">목</div>
          <div className="text-sm font-medium">금</div>
          <div className="text-sm font-medium text-blue-500">토</div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            if (!day) return <div key={index} className="aspect-square"></div>; // 빈 값 처리
            return (
            <div
              key={index}
              className={`aspect-square flex flex-col items-center justify-center rounded-lg border text-sm
                ${!day ? "border-transparent" : "border-gray-200"}
                ${day === currentDay ? "border-blue-500 bg-blue-50" : ""}
                ${attendedDays.includes(day) ? "bg-green-50" : ""}
              `}
            >
              {day && (
                <>
                  <span className={day === currentDay ? "font-bold text-blue-600" : ""}>{day}</span>
                  {attendedDays.includes(day) && <CheckCircle size={16} className="text-green-500 mt-1" />}
                </>
              )}
            </div>
            )
          })}
        </div>
      </div>

      {/* Today's Attendance */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col items-center py-4">
          <h3 className="text-lg font-medium mb-4">오늘의 출석체크</h3>

          {attendedDays.includes(currentDay) ? (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <p className="text-green-600 font-medium mb-1">오늘 출석체크 완료!</p>
              <p className="text-gray-500 text-sm">내일도 잊지 말고 출석체크 하세요</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={40} className="text-blue-500" />
              </div>
              <p className="text-blue-600 font-medium mb-3">아직 출석체크를 하지 않았어요</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">출석체크 하기</button>
            </div>
          )}
        </div>

        {/* Attendance History */}
        <div className="mt-8 pt-6 border-t">
          <h4 className="font-medium mb-3">최근 출석 기록</h4>
          <div className="space-y-2">
            {attendedDays
              .slice(-5)
              .reverse()
              .map((day) => (
                <div key={day} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    <span>2025년 3월 {day}일</span>
                  </div>
                  <span className="text-sm text-gray-500">+10 포인트</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function BulletinTabContent() {
  // Mock data for bulletin board posts
  const posts = [
    {
      id: "1",
      title: "모두들 어떤 프로젝트 만들고 계세요?",
      author: "코딩마스터",
      date: "2025-03-11",
      comments: 15,
      views: 134,
      likes: 23,
    },
    {
      id: "2",
      title: "3월 코딩대회 같이 참가할 친구 구해요!",
      author: "팀워크짱",
      date: "2025-03-10",
      comments: 8,
      views: 92,
      likes: 17,
    },
    {
      id: "3",
      title: "제가 만든 첫 게임을 소개합니다!",
      author: "게임개발자",
      date: "2025-03-09",
      comments: 21,
      views: 210,
      likes: 42,
      isHot: true,
    },
    {
      id: "4",
      title: "자바스크립트 배우기 어려운가요?",
      author: "초보코더",
      date: "2025-03-08",
      comments: 27,
      views: 183,
      likes: 19,
    },
    {
      id: "5",
      title: "내 프로젝트가 안 돌아가요 ㅠㅠ 도와주세요",
      author: "버그헌터",
      date: "2025-03-07",
      comments: 13,
      views: 87,
      likes: 5,
    },
    {
      id: "6",
      title: "퀴즈 프로그램 만들었어요! 피드백 부탁드려요",
      author: "퀴즈마스터",
      date: "2025-03-06",
      comments: 9,
      views: 73,
      likes: 12,
    },
    {
      id: "7",
      title: "한아이트 3개월 사용 후기",
      author: "성장중",
      date: "2025-03-05",
      comments: 18,
      views: 232,
      likes: 38,
      isHot: true,
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">자유게시판</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">글쓰기</button>
      </div>

      {/* Category Tabs */}
      <div className="flex border-b mb-6">
        <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium">전체</button>
        <button className="px-4 py-2 text-gray-600 hover:text-gray-800">질문</button>
        <button className="px-4 py-2 text-gray-600 hover:text-gray-800">프로젝트</button>
        <button className="px-4 py-2 text-gray-600 hover:text-gray-800">후기</button>
        <button className="px-4 py-2 text-gray-600 hover:text-gray-800">모집</button>
        <button className="px-4 py-2 text-gray-600 hover:text-gray-800">잡담</button>
      </div>

      {/* Bulletin List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                번호
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                작성자
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                작성일
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                조회
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post, index) => (
              <tr key={post.id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="font-medium">{post.title}</span>
                    <span className="ml-2 text-gray-500">[{post.comments}]</span>
                    {post.isHot && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        인기
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popular Posts */}
      <div className="mt-8">
        <h3 className="font-medium text-lg mb-4 flex items-center">
          <Star className="w-5 h-5 text-yellow-500 mr-2" />
          인기 게시글
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts
            .filter((post) => post.likes > 20)
            .map((post) => (
              <div key={post.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer">
                <h4 className="font-medium mb-2">{post.title}</h4>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{post.author}</span>
                  <div className="flex items-center">
                    <span className="flex items-center mr-3">
                      <MessageSquare size={14} className="mr-1" />
                      {post.comments}
                    </span>
                    <span className="flex items-center">
                      <Heart size={14} className="mr-1" />
                      {post.likes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <nav className="inline-flex rounded-md shadow">
          <a
            href="#"
            className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            이전
          </a>
          <a
            href="#"
            className="px-3 py-2 border-t border-b border-gray-300 bg-blue-600 text-sm font-medium text-white"
          >
            1
          </a>
          <a
            href="#"
            className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            2
          </a>
          <a
            href="#"
            className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            3
          </a>
          <a
            href="#"
            className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            다음
          </a>
        </nav>
      </div>
    </div>
  )
}

