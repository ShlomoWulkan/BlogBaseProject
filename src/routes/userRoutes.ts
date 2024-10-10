import { Router } from "express";
import { 
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser
} from "../controllers/userController";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/", getUsers);
userRouter.get("/:username", getUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
