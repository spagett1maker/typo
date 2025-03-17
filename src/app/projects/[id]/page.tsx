"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { getWorkById, getComments, addComment } from "@/utils/firebase/workService"
import { useAuth } from "@/lib/AuthContext"
import { Heart, MessageSquare, Share2, MoreVertical, Users, LockOpen } from "lucide-react"


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
  createdAt: any;
  tags: string[];
  likes: number;
  thumbnail?: string;
  comments?: Comment[];
}

type TabType = "작품 소개" | "사용법" | "참고 사항"

const navigationItems = [
  {
    title: "만들기",
    submenu: [
      { title: "작품", href: "#" },
      { title: "AI", href: "#" },
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
]

export default function ProjectDetailPage() {
  const {user, logout} = useAuth()
  const [isLiked, setIsLiked] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState<Comment[]>([]);

  const [activeTab, setActiveTab] = useState<TabType>("작품 소개")
  const [PROJECT, setPROJECT] = useState<Work | null>(null)
  const [placeholder, setPlaceholder] = useState<string>("댓글을 작성하려면 로그인해 주세요.")

  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    if(user) {
      setPlaceholder("댓글을 작성해주세요.")
    }
    const fetchProject = async () => {
      const project = await getWorkById(params.id as string)
      console.log(project)
      if (!project) {
        router.push("/projects")
        return;
      }
      
      setPROJECT(project)
      
    }
    const fetchComments = async () => {
      const projectComments = await getComments(params.id as string);
      setComments(projectComments);
    };
    fetchProject()
    fetchComments()


  }, [params.id, router])

  // 🔹 댓글 추가 핸들러
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    if (!user) {
      alert("로그인이 필요합니다.");
      return
    }
    const newComment: Comment = {
      id: `c-${Date.now()}`, // 🔹 고유한 ID 생성
      author: {
        id: user.id,
        name: user.name,
      },
      text: commentText,
      createdAt: new Date().toISOString().split("T")[0], // 🔹 YYYY-MM-DD 형식
    };

    await addComment(params.id as string, newComment);
    setComments((prevComments) => [...prevComments, newComment]); // ✅ UI 즉시 업데이트
    setCommentText(""); // 🔹 입력 필드 초기화
    alert("댓글이 등록되었습니다.");
  };


  const handleLike = () => {
    setIsLiked(!isLiked)
  }


  if(!PROJECT) {
    return <div>Loading...</div>
  }

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

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6 mt-[83px] flex flex-col justify-center max-w-[80%]">
          {/* Project Header */}
          <div className="flex items-baseline justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">게임</span>
              <h1 className="text-xl font-bold">{PROJECT.title}</h1>
            </div>
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <span className="text-sm text-gray-500">{PROJECT.createdAt.toLocaleString()}</span>
              <span>-</span>
              <span>{PROJECT.author}</span>
              <button className="ml-2">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Project Preview */}
          <div className=" flex justify-center relative aspect-video bg-gray-100 rounded-lg mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={PROJECT.thumbnail || "/placeholder.png"}
                alt="Project Thumbnail"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                />
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b-[0.5px] border-gray-500 mb-6">
            <div className="flex space-x-6">
              {(["작품 소개", "사용법", "참고 사항"] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  className={`py-2 px-1 -mb-px ${
                    activeTab === tab
                      ? "border-b-2 border-[#3BB7EB] text-[#3BB7EB] font-medium"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="mb-8">
            <div className="prose max-w-none">
              {PROJECT.description.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Engagement */}
          <div className="flex items-center justify-between py-4 border-b-[0.5px] border-t-[0.5px] border-gray-500">
            <div className="flex items-center space-x-6">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 ${isLiked ? "text-red-500" : "text-gray-500"}`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                <span>좋아요 {PROJECT.likes}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500">
                <MessageSquare className="h-5 w-5" />
                <span>댓글 {(PROJECT.comments || []).length}</span>
              </button>
            </div>
            <button className="flex items-center space-x-1 text-gray-500">
              <Share2 className="h-5 w-5" />
              <span>작품 공유</span>
            </button>
          </div>

          {/* Comments */}
          <div className="mt-6">
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <textarea
                placeholder={placeholder}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                  disabled={!commentText.trim()}
                >
                  등록
                </button>
              </div>
            </form>
          </div>
          {/* Comment List */}
          <div className="space-y-6">
            {(comments || []).map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0 bg-blue-50">
                  
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{comment.author.name}</span>
                    <span className="text-xs text-gray-500">{comment.createdAt}</span>
                  </div>
                  <p className="mt-1 text-gray-700">{comment.text}</p>
                  
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
  )
}

