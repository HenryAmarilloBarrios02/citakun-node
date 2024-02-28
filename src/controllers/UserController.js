import { prisma } from '../database/prisma.js'
import bcrypt from 'bcryptjs'

export const getAllUsers = async (req, res) => {
    try {

        const users = await prisma.users.findMany({
            where: {
                valid: true,
                NOT: {
                    rolId: 1
                }
            },
            include: {
                rol: {
                    select: {
                        name: true
                    }
                },
                area: {
                    select: {
                        name: true
                    }
                }
            }
        })

        const data = users.map(user => ({
            id: user.id,
            username: user.username,
            rol: user.rol.name,
            area: user.area.name,
            name: user.name,
            lastname: user.lastname,
            dni: user.dni,
            phone: user.phone,
            email: user.email,
            address: user.address,
            bg: user.bg,
            status: user.status,
            createdAt: user.createdAt
        }))

        return res.status(200).json(data)

    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getUser = async (req, res) => {
    try {
        
        const { id } = req.params

        const user = await prisma.users.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if ( id == 1 || !user) {
            return res.json({ status: false, message: 'Usuario no encontrado' })
        }

        return res.status(200).json(user)
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const createUser = async (req, res) => {
    try {

        const { username, password, rolId, areaId, name, lastname, dni, phone, email, address } = req.body

        if (rolId === 1) {
            return res.json({ status: false, message: 'El rol de administrador no es accesible para usted' })
        }

        const existUser = await prisma.users.findFirst({
            where: {
                username: username
            }
        })

        if (existUser) {
            return res.json({ status: false, message: 'Ya existe un usuario con el mismo nombre de usuario' })
        }

        const existDNI = await prisma.users.findFirst({
            where: {
                dni: dni
            }
        })

        if (existDNI) {
            return res.json({ status: false, message: 'Ya existe un usuario con el mismo DNI' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const colors = ["#00B6DE", "#83D2E4", "#5F6062", "#00A160", "#A0CF67", "#08708A", "#56B1BF", "#65302A", "#D73A31", "#FC9F5B", "#7E57C2", "#F75FDE", "#00ACFF", "#FF7D52", "#2DCA72", "#F33C6C", "#393A94"]
        const randomIndex = Math.floor(Math.random() * colors.length)

        const data = {
            username,
            password: hashedPassword,
            rolId: parseInt(rolId),
            areaId: parseInt(areaId),
            name,
            lastname,
            dni: parseInt(dni),
            phone: parseInt(phone),
            email,
            address,
            bg: colors[randomIndex],
            status: 'creado',
            valid: true
        }

        await prisma.users.create({
            data
        })

        return res.status(200).json({ status: true, message: 'Se ha registrado un nuevo usuario satisfactoriamente' })

    } catch (error) {
        res.json({ message: error.message })
    }
}

export const updateUser = async (req, res) => {
    try {

        const { id } = req.params
        const { username, password, rolId, areaId, name, lastname, dni, phone, email, address } = req.body

        const user = await prisma.users.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (id == 1 || !user) {
            return res.json({ status: false, message: 'Usuario no encontrado' })
        }

        if (rolId == 1) {
            return res.json({ status: false, message: 'El rol de administrador no es accesible para usted' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const data = {
            username,
            password: hashedPassword,
            rolId: parseInt(rolId),
            areaId: parseInt(areaId),
            name,
            lastname,
            dni: parseInt(dni),
            phone: parseInt(phone),
            email,
            address
        }

        await prisma.users.update({
            where: {
                id: parseInt(id)
            },
            data
        })

        return res.status(200).json({ status: true, message: 'Los datos del usuario se han actualizado correctamente' })
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {

        const { id } = req.params

        const user = await prisma.users.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (id == 1 || !user) {
            return res.json({ status: false, message: 'Usuario no encontrado' })
        }

        await prisma.users.delete({
            where: {
                id: parseInt(id)
            }
        })

        return res.status(200).json({ status: true, message: 'El usuario se ha eliminado correctamente' })
        
    } catch (error) {
        res.json({ message: error.message })
    }
}