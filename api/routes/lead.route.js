import express from 'express';
import { insertLead } from '../controllers/lead.controller.js';
//import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();


const app = express();


router.post('/leadInsert', insertLead);

export default router;