import express from 'express'
import {getAllTeacherSubject, getTeacherSubjects, updateTeacherSubjects} from '../controllers/teacherSubject.controller.ts'

const router = express.Router()

router.get('/', getAllTeacherSubject)
router.get('/:id', getTeacherSubjects)
router.put('/subjects/:id', updateTeacherSubjects)

export default router