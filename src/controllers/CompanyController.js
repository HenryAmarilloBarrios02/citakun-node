import { prisma } from '../database/prisma.js'

export const getAllCompanies = async (req, res) => {
    try {

        const companies = await prisma.companies.findMany({
        })

        const data = companies.map(company => ({
            id: company.id,
            name: company.name,
            social_reason: company.social_reason,
            ruc: parseInt(company.ruc),
            phone: company.phone,
            email: company.email,
            address: company.address
        }))

        return res.status(200).json(data)

    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getCompany = async (req, res) => {
    try {
        
        const { id } = req.params

        const company = await prisma.companies.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if(!company){
            return res.json({ status: false, message: 'Empresa no encontrada' })
        }

        const data = {
            id: company.id,
            name: company.name,
            social_reason: company.social_reason,
            ruc: parseInt(company.ruc),
            phone: company.phone,
            email: company.email,
            address: company.address,
            status: company.status,
            valid: company.valid,
            createdAt: company.createdAt,
            updatedAt: company.updatedAt
        }

        return res.status(200).json(data)
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const createCompany = async (req, res) => {
    try {
        
        const { name, social_reason, ruc, phone, email, address } = req.body

        const existRUC = await prisma.companies.findFirst({
            where: {
                ruc: ruc
            }
        })

        if(existRUC){
            return res.json({ status: false, message: 'Ya existe una empresa con el mismo RUC' })
        }

        const data = {
            name,
            social_reason,
            ruc,
            phone,
            email,
            address,
            status: 'creado',
            valid: true
        }

        await prisma.companies.create({
            data
        })

        return res.status(200).json({ status: true, message: 'Empresa creada correctamente' })

    } catch (error) {
        res.json({ message: error.message })
    }
}

export const updateCompany = async (req, res) => {
    try {

        const { id } = req.params
        const { name, social_reason, ruc, phone, email, address } = req.body

        const company = await prisma.companies.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if(!company){
            return res.json({ status: false, message: 'Empresa no encontrada' })
        }

        const data = {
            name,
            social_reason,
            ruc,
            phone,
            email,
            address
        }

        await prisma.companies.update({
            where: {
                id: parseInt(id)
            },
            data
        })

        return res.status(200).json({ status: true, message: 'Empresa actualizada correctamente' })

    } catch (error) {
        res.json({ message: error.message })
    }
}

export const deleteCompany = async (req, res) => {
    try {

        const { id } = req.params

        const company = await prisma.companies.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if(!company){
            return res.json({ status: false, message: 'Empresa no encontrada' })
        }

        await prisma.companies.delete({
            where: {
                id: parseInt(id)
            }
        })

        return res.status(200).json({ status: true, message: 'Empresa eliminada correctamente' })
        
    } catch (error) {
        res.json({ message: error.message })
    }
}