import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export const uploadAndGetImgUrl = async (
  file: File,
  folderName: string,
  uid?: string,
) => {
  const storage = getStorage();
  const fileName = uid ?? file.name + uuidv4();
  const storageRef = ref(storage, `${folderName}/${fileName}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};
