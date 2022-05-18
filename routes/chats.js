import express from 'express';
import { getStatusCheck, postMessage } from '../controllers/chatController.js';
const router = express.Router();

router
    .route('/')
    .get(getStatusCheck)
    .post(postMessage)


export default router;