import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import validator from "validator";

export const createUser = async (
    req: Request, 
    res: Response
    ): Promise<void> => {
    const { username, email,  profile } = req.body;

    if (!username || !email) {
        res.status(400).json({ message: "Please provide a username" });
        return;
    }

    if (!validator.isEmail(email)) {
        res.status(400).json({ message: "Invalid email format" });
        return;
    }

    const user: IUser = new User({
    username,
    email,
    profile: {
      bio: profile?.bio || "", 
      socialinks : profile?.socialinks  || [] 
    }
  });

    //todo: add social links
    const socialinks  = user.profile.socialinks ;
    user.profile.socialinks  = socialinks ;

    try {
        await user.save();
    } catch (error) {
        console.log(error);
    }

    res.status(201).json({ message: "User created successfully" });
};

export const getUsers = async (
    req: Request,
     res: Response
    ): Promise<void> => {
    const users = await User.find();
    res.status(200).json({ users });
};
   

export const getUser = async (
    req: Request,
    res: Response
    ) => {
    const { username } = req.params;    
    const user = await User.findOne({ username });
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    res.status(200).json({ user });
    };

export const updateUser = async (
    req: Request,
    res: Response
    ) => {
    const { username } = req.params;
    const { profile } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

};

export const deleteUser = async (
    req: Request, 
    res: Response
    ): Promise<void> => {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    await User.deleteOne({ username });

    res.status(200).json({ message: "User deleted successfully" });
};

// Optionally, add DELETE and EDIT functions
