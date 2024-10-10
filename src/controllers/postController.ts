import { Request, Response, NextFunction } from "express";
import Post, { IPost } from "../models/postModel";

// Create a new post
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    res.status(400).json({ message: "Please provide a title, content, and author" });
  }

  try {
    const newPost: IPost = new Post({
      title,
      content,
      author
    });

    await newPost.save();

    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.log(error);
  }
};

// Delete a post
export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }
  await Post.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Post deleted successfully" });

};

// Get all posts
export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {
    const posts = await Post.find().populate("author");
    res.status(200).json({ posts });

  } catch (error) {
  console.log(error);
  }
};

// Get a single post by ID
export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
     const id: string = req.params.id;

    const post = await Post.findById(id);
    res.status(200).json({ post });
  }
  catch (error) {
    console.log(error);
  } 
};


// Update a post
export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }

  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ message: "Please provide a title and content" });
    return;
  }

  await Post.findByIdAndUpdate(req.params.id, { title, content });
  res.status(200).json({ message: "Post updated successfully" });

};


// Add a comment to a post
export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }
  const { comment } = req.body;
  if (!comment) {
    res.status(400).json({ message: "Please provide a comment" });
    return;
  }
  post.comments.push(comment);
  await post.save();
  res.status(200).json({ message: "Comment added successfully" });
};


