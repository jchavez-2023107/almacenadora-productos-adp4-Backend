import User from './user.model.js'

const defaultUsers = [
    {
        name: "Diego Andre",
        surname: "Chupina Mendez",
        username: "dchupina2006",
        email: "dchupina2006@gmail.com",
        password: "hola123*",
        phone: "50203368",
        role: "Admin"
    },
    {
        name: "Pedro Sergio Javier",
        surname: "Bautista Matheu",
        username: "pbautista2006",
        email: "pbautista2006@gmail.com",
        password: "adios987*",
        phone: "45258698",
        role: "Employee"
    },
    {
        name: "Joel Alejandro",
        surname: "Chavez Perez",
        username: "jchavez2006",
        email: "jchavez2006@gmail.com",
        password: "losrojos78*",
        phone: "54646566",
        role: "CLIENT"
    }
]

export const createDefaultUsers = async () => {
    try {
        const existingUsers = await User.countDocuments()
        if (existingUsers === 0) {
            await User.insertMany(defaultUsers)
            console.log('Default Users added successfully')
        }
    } catch (error) {
        console.error('General error with add default users', e);         
    }
}

export const getEmployees = async(req, res) => {
    try {
        const { Employee, limit = 10, skip = 0 } = req.params
        const users = await User.find({role: {$regex: Employee, $options: 'i'}})
            .skip(skip)
            .limit(limit)

        if(users.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Employee not found'
                }
            )
        } 
        return res.send(
            {
                success: true,
                message: 'Employee found',
                users
            }
        )                   
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General error'})                
    }
}