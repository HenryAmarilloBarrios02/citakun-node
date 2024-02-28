import { prisma } from '../database/prisma.js'

export const getAllCategories = async (req, res) => {
    try {

        const categories = await prisma.categories.findMany({
        })

        const data = categories.map(category => ({
            id: category.id,
            name: category.name
        }))

        return res.status(200).json(data)
        
    } catch (error) {
        return res.json({ message: error.message })
    }
}

export const getCategory = async (req, res) => {
    try {

        const { id } = req.params

        const category = await prisma.categories.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if(!category){
            return res.json({ status: false, message: 'Categoria no encontrada' })
        }

        return res.status(200).json(category)
        
    } catch (error) {
        return res.json({ message: error.message })
    }
}

export const createCategory = async (req, res) => {
    try {

        const { name } = req.body

        const existCategory = await prisma.categories.findFirst({
            where: {
                name
            }
        })

        if(existCategory){
            return res.json({ status: false, message: 'Ya existe una categoria con el mismo nombre' })
        }

        await prisma.categories.create({
            data: {
                name,
                status: 'creado',
                valid: true
            }
        })

        res.status(200).json({ status: true, message: 'Categoria creada correctamente' })
        
    } catch (error) {
        return res.json({ message: error.message })
    }
}

export const updateCategory = async (req, res) => {
    try {

        const { id } = req.params
        const { name } = req.body

        const category = await prisma.categories.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if(!category){
            return res.json({ status: false, message: 'Categoria no encontrada' })
        }

        const existCategory = await prisma.categories.findFirst({
            where: {
                name
            }
        })

        if(existCategory){
            return res.json({ status: false, message: 'Ya existe una categoria con el mismo nombre' })
        }

        await prisma.categories.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name
            }
        })

        return res.status(200).json({ status: true, message: 'Categoria actualizada correctamente' })
        
    } catch (error) {
        return res.json({ message: error.message })
    }
}

export const deleteCategory = async (req, res) => {
    try {

        const { id} = req.params

        const category = await prisma.categories.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if(!category){
            return res.json({ status: false, message: 'Categoria no encontrada' })
        }

        await prisma.categories.delete({
            where: {
                id: parseInt(id)
            }
        })

        return res.status(200).json({ status: true, message: 'Categoria eliminada correctamente' })
        
    } catch (error) {
        return res.json({ message: error.message })
    }
}