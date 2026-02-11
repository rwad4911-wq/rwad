
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDSxwUpa6qmj-R1sLYosHuWxxaXu-sUb9w",
  authDomain: "rwad-86ebe.firebaseapp.com",
  projectId: "rwad-86ebe",
  storageBucket: "rwad-86ebe.firebasestorage.app",
  messagingSenderId: "939603123272",
  appId: "1:939603123272:web:70e4b17ab20421fee48c7d",
  measurementId: "G-CPEQ0DXMSN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

const SITE_DATA_DOC = "site_content";

/**
 * حفظ جميع بيانات الموقع في مستند واحد في Firestore
 */
export const saveSiteData = async (data: any) => {
  try {
    const docRef = doc(db, "settings", SITE_DATA_DOC);
    await setDoc(docRef, data, { merge: true });
    console.log("Data saved successfully to Firestore");
    return true;
  } catch (error) {
    console.error("Error saving to Firestore:", error);
    throw error;
  }
};

/**
 * جلب البيانات من Firestore
 */
export const fetchSiteData = async () => {
  try {
    const docRef = doc(db, "settings", SITE_DATA_DOC);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error fetching from Firestore:", error);
    return null;
  }
};

/**
 * رفع ملف (صورة) إلى Firebase Storage والحصول على الرابط
 */
export const uploadImage = async (file: File, path: string) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
