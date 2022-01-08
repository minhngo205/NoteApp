import express from 'express';
import { signin, signup } from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);

router.get('/welcome', auth, (req,res)=>{
    console.log(req.user)
    res.status(200).send("Welcome 🙌 ");
})

export default router;