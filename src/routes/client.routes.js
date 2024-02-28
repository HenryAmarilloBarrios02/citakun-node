import express from 'express'

import { getAllClients, getClient, createClient, updateClient, deleteClient } from '../controllers/ClientController.js'

const router = express.Router()

router.get('/client', getAllClients)
router.get('/client/:id', getClient)
router.post('/client', createClient)
router.put('/client/:id', updateClient)
router.delete('/client/:id', deleteClient)

export default router