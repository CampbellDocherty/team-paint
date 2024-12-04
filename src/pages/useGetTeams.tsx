import { useState, useEffect } from 'react';
import { FirebaseStorageContent, getFiles } from '../firebase';

export const useGetImages = () => {
  const [teams, setTeams] = useState<
    | {
        [x: string]: FirebaseStorageContent[];
      }[]
    | null
  >(null);

  useEffect(() => {
    const get = async () => {
      const files = await getFiles();
      setTeams(files);
    };

    get();
  }, []);

  return { teams };
};
