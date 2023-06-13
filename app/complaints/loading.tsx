import React from 'react';

const Loading = () => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-blue-900 opacity-40"></div>
        <div className="relative">
          <div className="bg-transparent p-4 rounded ">
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-8 w-8 text-brand-green-900"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12c0-3.042-1.135-5.824-3-7.938l-3 2.647A7.962 7.962 0 0120 12h4c0-6.627-5.373-12-12-12v4c4.418 0 8 3.582 8 8h4z"
                ></path>
              </svg>
            </div>
            <p className="text-center mt-2">Loading...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
