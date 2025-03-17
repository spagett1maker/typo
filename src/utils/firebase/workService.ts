import { db } from "../firebaseConfig"
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, increment, orderBy, query, arrayUnion } from "firebase/firestore";



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



// 🔹 File을 Base64 문자열로 변환하는 함수
const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string); // 🔹 Base64 데이터 URL 반환
    reader.onerror = (error) => reject(error);
  });
};

// 🔹 작품 업로드 (학생 전용)
export const uploadWork = async (studentId: string, title: string, description: string, tags: string[], thumbnail: File) => {
  try {
    const base64Thumbnail = await convertFileToBase64(thumbnail); // 🔹 썸네일을 Base64로 변환

    await addDoc(collection(db, "works"), {
      studentId,
      title,
      description,
      createdAt: new Date(),
      tags,
      likes: 0, // 좋아요 초기값 0
      thumbnail: base64Thumbnail, // 썸네일 이미지 URL
      comments: [], // 댓글 목록
    });
  } catch (error) {
    console.error("작품 업로드 실패:", error);
    throw new Error("작품 업로드 중 오류가 발생했습니다.");
  }
};

// 🔹 특정 ID의 작품 가져오기
export const getWorkById = async (workId: string): Promise<Work | null> => {
  try {
    const workRef = doc(collection(db, "works"), workId);
    const workSnap = await getDoc(workRef);

    if (!workSnap.exists()) {
      return null;
    }

    const data = workSnap.data();
    return {
      id: workSnap.id,
      author: data.studentId || "작성자 없음",
      title: data.title || "제목 없음",
      description: data.description || "설명 없음",
      createdAt: data.createdAt ? new Date(data.createdAt.seconds * 1000) : new Date(), // 🔹 Timestamp → Date 변환
      tags: data.tags || [],
      likes: data.likes || 0,
      thumbnail: data.thumbnail,
      comments: data.comments || [],
    };
  } catch (error) {
    console.error("작품을 가져오는 중 오류 발생:", error);
    return null;
  }
};

// 🔹 전체 작품 목록 가져오기 (정렬 포함)
export const getAllWorks = async (sortBy: "latest" | "popular") => {
  let q;
  if (sortBy === "latest") {
    q = query(collection(db, "works"), orderBy("createdAt", "desc"));
  } else {
    q = query(collection(db, "works"), orderBy("likes", "desc"));
  }

  const querySnapshot = await getDocs(q);
  //return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      author: data.studentId || "작성자 없음",
      title: data.title || "제목 없음",
      description: data.description || "설명 없음",
      createdAt: data.createdAt || new Date(),
      tags: data.tags || [],
      likes: data.likes || 0,
      thumbnail: data.thumbnail,
      comments: data.comments || [],
    };
  });
};

// 🔹 좋아요 증가
export const likeWork = async (workId: string) => {
  const workRef = doc(db, "works", workId);
  await updateDoc(workRef, {
    likes: increment(1),
  });
};

// 🔹 특정 게시글의 댓글 가져오기
export const getComments = async (workId: string): Promise<Comment[]> => {
  try {
    const workRef = doc(db, "works", workId);
    const workSnap = await getDoc(workRef);

    if (!workSnap.exists()) return [];

    const data = workSnap.data();
    return data.comments || []; // 🔹 댓글이 없으면 빈 배열 반환
  } catch (error) {
    console.error("댓글을 가져오는 중 오류 발생:", error);
    return [];
  }
};

// 🔹 특정 게시글에 댓글 추가하기
export const addComment = async (workId: string, comment: Comment) => {
  try {
    const workRef = doc(db, "works", workId);

    await updateDoc(workRef, {
      comments: arrayUnion(comment), // 🔹 Firestore 배열 필드 업데이트
    });
  } catch (error) {
    console.error("댓글 추가 중 오류 발생:", error);
  }
};