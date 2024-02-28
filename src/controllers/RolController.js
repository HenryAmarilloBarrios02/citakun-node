import { prisma } from '../database/prisma.js'

export const getAllRoles = async (req, res) => {
    try {

        const roles = await prisma.roles.findMany({
            where: {
                NOT:{
                    id: 1
                }
            }
        })

        const data = roles.map(role => ({
            id: role.id,
            name: role.name
        }))

        return res.status(200).json(data)

    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getRol = async (req, res) => {
    try {
        
        const { id } = req.params

        const role = await prisma.roles.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (id == 1 || !role) {
            return res.json({ status: false, message: 'Rol no encontrado' });
        }

        return res.status(200).json(role)
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const createRol = async (req, res) => {
    try {

        const { name } = req.body

        const existRol = await prisma.roles.findFirst({
            where: {
                name
            }
        })

        if(existRol){
            return res.json({ status: false, message: 'Ya existe un rol con el mismo nombre' })
        }

        await prisma.roles.create({
            data: {
                name,
                status: 'creado',
                valid: true
            }
        })

        return res.status(200).json({ status: true, message: 'Rol creado correctamente' })
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const updateRol = async (req, res) => {
    try {

        const { id } = req.params
        const { name } = req.body

        const role = await prisma.roles.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (id == 1 || !role) {
            return res.json({ status: false, message: 'Rol no encontrado' });
        }

        const existRol = await prisma.roles.findFirst({
            where: {
                name
            }
        })

        if(existRol){
            return res.json({ status: false, message: 'Ya existe un rol con el mismo nombre' })
        }

        await prisma.roles.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name
            }
        })

        return res.status(200).json({ status: true, message: 'Los datos del rol se han actualizado correctamente' })
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const deleteRol = async (req, res) => {
    try {

        const { id } = req.params

        const role = await prisma.roles.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (id == 1 || !role) {
            return res.json({ status: false, message: 'Rol no encontrado' });
        }

        await prisma.roles.delete({
            where: {
                id: parseInt(id)
            }
        })

        return res.status(200).json({ status: true, message: 'Rol eliminado correctamente' })
        
    } catch (error) {
        res.json({ message: error.message })
    }
}