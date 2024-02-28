import express from 'express'

import { getAllCategories, getCategory, createCategory, updateCategory, deleteCategory } from '../controllers/CategoryController.js'

const router = express.Router()

router.get('/category', getAllCategories)
router.get('/category/:id', getCategory)
router.post('/category', createCategory)
router.put('/category/:id', updateCategory)
router.delete('/category/:id', deleteCategory)

export default router