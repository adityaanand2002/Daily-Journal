import express from 'express';
import {AllUsers,signup,login} from '../controllers/user-controller';
 

const router = express.Router();

router.get('/', AllUsers);
router.post("/signup",signup);
router.post("/login",login)

export default router;