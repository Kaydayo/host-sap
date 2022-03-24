import {register, login, deleteUser} from  '../controllers/auth.controller'
import express from 'express'

var router = express.Router();

/* GET users listing. */
router.post('/register', register)
router.post('/login', login)
router.post('/:id', deleteUser)

export default router;
