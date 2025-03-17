"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/AuthContext"
import { Users, SaveIcon, UploadIcon } from "lucide-react"

export default function Workspace () {
  const { user, logout } = useAuth()


  return (
    <>
      <div className="min-h-screen relative">
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

            <nav className=" text-base flex items-center space-x-8">
              <div className="relative flex items-center">
                <button className="cursor-pointer py-1 px-1 hover:text-[#3BB7EB] text-base font-medium hover:border-b-[#3BB7EB] hover:border-b flex items-center gap-1 group">
                  <SaveIcon className="h-4 w-4"/> 저장
                </button>
              </div>

              <div className="relative flex items-center pr-2">
                <button className="cursor-pointer py-1 px-1 hover:text-[#3BB7EB] text-base font-medium hover:border-b-[#3BB7EB] hover:border-b flex items-center gap-1 group">
                  <UploadIcon className="h-4 w-4"/> 불러오기
                </button>
              </div>
              
              {!user ? (
              <Link href="/auth/signin" className="bg-[#3BB7EB] hover:bg-[#5CCFF5] text-white px-4 py-2 rounded-full text-sm font-medium">
                로그인
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={logout}
                  className="bg-[#3BB7EB] hover:bg-[#5CCFF5] text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer flex gap-2 items-center"
                >
                  <Users className="h-4 w-4"/> {user.name} 님 {'('}로그아웃{')'}
                </button>

              </div>
            )}
            </nav>
          </div>
        </header>
      </div>
    </>
  )
}