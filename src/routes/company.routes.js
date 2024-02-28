import express from 'express'

import { getAllCompanies, getCompany, createCompany, updateCompany, deleteCompany } from '../controllers/CompanyController.js'

const router = express.Router()

router.get('/company', getAllCompanies)
router.get('/company/:id', getCompany)
router.post('/company', createCompany)
router.put('/company/:id', updateCompany)
router.delete('/company/:id', deleteCompany)

export default router