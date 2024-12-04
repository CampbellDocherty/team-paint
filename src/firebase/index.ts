import { initializeApp } from 'firebase/app';
import {
  getStorage,
  listAll,
  ref,
  getDownloadURL,
  getMetadata,
  uploadBytes,
  uploadString,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC2FGC8poUDlYS7QMDOaTZ4Cx9mDqXCRis',
  authDomain: 'team-paint.firebaseapp.com',
  projectId: 'team-paint',
  storageBucket: 'team-paint.firebasestorage.app',
  messagingSenderId: '166674041451',
  appId: '1:166674041451:web:d4498a144e363602283f2e',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const storage = getStorage();

// Create a reference under which you want to list
const listRef = ref(storage, `uploads/`);

export type FirebaseStorageContent = {
  downloadUrl: string;
};

export const getFiles = async () => {
  const res = await listAll(listRef);
  const promisedFiles = res.items.map(async (item) => {
    const storageRef = ref(storage, item.fullPath);
    const downloadUrl = await getDownloadURL(storageRef);
    const metadata = await getMetadata(storageRef);
    return {
      downloadUrl,
      metadata,
    };
  });
  const files: FirebaseStorageContent[] = await Promise.all(promisedFiles);
  return files;
};

export async function uploadBase64Image(
  base64Image: string,
  teamName: string | null,
  teamId: string | null,
) {
  console.log(teamName, teamId);
  if (!teamName || !teamId) {
    return null;
  }

  const storageRef = ref(storage, `${teamId}/`);

  const metadata = {
    customMetadata: {
      teamName,
    },
  };

  await uploadString(storageRef, base64Image, 'data_url', metadata);

  return true;
}
