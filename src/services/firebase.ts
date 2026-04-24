import Constants from "expo-constants";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword
} from "firebase/auth";
import {
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { ChildProfile, Progress } from "../types";

const extra = Constants.expoConfig?.extra ?? {};

const firebaseConfig = {
  apiKey: extra.firebaseApiKey,
  authDomain: extra.firebaseAuthDomain,
  projectId: extra.firebaseProjectId,
  storageBucket: extra.firebaseStorageBucket,
  messagingSenderId: extra.firebaseMessagingSenderId,
  appId: extra.firebaseAppId
};

const hasFirebaseConfig = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
const app = hasFirebaseConfig
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;

export async function signInParent(email: string, password: string) {
  if (!auth) return { uid: "mock_parent" };
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function signUpParent(email: string, password: string) {
  if (!auth) return { uid: "mock_parent" };
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function saveChildProfile(parentId: string, child: ChildProfile) {
  if (!db) return;
  await setDoc(doc(collection(db, "child_profiles"), child.id), {
    ...child,
    parentId,
    updatedAt: serverTimestamp()
  });
}

export async function saveProgress(childId: string, progress: Progress) {
  if (!db) return;
  await setDoc(doc(collection(db, "progress"), childId), {
    ...progress,
    updatedAt: serverTimestamp()
  });
}
