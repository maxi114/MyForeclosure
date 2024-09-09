'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const FileUploader = ({ onFileUpload }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
  
    const formatBytes = (bytes, decimals = 2) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };
  
    const handleAcceptedFiles = useCallback(async (acceptedFiles) => {
      setUploading(true);
      setError(null);
      try {
        const uploadedFiles = await Promise.all(
          acceptedFiles.map(async (file) => {
            const storageRef = ref(storage, `uploads/${file.name}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            return {
              name: file.name,
              size: file.size,
              type: file.type,
              url: downloadURL,
              preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
              formattedSize: formatBytes(file.size),
            };
          })
        );
        setSelectedFiles((prev) => [...prev, ...uploadedFiles]);
        if (onFileUpload) onFileUpload(uploadedFiles);
      } catch (err) {
        setError('File upload failed. Please try again.');
      } finally {
        setUploading(false);
      }
    }, [onFileUpload]);
  
    const removeFile = useCallback(async (fileToRemove) => {
      try {
        const storageRef = ref(storage, `uploads/${fileToRemove.name}`);
        await deleteObject(storageRef);
        setSelectedFiles((prev) => prev.filter((file) => file.name !== fileToRemove.name));
      } catch (err) {
        setError('Failed to remove file. Please try again.');
      }
    }, []);
  
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: handleAcceptedFiles,
    });
  
    return (
      <div>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        {error && <p className="error">{error}</p>}
        {uploading && <p>Uploading...</p>}
        {selectedFiles.length > 0 && (
          <div className="file-list">
            <h4>Uploaded Files:</h4>
            {selectedFiles.map((file, index) => (
              <div key={index} className="file-item">
                {file.preview ? (
                  <img src={file.preview} alt={file.name} className="file-preview" />
                ) : (
                  <div className="file-icon">{file.type.split('/')[0]}</div>
                )}
                <div className="file-info">
                  <p>{file.name}</p>
                  <p>{file.formattedSize}</p>
                </div>
                <button onClick={() => removeFile(file)} className="remove-button">
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
};

export default FileUploader;