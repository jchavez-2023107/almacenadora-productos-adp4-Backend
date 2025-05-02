import Supplier from '../suppliers/suppliers.model.js'

export const addSupplier = async(req, res) =>{
    try{
        let data = req.body
        let supplier = new Supplier(data)

        await supplier.save()
        return res.send({message: 'Supplier save'})

    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error AddSupp'})
    }
}

export const updateSupp = async(req, res) =>{
    try{
        const {id} = req.params
        const data = req.body

        const updateSupp = await Supplier.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )

        if(!updateSupp) return res.status(404).send(
            {
                success: false,
                message: 'Supplier not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Supplier found',
                supplier: updateSupp
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error updateSupp'})
    }
}