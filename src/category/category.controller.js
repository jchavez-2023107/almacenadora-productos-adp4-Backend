import Category from '../category/category.model.js'

export const addCategory = async(req, res) =>{
    try{
        let data = req.body
        let category = new Category(data)

        await category.save()
        return res.send({message: `Category register with ${category.name}`})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error addCat'})
    }
}

export const getCategorys = async(req, res) =>{
    try{
        const {limit = 20, skip = 0} = req.query
        const category = await Category.find()
            .skip(skip)
            .limit(limit)
        
            if(category.length === 0 ){
                return res.status(404).send(
                    {
                        success: false,
                        message: 'Categorys not found'
                    }
                )
            }
            return res.send(
                {
                    success: true,
                    message: 'Categorys found: ',
                    category
                }
            )
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error getCat'})
    }
}

export const updateCat = async(req, res) =>{
    try{
        const {id} = req.params
        const data = req.body

        const update = await Category.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )

        if(!update) return res.status(404).send(
            {
                success: false,
                message: 'Category not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Category update',
                category: update
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const deleteCat = async(req, res) =>{
    try{
        let {id} = req.params

        const category = await Category.findById(id)
        if(!category) return res.status(404).send(
            {
                success: false,
                message: 'Category not found'
            }
        )

        await Category.deleteOne(category)
        return res.send({message: 'Category deleted'})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error deletCat'})
    }
}