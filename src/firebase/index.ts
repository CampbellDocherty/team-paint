import { initializeApp } from 'firebase/app';
import {
  // eslint-disable-next-line import/named
  FullMetadata,
  getDownloadURL,
  getMetadata,
  getStorage,
  listAll,
  ref,
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

export const app = initializeApp(firebaseConfig);

const storage = getStorage();

const rootDir = 'uploads/';
const listRef = ref(storage, rootDir);

export type FirebaseStorageContent = {
  downloadUrl: string;
  metadata: FullMetadata;
};

export const getFiles = async () => {
  const res = await listAll(listRef);
  const promisedFiles = res.prefixes.map(async (folderRef) => {
    const res = await listAll(folderRef);
    const promisedFiles = res.items.map(async (item) => {
      const storageRef = ref(storage, item.fullPath);
      const downloadUrl = await getDownloadURL(storageRef);
      const metadata = await getMetadata(storageRef);
      return {
        downloadUrl,
        metadata,
      } as FirebaseStorageContent;
    });
    const files: FirebaseStorageContent[] = await Promise.all(promisedFiles);
    return { [folderRef.name]: files };
  });

  const files = await Promise.all(promisedFiles);
  return files;
};

export async function uploadBase64Image(
  base64Image: string,
  imageName: string,
  teamName: string | null,
  teamId: string | null,
) {
  if (!teamName || !teamId) {
    return null;
  }

  const storageRef = ref(storage, `${rootDir}/${teamId}/${imageName}`);

  const metadata = {
    customMetadata: {
      teamName,
    },
  };

  await uploadString(storageRef, base64Image, 'data_url', metadata);

  return true;
}
