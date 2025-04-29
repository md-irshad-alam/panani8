import PostModel from "../../Model/PostMode.js";

// Create a new post
const createPost = async (req, res) => {
  const { title, content, tag } = req.body;
  const userId = req.user.id; // Assuming user ID is extracted from a middleware (e.g., JWT auth)

  try {
    const newPost = new PostModel({
      title,
      content,
      author: userId,
      tags: tag,
      likes: [],
      comments: [],
    });

    const savedPost = await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: savedPost });
  } catch (error) {
    console.error("Error in createPost:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Like a post
const likePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const post = await PostModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.likes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this post" });
    }

    post.likes.push(userId);
    await post.save();

    res.status(200).json({ message: "Post liked successfully", post });
  } catch (error) {
    console.error("Error in likePost:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Posts retrieved successfully", posts });
  } catch (error) {
    console.error("Error in getAllPosts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const post = await PostModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error in deletePost:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a post
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, tag } = req.body;
  const userId = req.user.id;

  try {
    const post = await PostModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this post" });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.tags = tag || post.tags;

    const updatedPost = await post.save();
    res
      .status(200)
      .json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.error("Error in updatePost:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Comment on a post

const commentOnPost = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const userId = req.user.id;

  try {
    const post = await PostModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      user: userId,
      comment,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    // Populate the 'user' field inside the 'comments' array
    const populatedPost = await PostModel.findById(id).populate({
      path: "comments.user", // Populate the 'user' field inside 'comments'
      select: "username email", // Select specific fields from the User model
    });

    res
      .status(200)
      .json({ message: "Comment added successfully", post: populatedPost });
  } catch (error) {
    console.error("Error in commentOnPost:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  getAllPosts,
  createPost,
  likePost,
  deletePost,
  updatePost,
  commentOnPost,
};
