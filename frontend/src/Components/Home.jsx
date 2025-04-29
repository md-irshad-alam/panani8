import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../constants/api";
import "../styles/Home.css";
import apiClient from "../utils/config";
import BlogLoading from "./BlogLoading";
const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentingId, setCommentingId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const isLoggedIn = !!sessionStorage.getItem("token");
  const [laoding, setloading] = useState(false);
  const [postId, setDeletePostId] = useState("");
  // Fetch blogs
  const fetchBlogs = () => {
    setloading(true);
    apiClient
      .get(`${api}/post/getAll`)
      .then((response) => {
        setloading(false);
        setBlogs(response.data.posts);
      })
      .catch((error) => {
        setloading(true);
        console.error("Error fetching blogs:", error);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Derived filtered blogs

  // Filter posts by tag
  const filterByTag = (tag) => {
    setSelectedTag(tag);
    if (tag === "all") {
      fetchBlogs(); // Fetch all blogs if "all" is selected
    } else {
      const filteredBlogs = blogs.filter((blog) => blog.tags === tag);
      setBlogs(filteredBlogs); // Update the blogs state with filtered blogs
    }
  };

  // Like post
  const handleLike = (id) => {
    setloading(true);
    apiClient
      .post(`${api}/post/like/${id}`)
      .then((res) => {
        console.log("Liked successfully", res.data);
        setloading(false);
        fetchBlogs(); // Refresh data to reflect new like count
      })
      .catch((error) => {
        setloading(false);
        console.error(
          "Error liking post:",
          error.response?.data || error.message
        );
      });
  };

  // Delete post
  const handleDelete = () => {
    setloading(true);
    apiClient
      .delete(`${api}/post/delete/${postId}`)
      .then(() => {
        fetchBlogs(); // Refresh after deletion
        setShowDeletePopup(false);
        setloading(false);
        setDeletePostId(null);
      })
      .catch((error) => {
        setloading(false);
        console.error("Error deleting post:", error);
        setShowDeletePopup(false);
      });
  };

  // Update post
  const handleUpdate = (id) => {
    const updatedData = { title: editTitle, content: editContent };
    setloading(true);
    apiClient
      .put(`${api}/post/update/${id}`, updatedData)
      .then(() => {
        setloading(false);
        fetchBlogs(); // Refresh after update
        setEditId(null);
      })
      .catch((error) => {
        setloading(false);
        console.log("internal error", error);
      });
  };

  // Add comment
  const handleAddComment = (id) => {
    if (!commentText.trim()) {
      alert("Comment cannot be empty");
      return;
    }

    apiClient
      .post(`${api}/post/comment/${id}`, { comment: commentText })
      .then(() => {
        fetchBlogs(); // Refresh to get new comment
        setCommentText("");
        setCommentingId(null);
      })
      .catch((error) => {
        console.error(
          "Error adding comment:",
          error.response?.data || error.message
        );
      });
  };
  console.log(laoding);
  return (
    <div className="home-container">
      <div className="header">
        <h1>Latest Blog Posts</h1>
      </div>
      <div className="filter-dropdown w-full flex justify-between  items-center gap-x-4 pl-2 pr-2">
        <p>Select Tag: </p>
        <select
          value={selectedTag}
          onChange={(e) => filterByTag(e.target.value)}
          className="p-2 border rounded lg:w-[40%] sm:w-[50%]"
        >
          {[
            "all",
            "technology",
            "health",
            "lifestyle",
            "travel",
            "food",
            "others",
          ].map((tag) => (
            <option key={tag} value={tag}>
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className=" w-full blog-list grid gap-6 p-4 ] bg-gray-100 min-h-screen max-h-[5vh] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((blog) => (
          <div
            key={blog._id.$oid}
            className="blog-card bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition-shadow max-h-[600px] overflow-hidden"
          >
            {/* Header */}
            <div className="card-header flex items-center justify-between border-b pb-3 mb-4">
              <div className="flex items-center gap-4">
                <div className="avatar w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-semibold">
                  {blog?.title[0].toUpperCase()}
                </div>
                <div className="title-info">
                  <h2 className="text-xl font-bold text-gray-800">
                    {blog.title}
                  </h2>
                  <span className="tag text-sm text-gray-500">
                    #{blog.tags}
                  </span>
                </div>
              </div>

              {isLoggedIn && (
                <div className="actions space-x-2">
                  <button
                    onClick={() => {
                      setEditId(blog._id);
                      setEditTitle(blog.title);
                      setEditContent(blog.content);
                    }}
                    title="Edit"
                    className="text-yellow-600 hover:text-yellow-800"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => {
                      setShowDeletePopup(true);
                      setDeletePostId(blog._id);
                    }}
                    title="Delete"
                    className="text-red-600 hover:text-red-800"
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="card-content text-gray-700">
              <p>{blog.content}</p>
              {editId === blog._id && (
                <div className="edit-form mt-4 space-y-2">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Edit title"
                    className="w-full p-2 border rounded"
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="Edit content"
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdate(blog._id)}
                      className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="px-4 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="card-footer mt-2 flex items-center gap-4 text-sm">
              <button
                onClick={() => handleLike(blog._id)}
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                👍 {blog.likes.length} Likes
              </button>
              <span
                onClick={() =>
                  commentingId === blog._id
                    ? setCommentingId(null)
                    : setCommentingId(blog._id)
                }
                className="cursor-pointer text-purple-600 hover:underline"
              >
                💬 {blog?.comments?.length} Comments
              </span>
            </div>

            {/* Comment Box */}
            {isLoggedIn && commentingId === blog._id && (
              <div className="comment-box mt-4">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
                <div className="comment-actions flex gap-2">
                  <button
                    onClick={() => handleAddComment(blog._id)}
                    className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Post
                  </button>
                  <button
                    onClick={() => setCommentingId(null)}
                    className="px-4 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {laoding && (
          <div className="block col-span-full">
            <BlogLoading />
          </div>
        )}
      </div>
      {/* Loading Skeleton */}

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0   bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4 text-center">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeletePopup(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
