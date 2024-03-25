import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings,sendEmail } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

const app = express();
//const port = 5173;


router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);
router.post('/send-email', sendEmail);




export default router;
