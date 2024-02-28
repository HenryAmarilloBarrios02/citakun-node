import express from 'express'

import { getAllQuotes, getQuotation, createQuotation, updateQuotation, deleteQuotation } from '../controllers/QuotationController.js'

const router = express.Router()

router.get('/quotation', getAllQuotes)
router.get('/quotation/:id', getQuotation)
router.post('/quotation', createQuotation)
router.put('/quotation/:id', updateQuotation)
router.delete('/quotation/:id', deleteQuotation)

export default router