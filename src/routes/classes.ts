import express from 'express'
import {getAllClasses} from '../controllers/class.controller'


const router = express.Router();

router.get('/', getAllClasses)


export default router