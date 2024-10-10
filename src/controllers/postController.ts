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

};


// Add a comment to a post
export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};


