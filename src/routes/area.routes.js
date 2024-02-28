import express from 'express'

import { getAllAreas, getArea, createArea, updateArea, deleteArea } from '../controllers/AreaController.js'

const router = express.Router()

router.get('/area', getAllAreas)
router.get('/area/:id', getArea)
router.post('/area', createArea)
router.put('/area/:id', updateArea)
router.delete('/area/:id', deleteArea)

export default router