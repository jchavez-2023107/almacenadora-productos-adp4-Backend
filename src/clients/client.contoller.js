import Clients from "./client.model.js"
/**
 * Crear nuevo cliente 
 */

export const createClient = async (req, res) => {
    try{
        const{name,email,company,product,phone} = req.body;

        const newClient = new Clients({name,email,company,product,phone});
        await newClient.save();

        res.status(201).json({
            message: "Client created successfully",
            clients:newClient,
        });
    }catch (error){
        console.error("Error creating client:",error);
        res
        .status(500)
        .json({message:"Error creating client:", error:error.message});
    }
};

/**
 * Obtener todos los clientes
 */

export const getClient = async (req,res) => {
    try{
        const clients = await Clients.find();
        res.status(200).json({clients});
    }catch(error){
        consolo.error("Error getting clients:", error);
        res.status(500).json({message: "Error getting clients:"});
    }
};

/**
 * Actualizar cliente por ID
 */
 
export const updateClient = async (req, res) => {
    try{
        const {id} = req.params;
        const updateClient = await Clients.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        
        if(!updateClient) {
            return res.status(404).json({message: "Client not found"});
        }
        res.status(200).json({message:"Client update successfully", client: updateClient,});
    } catch (error){
        console.error("Error updating client:",error);
        res.status(500).json({message:"Error updating client"});
    }
};

/**
 * Eliminar cliente por ID
 */
export const deleteClient = async (req, res) => {
    try{
        const {id} = req.params;
        const deleteClient = await Clients.findByIdAndDelete (id);

        if(!deleteClient){
            return re.status(404).json({message:"Client not found"});
        }
        res.status(200).json({message: "Client successfully detelete"});
    }catch (error){
        console.error("Error deleting client", error);
        res.status(500).json({message: "Error deleting client"});
    }
}

/**
 * Agregar clientes por defecto
 */
export const addDefaultClients = async () => {
    const total = await Clients.countDocuments();
    if (total === 0) {
      const defaultClients = [
        {
          name: "Empresa Logística Lima SAC",
          email: "empresaLogi@gmail.com",
          company: "Empresa Logística Lima SAC",
          product: "Cajas de cartón",
          phone: "+502 98765432"
        },
        {
          name: "Distribuciones del Norte SRL",
          email: "distribuiDelNorte@gmail.com",
          company: "Distribuciones del Norte SRL",
          product: "Palets plásticos",
          phone: "+502 91234567"
        },
        {
          name: "Transportes Andes EIRL",
          email: "transportesAndre@gmail.com",
          company: "Transportes Andes EIRL",
          product: "Contenedores metálicos",
          phone: "+502 92345678"
        }
      ];
  
      try {
        await Clients.insertMany(defaultClients);
        console.log("Clientes por defecto agregados");
      } catch (error) {
        console.error("Error al agregar clientes por defecto:", error);
      }
    } else {
      console.log("Ya existen clientes en la base de datos.");
    }
  };