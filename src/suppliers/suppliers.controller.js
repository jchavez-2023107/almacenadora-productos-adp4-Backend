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


  /**
   *  Default Suppliers 
   */
  export const addDefaultSuppliers = async () => {
    const total = await Supplier.countDocuments();
    if (total === 0) {
      const defaultSuppliers = [
        {
          name: 'Distribuidora Central',
          address: 'Av. Principal #123, Ciudad Capital',
          email: 'central@proveedores.com',
          phone: '555-123-4567'
        },
        {
          name: 'Suministros del Norte',
          address: 'Calle Norte 45, Ciudad Norte',
          email: 'norte@proveedores.com',
          phone: '555-987-6543'
        },
        {
          name: 'Grupo Industrial Sur',
          address: 'Zona Industrial Sur, Km 12',
          email: 'sur@proveedores.com',
          phone: '555-456-7890'
        }
      ];
  
      try {
        await Supplier.insertMany(defaultSuppliers);
        console.log('Proveedores por defecto agregados');
      } catch (error) {
        console.error('Error al agregar proveedores por defecto:', error);
      }
    } else {
      console.log('Ya existen proveedores en la base de datos.');
    }
  };