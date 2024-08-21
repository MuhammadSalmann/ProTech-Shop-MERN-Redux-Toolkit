import express from 'express';
const router = express.Router();
import {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    logoutUser,
} from '../controllers/userController.js';

router.route('/').post(registerUser).get(getUsers);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.route('/:id').delete(deleteUser).get(getUserById).put(updateUser);

export default router;