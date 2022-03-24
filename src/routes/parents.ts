import express from 'express'
import { getAllParents, getSingleParent, createParent, updateParent, deleteParent} from '../controllers/parent.controller';

const router = express.Router();

router.get('/', getAllParents)
router.get('/:id', getSingleParent)
router.post('/', createParent)
router.put('/:id', updateParent)
router.delete('/:id', deleteParent)


export default router