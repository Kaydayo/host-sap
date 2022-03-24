import express from 'express'
import {getStudentSubjects, updateStudentSubjects, getAllStudentsSubjects, updateGrade, updateStudentParent} from '../controllers/subject.controller'

const router = express.Router()

router.get('/:id', getStudentSubjects)
router.put('/:id', updateStudentParent)
router.put('/subject/:id', updateStudentSubjects)
router.put('/grade/:id', updateGrade)
router.get('/', getAllStudentsSubjects)


export default router