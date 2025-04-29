import React, { useState } from "react";
import axios from "axios";
import { api } from "../constants/api";
import "../styles/Blogs.css";
import apiClient from "../utils/config";

const tabs = [
  { key: "title", label: "📝 Title" },
  { key: "content", label: "✍️ Content" },
  { key: "tags", label: "🏷️ Tag" },
];

const Blogs = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tag: "",
  });
  const [activeTab, setActiveTab] = useState("title");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.tag) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await apiClient.post(`${api}/create/post`, formData);
      console.log(formData);
      setMessage(response.data.message);
      setFormData({ title: "", content: "", tags: "" });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="absolute top-[9%] sm:top-[30%] md:top-[30%] lg:top-[10%] left-0 right-0  min-h-screen flex items-center justify-center gap-x-4  ">
      <div className="shadow-lg rounded-lg p-4 w-full max-w-3xl flex  flex-col  ">
        <h2 className="blogInnerContainer text-2xl font-bold text-gray-800 mb-6 text-center">
          Create a Blog Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 p-4">
          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold mb-2"
            >
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter your blog title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Content Input */}
          <div>
            <label
              htmlFor="content"
              className="block text-gray-700 font-semibold mb-2"
            >
              Blog Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog content here..."
              rows="6"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Tag Input */}
          <div>
            <label
              htmlFor="tag"
              className="block text-gray-700 font-semibold mb-2"
            >
              Blog Tag
            </label>
            <select
              id="tag"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a tag</option>
              <option value="technology">Technology</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="health">Health</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Publish Blog
          </button>

          {/* Feedback Messages */}
          {message && (
            <p className="text-green-600 font-semibold text-center ">
              {message}
            </p>
          )}
          {error && (
            <p className="text-red-600 font-semibold text-center">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Blogs;
