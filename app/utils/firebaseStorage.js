import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';

/**
 * Uploads a file to Firebase Storage
 * @param {File} file - The file to upload
 * @param {string} path - The path in storage to upload to (e.g., 'uploads/')
 * @returns {Promise<string>} - The download URL of the uploaded file
 */
export const uploadFile = async (file, path) => {
  const storageRef = ref(storage, `${path}${file.name}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

/**
 * Downloads a file from Firebase Storage
 * @param {string} url - The download URL of the file
 * @returns {Promise<Blob>} - The file as a Blob
 */
export const downloadFile = async (url) => {
  const response = await fetch(url);
  return response.blob();
};

/**
 * Deletes a file from Firebase Storage
 * @param {string} path - The full path of the file in storage
 * @returns {Promise<void>}
 */
export const deleteFile = async (path) => {
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
};

/**
 * Lists all files in a specific path in Firebase Storage
 * @param {string} path - The path to list files from
 * @returns {Promise<Array>} - An array of file metadata objects
 */
export const listFiles = async (path) => {
  const storageRef = ref(storage, path);
  const result = await listAll(storageRef);
  
  const files = await Promise.all(result.items.map(async (itemRef) => {
    const url = await getDownloadURL(itemRef);
    return {
      name: itemRef.name,
      fullPath: itemRef.fullPath,
      url: url
    };
  }));

  return files;
};