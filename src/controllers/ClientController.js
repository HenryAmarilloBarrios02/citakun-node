import { prisma } from '../database/prisma.js'

export const getAllClients = async (req, res) => {
    try {

        const clients = await prisma.clients.findMany({
            include: {
                company: {
                    select: {
                        name: true
                    }
                },
                user: {
                    select: {
                        name: true,
                        rol: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })

        const data = clients.map(client => ({
            id: client.id,
            name: client.name,
            lastname: client.lastname,
            charge: client.charge,
            phone: client.phone,
            email: client.email,
            bg: client.bg,
            user: {
                name: client.user.name,
                rol: client.user.rol.name
            },
            company: client.company.name,
            userCreate: client.users[0],
            userEnd: client.users[client.users.length - 1]
        }))

        return res.status(200).json(data)
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getClient = async (req, res) => {
    try {

        const { id } = req.params

        const client = await prisma.clients.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!client) {
            return res.json({ status: false, message: 'Cliente no encontrado' })
        }

        return res.status(200).json(client)
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const createClient = async (req, res) => {
    try {

        const { userId, companyId, name, lastname, charge, phone, email } = req.body

        const existClient = await prisma.clients.findFirst({
            where: {
                name: name,
                lastname: lastname,
            }
        })

        if (existClient) {
            return res.json({ status: false, message: 'El cliente ya esta registrado' })
        }

        const user = await prisma.users.findUnique({
            where: {
                id: userId
            }
        })

        const fullname = `${user.name} ${user.lastname}`

        const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
        
        const date = new Date()
        const hours = date.getHours()
        const minutes = date.getMinutes()

        const formatHours = hours < 10 ? `0${hours}` : hours
        const formatMinutes = minutes < 10 ? `0${minutes}` : minutes

        const day = date.getDate()
        const month = date.getMonth()
        const year = date.getFullYear()

        const datetime = `${day} ${monthNames[month]} ${year} ${formatHours}:${formatMinutes}`

        const saveUsers = [{
            userId: userId,
            fullname: fullname,
            date: date,
            datetime: datetime,
        }]

        const colors = ["#00B6DE", "#83D2E4", "#5F6062", "#00A160", "#A0CF67", "#08708A", "#56B1BF", "#65302A", "#D73A31", "#FC9F5B", "#7E57C2", "#F75FDE", "#00ACFF", "#FF7D52", "#2DCA72", "#F33C6C", "#393A94"]
        const randomIndex = Math.floor(Math.random() * colors.length)

        const data = {
            userId: userId,
            companyId: companyId,
            name: name,
            lastname: lastname,
            charge: charge,
            phone: phone,
            email: email,
            bg: colors[randomIndex],
            users: saveUsers,
            status: 'creado',
            valid: true
        }

        await prisma.clients.create({
            data
        })

        return res.status(200).json({ status: true, message: 'Se ha registrado un nuevo cliente satisfactoriamente' })
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const updateClient = async (req, res) => {
    try {

        const { id } = req.params
        const { userId, companyId, name, lastname, charge, phone, email } = req.body

        const client = await prisma.clients.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!client) {
            return res.json({ status: false, message: 'Cliente no encontrado' })
        }

        const user = await prisma.users.findUnique({
            where: {
                id: userId
            }
        })

        const fullname = `${user.name} ${user.lastname}`

        const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
        
        const date = new Date()
        const hours = date.getHours()
        const minutes = date.getMinutes()

        const formatHours = hours < 10 ? `0${hours}` : hours
        const formatMinutes = minutes < 10 ? `0${minutes}` : minutes

        const day = date.getDate()
        const month = date.getMonth()
        const year = date.getFullYear()

        const datetime = `${day} ${monthNames[month]} ${year} ${formatHours}:${formatMinutes}`

        const saveUsers = {
            userId: userId,
            fullname: fullname,
            date: date,
            datetime: datetime,
        }

        const oldUsers = client.users
        const allUsers = [].concat(oldUsers, saveUsers)

        const data = {
            userId: userId,
            companyId: companyId,
            name: name,
            lastname: lastname,
            charge: charge,
            phone: phone,
            email: email,
            users: allUsers,
            status: 'actualizado'
        }

        await prisma.clients.update({
            where: {
                id: parseInt(id)
            },
            data
        })

        return res.status(200).json({ status: true, message: 'Los datos del cliente se han actualizado correctamente' })
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const deleteClient = async (req, res) => {
    try {

        const { id } = req.params

        const client = await prisma.clients.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!client) {
            return res.json({ status: false, message: 'Cliente no encontrado' })
        }

        await prisma.clients.delete({
            where: {
                id: parseInt(id)
            }
        })

        return res.status(200).json({ status: true, message: 'El cliente ha sido eliminado correctamente' })
        
    } catch (error) {
        res.json({ message: error.message })
    }
}