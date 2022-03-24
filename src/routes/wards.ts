import express from 'express'
import { updateParentWard, getWards, getAsingleWard} from '../controllers/wards.controller'


const router = express.Router()

router.put('/:id', updateParentWard)
router.get('/', getWards)
router.get('/:id', getAsingleWard)

export default router