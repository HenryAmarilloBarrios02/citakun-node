import express from 'express'

import { getAllProviders, getProvider, createProvider, updateProvider, deleteProvider } from '../controllers/ProviderController.js'

const router = express.Router()

router.get('/provider', getAllProviders)
router.get('/provider/:id', getProvider)
router.post('/provider', createProvider)
router.put('/provider/:id', updateProvider)
router.delete('/provider/:id', deleteProvider)

export default router