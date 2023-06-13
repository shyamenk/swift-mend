'use client';

import React, { ChangeEvent, useState } from 'react';
interface ImageUploadProps {
  onFileUpload: (file: File | undefined) => void;
}
const AvatarUpload: React.FC<ImageUploadProps> = ({ onFileUpload }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
      onFileUpload(file);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div>
        <label
          htmlFor="file"
          className="block text-sm font-medium text-gray-700 mb-4 mt-2"
        >
          Photo
        </label>
      </div>

      <div className="flex justify-start items-center gap-4 mb-4">
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        <label htmlFor="image" className="cursor-pointer">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected"
              className="rounded-full w-16 h-16 object-cover"
            />
          ) : (
            <div className="flex items-center justify-center rounded-full w-16 h-16 bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
          )}
        </label>
        {/* <label
          htmlFor="image"
          className="block text-sm font-medium px-3 py-2 bg-gray-400 rounded text-gray-700 mb-2"
        >
          Change
        </label> */}
      </div>
    </>
  );
};

export default AvatarUpload;
