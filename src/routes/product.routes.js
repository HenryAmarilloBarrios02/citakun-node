import express from 'express'

import { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/ProductController.js'

const router = express.Router()

router.get('/product', getAllProducts)
router.get('/product/:id', getProduct)
router.post('/product', createProduct)
router.put('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)

export default router