import express from 'express';
import { deleteUser, updateUser,  getUserListings, getUser, getLandlord } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();


router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser)
router.get('/landlord/:id',  getLandlord)


export default router;