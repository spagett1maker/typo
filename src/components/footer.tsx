import Link from "next/link"
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        {/* Top Section with Logo and Quick Links */}
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center -ml-2">
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
              <p className="text-gray-600 max-w-md text-sm">
                typo는 코딩 교육을 위한 플랫폼으로, 창의적인 사고와 <br />문제 해결 능력을 키울 수 있는 코딩 교육 플랫폼을 제공합니다.
              </p>
            </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">서비스</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/projects" className="text-gray-600 hover:text-blue-600">
                    프로젝트
                  </Link>
                </li>
                <li>
                  <Link href="/board" className="text-gray-600 hover:text-blue-600">
                    게시판
                  </Link>
                </li>
                <li>
                  <Link href="/teacher" className="text-gray-600 hover:text-blue-600">
                    학습 자료
                  </Link>
                </li>

              </ul>
            </div>

          

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">법적 정보</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-blue-600">
                    이용약관
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-blue-600">
                    개인정보처리방침
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Company Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-sm text-gray-600">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">회사 정보</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="font-medium mr-2">대표자:</span> 송준하
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>경상북도 김천시 혁신로 303 지텍 2층</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">사업자등록번호:</span> 000-00-00000
                <button className="ml-2 text-blue-600 hover:text-blue-800 inline-flex items-center">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  <span className="text-xs">사업자정보확인</span>
                </button>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">통신판매업 신고번호:</span> 2021-경북김천-00000
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">개인정보관리책임자:</span> 송준하
              </li>
            </ul>
          </div>

          <div className="text-sm text-gray-600">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">고객센터</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="h-4 w-4 text-gray-500 mr-2" />
                <span>010-8269-0413</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 text-gray-500 mr-2" />
                <a href="mailto:jhulbo0413@gmail.com" className="hover:text-blue-600">
                  jhulbo0413@gmail.com
                </a>
              </li>
              
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>© {currentYear} CODENAME. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

