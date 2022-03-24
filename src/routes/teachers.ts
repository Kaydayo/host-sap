import express from 'express'
import { getAllTeachers, getSingleTeacher, createTeacher, updateTeacher, deleteTeacher } from '../controllers/teacher.controller'

const router = express.Router()

router.get('/', getAllTeachers)
router.get('/:id', getSingleTeacher)
router.post('/', createTeacher)
router.put('/:id', updateTeacher)
router.delete('/:id', deleteTeacher)

export default router