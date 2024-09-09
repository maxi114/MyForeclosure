'use client';

import React from 'react';
import FileUploader from '../../components/FileUploader';

export default function FileManagerPage() {
    const handleFileUpload = async (files) => {
        try {
            // Validate files
            const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            const maxSize = 5 * 1024 * 1024; // 5 MB
        
            for (const file of files) {
            if (!validTypes.includes(file.type)) {
                throw new Error(`Invalid file type: ${file.type}. Only JPEG, PNG, and PDF are allowed.`);
            }
            if (file.size > maxSize) {
                throw new Error(`File size exceeds the limit of 5 MB: ${file.name}`);
            }
            }
        
            // Show progress indicator (optional)
            console.log('Uploading files...');
        
            // Upload files
            const uploadedFiles = await Promise.all(
                files.map(async (file) => {
                    const url = await uploadFile(file, 'uploads/'); // Assuming uploadFile is defined
                    return { name: file.name, url };
                })
            );
        
            console.log('Uploaded files:', uploadedFiles);
            // Notify user of success
            alert('Files uploaded successfully!');
        
            // Optionally, update the state or perform additional actions
            // setUploadedFiles(uploadedFiles); // If you have a state to manage uploaded files
        
        } catch (error) {
            console.error('Upload error:', error);
            alert(`Upload failed: ${error.message}`);
        }
    };  

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6" >
            <h1 className="text-lg font-semibold md:text-2xl">File Manager</h1>
            <FileUploader onFileUpload={handleFileUpload} />
        </div>
    );
}