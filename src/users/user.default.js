import User from './user.model.js'

export const getEmployee = async(req, res) => {
    try {
        const { Employee, limit = 10, skip = 0 } = req.params
        const users = await User.find({Employee: {$regex: Employee, $options: 'i'}})
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