import { Router } from 'express';
import * as userController from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/', userController.authUser);
userRouter.post('/newuser', userController.newUser);

export default userRouter;
