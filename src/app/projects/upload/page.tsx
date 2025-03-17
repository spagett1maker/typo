"use client";
import { useState } from "react";
import { uploadWork } from "@/utils/firebase/workService";
import { useAuth } from "@/lib/AuthContext";

const availableTags = [
  "게임",
  "그림",
  "애니메이션",
  "퀴즈",
  "학습",
  "우주",
  "동물",
  "미로",
  "JavaScript",
  "HTML",
  "CSS",
  "초급",
  "중급",
  "고급",
]

export default function ShareWorkPage() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null); // 🔹 미리보기 추가

  const [error, setError] = useState("");

  if (!user || user.role !== "student") {
    return <p className="text-red-500">학생만 작품을 공유할 수 있습니다.</p>;
  }

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  // 🔹 썸네일 이미지 선택 시 미리보기 설정
  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setThumbnail(file);

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setPreview(reader.result as string); // 🔹 Base64 미리보기 표시
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if(!thumbnail) {
        throw new Error("썸네일 이미지를 선택해주세요.");
      }
      await uploadWork(user.id, title, description, selectedTags, thumbnail);
      setTitle("");
      setDescription("");
      alert("작품이 업로드되었습니다!");
    } catch (err:any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">작품 공유</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input className="border p-2 m-2" type="text" placeholder="작품 제목" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea className="border p-2 m-2" placeholder="작품 설명" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">태그 (최대 5개)</label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTags.includes(tag)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => toggleTag(tag)}
                disabled={selectedTags.length >= 5 && !selectedTags.includes(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <p className="mt-1 text-xs text-gray-500">선택된 태그: {selectedTags.length}/5</p>
        </div>
        <input className="border p-2 m-2" type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files?.[0] || null)} />
        {/* 🔹 미리보기 */}
        {preview && <img src={preview} alt="썸네일 미리보기" className="mt-2 w-40 h-40 object-cover border rounded" />}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">작품 업로드</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
