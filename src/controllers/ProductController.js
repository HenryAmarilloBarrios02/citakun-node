import { prisma } from '../database/prisma.js'

export const getAllProducts = async (req, res) => {
    try {

        const products = await prisma.products.findMany({
            include: {
                category: {
                    select: {
                        name: true
                    }
                },
                provider: {
                    select: {
                        name: true,
                        lastname: true
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

        const data = products.map(product => ({
            id: product.id,
            code: product.code,
            name: product.name,
            description: product.description,
            brand: product.brand,
            model: product.model,
            price: product.price,
            stock: product.stock,
            unit: product.unit,
            category: product.category.name,
            provider: `${product.provider.name} ${product.provider.lastname}`,
            user: {
                name: product.user.name,
                rol: product.user.rol.name
            },
            userCreate: product.users[0],
            userEnd: product.users[product.users.length - 1]
        }))

        return res.status(200).json(data)
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getProduct = async (req, res) => {
    try {

        const { id } = req.params

        const product = await prisma.products.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!product) {
            return res.status(400).json({ status: false, message: 'El producto no existe' })
        }

        return res.status(200).json(product)
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const createProduct = async (req, res) => {
    try {

        const { userId, categoryId, providerId, code, name, description, brand, model, price, stock, unit } = req.body

        const existProduct = await prisma.products.findFirst({
            where: {
                code: code
            }
        })

        if (existProduct) {
            return res.json({ status: false, message: 'Ya existe otro producto registrado con el mismo codigo' })
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

        const data = {
            userId: userId,
            categoryId: categoryId,
            providerId: providerId,
            code: code,
            name: name,
            description: description,
            brand: brand,
            model: model,
            price: price,
            stock: stock,
            unit: unit,
            users: saveUsers,
            status: 'creado',
            valid: true
        }

        await prisma.products.create({
            data
        })

        return res.status(200).json({ status: true, message: 'Se ha registrado un nuevo producto satisfactoriamente' })
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const updateProduct = async (req, res) => {
    try {

        const { id } = req.params
        const { userId, categoryId, providerId, code, name, description, brand, model, price, stock, unit } = req.body

        const product = await prisma.products.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!product) {
            return res.json({ status: false, message: 'Producto no encontrado' })
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

        const oldUsers = product.users
        const allUsers = [].concat(oldUsers, saveUsers)

        const data = {
            userId: userId,
            categoryId: categoryId,
            providerId: providerId,
            code: code,
            name: name,
            description: description,
            brand: brand,
            model: model,
            price: price,
            stock: stock,
            unit: unit,
            users: allUsers,
            status: 'actualizado'
        }

        await prisma.products.update({
            where: {
                id: parseInt(id)
            },
            data
        })

        return res.status(200).json({ status: true, message: 'Los datos del producto se han actualizado correctamente' })
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {

        const { id } = req.params

        const product = await prisma.products.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!product) {
            return res.status(400).json({ status: false, message: 'Producto no encontrado' })
        }

        await prisma.products.delete({
            where: {
                id: parseInt(id)
            }
        })

        return res.status(200).json({ status: true, message: 'El producto ha sido eliminado correctamente' })
        
    } catch (error) {
        res.json({ message: error.message })
    }
}