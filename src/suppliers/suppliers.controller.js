import Supplier from '../suppliers/suppliers.model.js'

/**
 * Crear suppliers
 */
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

/**
 *Listar suppliers
 */

 export const getSuppliers = async (req, res) => {
    try {
      const supplier = await Supplier.find();
      res.status(200).json({ supplier });
    } catch (error) {
      console.error("Error in getSuppliers:", error);
      res.status(500).json({ message: "Error getting suppliers", error: error.message });
    }
  };


/**
 * Actualizar suppliers
 */
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
/**
 * Eliminar suppliers
 */
export const deleteSuppliers = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Supplier.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: "Supplier not found" });
  
      res.status(200).json({ message: "Supplier removed " });
    } catch (error) {
      console.error(" Error in deleteSupplier:", error);
      res.status(500).json({ message: "Error deleting supplier", error: error.message });
    }
  };