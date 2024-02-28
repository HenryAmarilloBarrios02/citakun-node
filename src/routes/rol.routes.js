import express from 'express'

import { getAllRoles, getRol, createRol, updateRol, deleteRol } from '../controllers/RolController.js'

const router = express.Router()

router.get('/rol', getAllRoles)
router.get('/rol/:id', getRol)
router.post('/rol', createRol)
router.put('/rol/:id', updateRol)
router.delete('/rol/:id', deleteRol)

export default router