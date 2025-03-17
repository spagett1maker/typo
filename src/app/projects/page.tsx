"use client";
import { useEffect, useState } from "react";
import { getAllWorks, likeWork } from "@/utils/firebase/workService";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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

interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
  };
  text: string;
  createdAt: string;
}
interface Work {
  id: string;
  author: string
  title: string;
  description: string;
  createdAt: any; // Firestore Timestamp
  tags: string[];
  likes: number;
  thumbnail?: string;
  comments?: Comment[];
}

export default function WorkBoardPage() {
  const { user } = useAuth();
  const [works, setWorks] = useState<Work[]>([]);
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [likedProjects, setLikedProjects] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchWorks = async () => {
      const worksData = await getAllWorks(sortBy);
      if (!worksData) {
        alert("작품을 불러오는 데 실패했습니다.");
        return;
      }
      setWorks(worksData);
    };
    fetchWorks();
  }, [sortBy]);

  const filteredProjects = works.filter((project) => {
    const matchesFilter = filter === "all" || project.tags.includes(filter)

    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.id.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })


  const handleLike = async (workId: string) => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    await likeWork(workId);
    setWorks(prevWorks =>
      prevWorks.map(work =>
        work.id === workId ? { ...work, likes: work.likes + 1 } : work
      )
    );
    setLikedProjects((prevLiked) => [...prevLiked, workId]);

  };

  return (
    <>
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-0 flex justify-between items-center">
          <div className="flex items-center gap-4">

            {/* Colorful Logo */}
            <Link href="/" className="relative cursor-pointer">
              <Image
                src="/TYPO_logo.svg"
                alt="typo logo"
                width={200}
                height={200}
                className="h-20 w-auto"
              />
            </Link>
          </div>

          <nav className=" text-base flex items-center space-x-12">
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
            {!user ? (
            <Link href="/auth/signin" className="bg-[#3BB7EB] hover:bg-[#7bc9eb] cursor-pointer text-white px-4 py-2 rounded-full text-sm font-medium">
              로그인
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="https://typo.run/compiler"
                className="bg-[#3BB7EB] hover:bg-[#7bc9eb] text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                새 프로젝트 만들기
              </Link>

            </div>
          )}
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#3BB7EB] to-[#73d5ff] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">친구들의 코딩 작품을 구경해보세요!</h1>
            <p className="text-lg mb-8">재미있는 게임, 멋진 애니메이션, 신기한 앱까지! 여러분의 작품도 공유해보세요.</p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="프로젝트 검색하기..."
                className="bg-white w-full px-5 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#3BB7EB] text-white p-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-10 flex justify-end px-10 items-center">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-2 scrollbar-hide">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === "all" ? "bg-[#3BB7EB] text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => setFilter("all")}
            >
              전체 보기
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === "new" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => setFilter("new")}
            >
              신규 작품
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === "게임" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => setFilter("게임")}
            >
              게임
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === "그림" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => setFilter("그림")}
            >
              그림 & 애니메이션
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === "퀴즈" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => setFilter("퀴즈")}
            >
              퀴즈 & 학습
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === "초급" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => setFilter("초급")}
            >
              초급
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === "중급" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => setFilter("중급")}
            >
              중급
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === "고급" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => setFilter("고급")}
            >
              고급
            </button>
          </div>
        </div>
        <div className="flex justify-end py-1 h-[50px]">
          <label htmlFor="sort" className=" text-gray-600">
            
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "latest" | "popular")}
            className="border rounded px-3"
          >
            <option value="latest">최신순</option>
            <option value="popular">좋아요순</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <main className="container mx-auto px-4 py-8">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Project Thumbnail */}
                <div className="relative h-48 cursor-pointer" onClick={() => router.push(`/projects/${project.id}`)}>
                  <Image
                    src={project.thumbnail ? project.thumbnail : "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  
                </div>


                {/* Project Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3
                      className="text-lg font-bold text-gray-900 hover:text-[#3BB7EB] cursor-pointer"
                      onClick={() => router.push(`/projects/${project.id}`)}
                    >
                      {project.title}
                    </h3>
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => {
                        // Show options menu for project author
                        if (project.id === "user1") {
                          // Assuming user1 is the current user
                          alert("프로젝트 수정 메뉴를 여기에 표시합니다.")
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 truncate/ line-clamp-2">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Author */}
                  <div className="flex items-center mb-3">
                    <div className="h-6 w-6 rounded-full overflow-hidden mr-2">
                      <div className="bg-gray-200 h-full w-full"></div>
                    </div>
                    <span className="text-xs text-gray-600">{project.author}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <button
                        className={`flex items-center gap-1 ${likedProjects.includes(project.id) ? "text-red-500" : "hover:text-red-500"}`}
                        onClick={() => handleLike(project.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill={likedProjects.includes(project.id) ? "currentColor" : "none"}
                          stroke="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{likedProjects.includes(project.id) ? project.likes + 1 : project.likes}</span>
                      </button>

                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span>{(project.comments || []).length}</span>
                      </div>
                    </div>

                    <span></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">프로젝트를 찾을 수 없어요</h3>
            <p className="text-gray-500">다른 검색어나 필터를 사용해보세요!</p>
          </div>
        )}
      </main>
    </div>
    <Footer />
    </>
  );
}
