import { prisma } from '../database/prisma.js'

export const getAllProviders = async (req, res) => {
    try {

        const providers = await prisma.providers.findMany({
        })

        const data = providers.map(provider => ({
            id: provider.id,
            name: provider.name,
            lastname: provider.lastname,
            company: provider.company,
            ruc: parseInt(provider.ruc),
            phone: provider.phone,
        }))

        return res.status(200).json(data)
        
    } catch (error) {
        return res.json({ message: error.message })
    }
}

export const getProvider = async (req, res) => {
    try {

        const { id } = req.params

        const provider = await prisma.providers.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if(!provider){
            return res.json({ status: false, message: 'Proveedor no encontrado' })
        }

        const data = {
            id: provider.id,
            name: provider.name,
            lastname: provider.lastname,
            company: provider.company,
            ruc: parseInt(provider.ruc),
            phone: provider.phone,
            status: provider.status,
            valid: provider.valid,
            createdAt: provider.createdAt,
            updatedAt: provider.updatedAt
        }

        return res.status(200).json(data)
        
    } catch (error) {
        return res.json({ message: error.message })
    }
}

export const createProvider = async (req, res) => {
    try {

        const { name, lastname, company, ruc, phone } = req.body

        const existProvider = await prisma.providers.findFirst({
            where: {
                ruc
            }
        })

        if(existProvider){
            return res.json({ status: false, message: 'Ya existe un proveedor con el mismo RUC' })
        }

        const data = {
            name,
            lastname,
            company,
            ruc,
            phone,
            status: 'creado',
            valid: true
        }

        await prisma.providers.create({
            data
        })

        return res.json({ status: true, message: 'Proveedor creado correctamente' })
        
    } catch (error) {
        return res.json({ message: error.message })
    }
}

export const updateProvider = async (req, res) => {
    try {

        const { id } = req.params
        const { name, lastname, company, ruc, phone } = req.body

        const provider = await prisma.providers.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if(!provider){
            return res.json({ status: false, message: 'Proveedor no encontrado' })
        }

        const data = {
            name,
            lastname,
            company,
            ruc,
            phone
        }

        await prisma.providers.update({
            where: {
                id: parseInt(id)
            },
            data
        })

        return res.json({ status: true, message: 'Proveedor actualizado correctamente' })
        
    } catch (error) {
        return res.json({ message: error.message })
    }
}

export const deleteProvider = async (req, res) => {
    try {

        const { id } = req.params

        const provider = await prisma.providers.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if(!provider){
            return res.json({ status: false, message: 'Proveedor no encontrado' })
        }

        await prisma.providers.delete({
            where: {
                id: parseInt(id)
            }
        })

        return res.json({ status: true, message: 'Proveedor eliminado correctamente' })
        
    } catch (error) {
        return res.json({ message: error.message })
    }
}