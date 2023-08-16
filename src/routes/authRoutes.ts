import auth from '../../middleware/auth';
import express from 'express';

const router = express.Router();

// login-logout
router.post('/login', auth.Login);
router.delete('/logout', auth.Logout);
router.get('/getMe', auth.getMe);

export default router;
