import { prisma } from '../database/prisma.js'

export const getAllAreas = async (req, res) => {
    try {

        const areas = await prisma.areas.findMany({
        })

        const data = areas.map(area => ({
            id: area.id,
            name: area.name
        }))

        return res.status(200).json(data)

    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getArea = async (req, res) => {
    try {
        
        const { id } = req.params

        const area = await prisma.areas.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if(!area){
            return res.json({ status: false, message: 'Area no encontrada' })
        }

        return res.status(200).json(area)
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const createArea = async (req, res) => {
    try {

        const { name } = req.body

        const existArea = await prisma.areas.findFirst({
            where: {
                name
            }
        })

        if(existArea){
            return res.json({ status: false, message: 'Ya existe un area con el mismo nombre' })
        }

        await prisma.areas.create({
            data: {
                name,
                status: 'creado',
                valid: true
            }
        })

        return res.status(200).json({ status: true, message: 'Area creada correctamente' })

    } catch (error) {
        res.json({ message: error.message })
    }
}

export const updateArea = async (req, res) => {
    try {

        const { id } = req.params
        const { name } = req.body

        const area = await prisma.areas.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if(!area){
            return res.json({ status: false, message: 'Area no encontrada' })
        }

        const existArea = await prisma.areas.findFirst({
            where: {
                name
            }
        })

        if(existArea){
            return res.json({ status: false, message: 'Ya existe un area con el mismo nombre' })
        }

        await prisma.areas.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name
            }
        })

        return res.status(200).json({ status: true, message: 'Area actualizada correctamente' })

    } catch (error) {
        res.json({ message: error.message })
    }
}

export const deleteArea = async (req, res) => {
    try {

        const { id } = req.params

        const area = await prisma.areas.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        
        if(!area){
            return res.json({ status: false, message: 'Area no encontrada' })
        }

        await prisma.areas.delete({
            where: {
                id: parseInt(id)
            }
        })

        return res.status(200).json({ status: true, message: 'Area eliminada correctamente' })

    } catch (error) {
        res.json({ message: error.message })
    }
}