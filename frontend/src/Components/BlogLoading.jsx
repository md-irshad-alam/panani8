import React from "react";

const BlogLoading = () => {
  return (
    <div className="w-full blog-list grid gap-6 p-4 bg-gray-100 min-h-screen grid-cols-1 sm:grid-cols-3 lg:grid-cols-3">
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="blog-card bg-white shadow-md rounded-xl p-5 animate-pulse"
          >
            <div className="card-header flex items-center justify-between border-b pb-3 mb-4">
              <div className="flex items-center gap-4">
                <div className="avatar w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="title-info">
                  <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-20"></div>
                </div>
              </div>
            </div>
            <div className="card-content">
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="card-footer mt-4 flex items-center gap-4">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
              <div className="h-4 bg-gray-300 rounded w-20"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BlogLoading;
