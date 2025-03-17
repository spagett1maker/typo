import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlrqHN3qukAJg_bTABgqIUByOfKTOir-w",
  authDomain: "typo-85615.firebaseapp.com",
  projectId: "typo-85615",
  storageBucket: "typo-85615.firebasestorage.app",
  messagingSenderId: "903678183523",
  appId: "1:903678183523:web:90ff9927f1479010331056",
  measurementId: "G-JPFDQF0MHF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);



// 회원가입 (학생/선생님 구분)
export const signUp = async (id: string, password: string, name: string, role: "student" | "teacher", schoolOrPhone: string) => {
  const userRef = doc(db, "users", id); // ID를 Firestore의 문서 ID로 사용
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    throw new Error("이미 존재하는 ID입니다.");
  }

  try {
    await setDoc(userRef, {
      id,
      password, // 실제 서비스에서는 비밀번호를 해싱해야 함
      name,
      role,
      schoolOrPhone,
    });
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw new Error("회원가입 중 오류가 발생했습니다.");
  }
};

// 로그인
export const logIn = async (id: string, password: string) => {
  const userRef = doc(db, "users", id);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    throw new Error("존재하지 않는 ID입니다.");
  }

  const userData = userDoc.data();

  if (userData.password !== password) {
    throw new Error("비밀번호가 틀렸습니다.");
  }

  return userData; // 로그인 성공 시 사용자 정보 반환
};


// 학생 회원가입
export const signUpStudent = async (id: string, password: string, name: string, school: string) => {
  console.log("signUpStudent", id, password, name, school);
  const email = `${id}@custom.com`; // Firebase Auth에는 이메일 필요
  console.log("email", email);
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  console.log("user", user);

  if (!user) throw new Error("회원가입 실패: 사용자 정보가 없습니다.");

  try {
    await setDoc(doc(db, "users", user.uid), {
      id,
      name,
      school,
      role: "student",
    });
  } catch (error) {
    console.error("Firestore 저장 실패:", error);
    throw new Error("Firestore 저장 실패");
  }
};

// 선생님 회원가입
export const signUpTeacher = async (id: string, password: string, name: string, phone: string) => {
  const email = `${id}@custom.com`;
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  if (!user) throw new Error("회원가입 실패: 사용자 정보가 없습니다.");

  try {
    await setDoc(doc(db, "users", user.uid), {
      id,
      name,
      phone,
      role: "teacher",
    });
  } catch (error) {
    console.error("Firestore 저장 실패:", error);
    throw new Error("Firestore 저장 실패");
  }
};

export const logIn2 = async (id: string, password: string) => {
  const email = `${id}@custom.com`;
  return signInWithEmailAndPassword(auth, email, password);
};
