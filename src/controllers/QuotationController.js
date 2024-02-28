import { prisma } from '../database/prisma.js'


export const getAllQuotes = async (req, res) => {
    try {

        const quotes = await prisma.quotes.findMany({
            include: {
                client: {
                    select: {
                        name: true,
                        lastname: true,
                        company: {
                            select: {
                                name: true
                            }
                        },
                        bg: true
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

        const data = quotes.map(quote => ({
            id: quote.id,
            client: {
                fullname: `${quote.client.name} ${quote.client.lastname}`,
                company: quote.client.company.name,
                bg: quote.client.bg
            },
            user: {
                name: quote.user.name,
                rol: quote.user.rol.name
            },
            userCreate: quote.users[0],
            userEnd: quote.users[quote.users.length - 1],
            total: quote.total,
            time_delivery: quote.time_delivery,
            type_cot: quote.type_cot,
        }))
        
        return res.status(200).json(data)
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getQuotation = async (req, res) => {
    try {

        const { id } = req.params

        const quotation = await prisma.quotes.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!quotation) {
            return res.status(404).json({ status: false, message: 'Cotizacion no encontrada' })
        }

        return res.status(200).json(quotation)
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const createQuotation = async (req, res) => {
    try {

        const { userId, clientId, total, time_delivery, time_valid, type_change, type_payment, type_delivery, form_delivery, warranty, remarks, type_cot, products } = req.body

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

        const data = {
            userId: userId,
            clientId: clientId,
            total: total,
            time_delivery: time_delivery,
            time_valid: time_valid,
            type_change: type_change,
            type_payment: type_payment,
            type_delivery: type_delivery,
            form_delivery: form_delivery,
            warranty: warranty,
            remarks: remarks,
            type_cot: type_cot,
            users: saveUsers,
            products: products,
            status: 'creado',
            valid: true
        }

        await prisma.quotes.create({
            data
        })

        return res.status(200).json({ status: true, message: 'Se ha registrado una nueva cotizacion satisfactoriamente' })

    } catch (error) {
        res.json({ message: error.message })
    }
}

export const updateQuotation = async (req, res) => {
    try {

        const { id } = req.params
        const { userId, clientId, total, time_delivery, time_valid, type_change, type_payment, type_delivery, form_delivery, warranty, remarks, type_cot, products } = req.body

        const quotation = await prisma.quotes.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!quotation) {
            return res.json({ status: false, message: 'Cotizacion no encontrada' })
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

        const oldUsers = quotation.users
        const allUsers = [].concat(oldUsers, saveUsers)

        const data = {
            userId: userId,
            clientId: clientId,
            total: total,
            time_delivery: time_delivery,
            time_valid: time_valid,
            type_change: type_change,
            type_payment: type_payment,
            type_delivery: type_delivery,
            form_delivery: form_delivery,
            warranty: warranty,
            remarks: remarks,
            type_cot: type_cot,
            users: allUsers,
            products: products,
            status: 'actualizado',
        }

        await prisma.quotes.update({
            where: {
                id: parseInt(id)
            },
            data
        })

        return res.status(200).json({ status: true, message: 'Se ha actualizado la cotizacion correctamente' })
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const deleteQuotation = async (req, res) => {
    try {

        const { id } = req.params

        const quotation = await prisma.quotes.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!quotation) {
            return res.status(404).json({ status: false, message: 'Cotizacion no encontrada' })
        }

        await prisma.quotes.delete({
            where: {
                id: parseInt(id)
            }
        })

        return res.status(200).json({ status: true, message: 'La cotizacion ha sido eliminada correctamente' })
        
    } catch (error) {
        res.json({ message: error.message })
    }
}