import bcrypt from 'bcryptjs'
import { prisma } from '../database/prisma.js'
import { config } from 'dotenv'
config()

export const generateRoles = async (req, res) => {
    try {

        const count = await prisma.roles.count()

        if (count === 0) {

            const rolData = [
                { name: 'admin', status: 'creado', valid: true },
                { name: 'moderator', status: 'creado', valid: true },
                { name: 'user', status: 'creado', valid: true },
                { name: 'guest', status: 'creado', valid: true }
            ]

            await prisma.roles.createMany({
                data: rolData
            })

        }
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const generateAreas = async (req, res) => {
    try {

        const count = await prisma.areas.count()

        if (count === 0) {

            const areaData = [
                { name: 'ADMINISTRACION', status: 'creado', valid: true },
                { name: 'CONTABILIDAD', status: 'creado', valid: true },
                { name: 'MARKETING', status: 'creado', valid: true },
                { name: 'PROGRAMACION', status: 'creado', valid: true },
                { name: 'ALMACEN', status: 'creado', valid: true },
                { name: 'VENTAS', status: 'creado', valid: true },
                { name: 'RR.HH', status: 'creado', valid: true },
                { name: 'SEGURIDAD', status: 'creado', valid: true },
                { name: 'DISEÑO', status: 'creado', valid: true },
                { name: 'LOGISTICA', status: 'creado', valid: true }
            ]

            await prisma.areas.createMany({
                data: areaData
            })

        }
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const generateCompanies = async (req, res) => {
    try {

        const count = await prisma.companies.count()

        if (count === 0) {

            const companyData = [
                { name: 'BCP', social_reason: 'BANCO DE CREDITO DEL PERU', ruc: 20100047218, phone: 951256856, email: 'bcp@bcp.com.pe', address: 'LA MOLINA', status: 'creado', valid: true },
                { name: 'BBVA', social_reason: 'BANCO BBVA PERU', ruc: 20100130204, phone: 951245632, email: 'bbva@bbva.com.pe', address: 'SAN ISIDRO', status: 'creado', valid: true },
                { name: 'INTERBANK', social_reason: 'BANCO INTERNACIONAL DEL PERU - INTERBANK', ruc: 20100053455, phone: 963125741, email: 'interbank@interbank.com.pe', address: 'LA VICTORIA', status: 'creado', valid: true },
                { name: 'ENTEL', social_reason: 'ENTEL PERU S.A.', ruc: 20106897914, phone: 987246351, email: 'entel@entel.com.pe', address: 'SAN ISIDRO', status: 'creado', valid: true },
                { name: 'PIZZA HUT', social_reason: 'TELEPIZZA ANDINA S.A.C.', ruc: 20538225763, phone: 942612856, email: 'pizza@pizza.com.pe', address: 'SAN ISIDRO', status: 'creado', valid: true },
                { name: 'PARDOS', social_reason: 'PARDO´S CHICKEN S.A.C.', ruc: 20511855366, phone: 942753685, email: 'pardos@pardos.com.pe', address: 'SAN ISIDRO', status: 'creado', valid: true },
                { name: 'CINEPLANET', social_reason: 'CINEPLEX S.A', ruc: 20429683581, phone: 921023602, email: 'cineplanet@cineplanet.com.pe', address: 'MIRAFLORES', status: 'creado', valid: true },
                { name: 'ALICORP', social_reason: 'ALICORP SAA', ruc: 20100055237, phone: 952420106, email: 'alicorp@alicorp.com.pe', address: 'CALLAO', status: 'creado', valid: true },
                { name: 'RIPLEY', social_reason: 'TIENDAS POR DEPARTAMENTO RIPLEY S.A.C.', ruc: 20337564373, phone: 950124512, email: 'ripley@ripley.com.pe', address: 'SAN ISIDRO', status: 'creado', valid: true },
                { name: 'SAGA FALABELLA', social_reason: 'SAGA FALABELLA S.A.', ruc: 20100128056, phone: 953623102, email: 'saga@saga.com.pe', address: 'SAN ISIDRO', status: 'creado', valid: true },
            ]

            await prisma.companies.createMany({
                data: companyData
            })

        }
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const generateCategories = async (req, res) => {
    try {

        const count = await prisma.categories.count()

        if (count === 0) {

            const categoryData = [
                { name: 'TECNOLOGIA', status: 'creado', valid: true },
                { name: 'ALIMENTOS', status: 'creado', valid: true },
                { name: 'ENTRETENIMIENTO', status: 'creado', valid: true },
                { name: 'BANCOS', status: 'creado', valid: true },
                { name: 'SERVICIOS', status: 'creado', valid: true },
                { name: 'TRANSPORTE', status: 'creado', valid: true },
                { name: 'SALUD', status: 'creado', valid: true },
                { name: 'EDUCACION', status: 'creado', valid: true },
                { name: 'HOGAR', status: 'creado', valid: true },
                { name: 'DEPORTES', status: 'creado', valid: true },
                { name: 'MODA', status: 'creado', valid: true },
                { name: 'AUTOS', status: 'creado', valid: true },
                { name: 'BEBIDAS', status: 'creado', valid: true },
                { name: 'VIAJES', status: 'creado', valid: true },
                { name: 'ARTE', status: 'creado', valid: true },
                { name: 'MASCOTAS', status: 'creado', valid: true },
                { name: 'BIENES RAICES', status: 'creado', valid: true },
                { name: 'COMUNICACION', status: 'creado', valid: true },
                { name: 'FINANZAS', status: 'creado', valid: true },
                { name: 'BELLEZA', status: 'creado', valid: true }
            ]

            await prisma.categories.createMany({
                data: categoryData
            })

        }
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const generateProviders = async (req, res) => {
    try {
        
        const count = await prisma.providers.count()

        if (count === 0) {

            const providerData = [
                { name: 'Jose', lastname: 'Perez', company: 'Burger King', ruc: 21312512614, phone: 951963925, status: 'creado', valid: true },
                { name: 'Maria', lastname: 'Gonzalez', company: 'McDonalds', ruc: 31254896325, phone: 987654321, status: 'creado', valid: true },
                { name: 'Carlos', lastname: 'Martinez', company: 'Pizza Hut', ruc: 98765432125, phone: 741258963, status: 'creado', valid: true },
                { name: 'Ana', lastname: 'Rodriguez', company: 'Subway', ruc: 45678912356, phone: 123856956, status: 'creado', valid: true },
                { name: 'Pedro', lastname: 'Sanchez', company: 'KFC', ruc: 15975346825, phone: 632541789, status: 'creado', valid: true },
                { name: 'Laura', lastname: 'Lopez', company: 'Dominos Pizza', ruc: 35795124683, phone: 123456789, status: 'creado', valid: true },
                { name: 'Juan', lastname: 'Lopez', company: 'Taco Bell', ruc: 78541236542, phone: 369852147, status: 'creado', valid: true },
                { name: 'Ana', lastname: 'Martinez', company: 'Wendys', ruc: 95175346825, phone: 369852147, status: 'creado', valid: true },
                { name: 'Diego', lastname: 'Garcia', company: 'Chipotle', ruc: 63254178925, phone: 258963147, status: 'creado', valid: true },
                { name: 'Sofia', lastname: 'Hernandez', company: 'Papa Johns', ruc: 36985214763, phone: 951753852, status: 'creado', valid: true },
                { name: 'Luis', lastname: 'Gutierrez', company: 'Dunkin Donuts', ruc: 78596321478, phone: 147852369, status: 'creado', valid: true },
                { name: 'Elena', lastname: 'Santos', company: 'Starbucks', ruc: 12345678912, phone: 789456123, status: 'creado', valid: true },
                { name: 'Gabriel', lastname: 'Rivera', company: 'Baskin-Robbins', ruc: 15975385246, phone: 987456321, status: 'creado', valid: true },
                { name: 'Valeria', lastname: 'Perez', company: 'Popeyes', ruc: 35795135746, phone: 951236536, status: 'creado', valid: true },
                { name: 'Daniel', lastname: 'Flores', company: 'Five Guys', ruc: 45678912365, phone: 654789321, status: 'creado', valid: true },
                { name: 'Carmen', lastname: 'Diaz', company: 'Dairy Queen', ruc: 98765432136, phone: 852963147, status: 'creado', valid: true },
                { name: 'Julia', lastname: 'Gomez', company: 'Panera Bread', ruc: 12345678901, phone: 369852147, status: 'creado', valid: true },
                { name: 'Miguel', lastname: 'Torres', company: 'Chick-fil-A', ruc: 98765432109, phone: 789456123, status: 'creado', valid: true },
                { name: 'Isabella', lastname: 'Martinez', company: 'Jimmy Johns', ruc: 45678912303, phone: 147258369, status: 'creado', valid: true },
                { name: 'Alejandro', lastname: 'Diaz', company: 'Waffle House', ruc: 78912345607, phone: 258963147, status: 'creado', valid: true },
                { name: 'Valentina', lastname: 'Sanchez', company: 'Cinnabon', ruc: 36985214712, phone: 951753852, status: 'creado', valid: true },
                { name: 'Lucas', lastname: 'Hernandez', company: 'In-N-Out Burger', ruc: 14725836902, phone: 789456321, status: 'creado', valid: true },
                { name: 'Emma', lastname: 'Lopez', company: 'Panda Express', ruc: 36914725803, phone: 987456321, status: 'creado', valid: true },
                { name: 'Matias', lastname: 'Garcia', company: 'Auntie Annes', ruc: 74185296304, phone: 654789321, status: 'creado', valid: true },
                { name: 'Santiago', lastname: 'Rodriguez', company: 'White Castle', ruc: 36985214705, phone: 852963147, status: 'creado', valid: true },
                { name: 'Emilia', lastname: 'Perez', company: 'Sonic Drive-In', ruc: 85296314706, phone: 123789456, status: 'creado', valid: true },
                { name: 'Diego', lastname: 'Fernandez', company: 'Whataburger', ruc: 96325874103, phone: 369852147, status: 'creado', valid: true },
                { name: 'Valentina', lastname: 'Gutierrez', company: 'Long John Silvers', ruc: 74125896304, phone: 789456123, status: 'creado', valid: true },
                { name: 'Martin', lastname: 'Lopez', company: 'Pret A Manger', ruc: 85296374105, phone: 147258369, status: 'creado', valid: true },
                { name: 'Joaquin', lastname: 'Martinez', company: 'Hardees', ruc: 36985214706, phone: 258963147, status: 'creado', valid: true }
            ]

            await prisma.providers.createMany({
                data: providerData
            })

        }
        
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const generateAdmin = async (req, res) => {
    try {

        const count = await prisma.users.count()

        if (count === 0) {

            const username = process.env.USER
            const password = process.env.PASSWORD
            const dni = parseInt(process.env.DNI)
            const phone = parseInt(process.env.PHONE)

            const hashedPassword = await bcrypt.hash(password, 10)

            const colors = ["#00B6DE", "#83D2E4", "#5F6062", "#00A160", "#A0CF67", "#08708A", "#56B1BF", "#65302A", "#D73A31", "#FC9F5B", "#7E57C2", "#F75FDE", "#00ACFF", "#FF7D52", "#2DCA72", "#F33C6C", "#393A94"]
            const randomIndex = Math.floor(Math.random() * colors.length)

            const adminData = [
                { username: username, password: hashedPassword, rolId: 1, areaId: 1, name: 'Henry Julian', lastname: 'Amarillo Barrios', dni: dni, phone: phone, email: 'hamarillob@gmail.com', address: 'SJL', bg: colors[randomIndex], status: 'creado', 'valid': true }
            ]

            await prisma.users.createMany({
                data: adminData
            })

        }

    } catch (error) {
        res.json({ message: error.message })
    } finally {
        await prisma.$disconnect()
    }
}

export const generateClients = async (req, res) => {
    try {

        const count = await prisma.clients.count()
        const colors = ["#00B6DE", "#83D2E4", "#5F6062", "#00A160", "#A0CF67", "#08708A", "#56B1BF", "#65302A", "#D73A31", "#FC9F5B", "#7E57C2", "#F75FDE", "#00ACFF", "#FF7D52", "#2DCA72", "#F33C6C", "#393A94"]
        const randomIndex = Math.floor(Math.random() * colors.length)

        if (count === 0) {

            const clientData = [
                { userId: 1, companyId: 1, name: 'Manuel', lastname: 'Pelaez', charge: 'Gerente', phone: 969215388, email: 'manuel@gerente.com', bg: colors[randomIndex], users: {}, status: 'creado', valid: true },
                { userId: 1, companyId: 2, name: 'Luis', lastname: 'Gomez', charge: 'Supervisor', phone: 963258741, email: 'luis@supervisor.com', bg: colors[randomIndex], users: {}, status: 'creado', valid: true },
                { userId: 1, companyId: 3, name: 'Carlos', lastname: 'Perez', charge: 'Jefe de Area', phone: 953454325, email: 'carlos@jefe.com', bg: colors[randomIndex], users: {}, status: 'creado', valid: true },
                { userId: 1, companyId: 4, name: 'Maria', lastname: 'Gonzalez', charge: 'Recepcionista', phone: 920345123, email: 'maria@recepcion.com', bg: colors[randomIndex], users: {}, status: 'creado', valid: true },
                { userId: 1, companyId: 5, name: 'Ana', lastname: 'Rodriguez', charge: 'Secretaria', phone: 960258165, email: 'ana@secretaria.com', bg: colors[randomIndex], users: {}, status: 'creado', valid: true },
            ]

            console.log(clientData)

            await prisma.clients.createMany({
                data: clientData
            })

        }
        
    } catch (error) {
        res.json({ message: error.message })
    }
}