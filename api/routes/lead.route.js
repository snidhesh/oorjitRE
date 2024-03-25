import express from 'express';
import { insertLead,getLead } from '../controllers/lead.controller.js';
//import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();


const app = express();


router.post('/leadInsert', insertLead);
router.get('/getLead/:id',getLead);


export default router;