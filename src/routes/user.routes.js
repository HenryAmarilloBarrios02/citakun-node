import express from 'express'

import { getAllUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/UserController.js'

const router = express.Router()

router.get('/user', getAllUsers)
router.get('/user/:id', getUser)
router.post('/user', createUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

export default router