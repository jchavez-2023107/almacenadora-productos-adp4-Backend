import Clients from "./client.model.js"
/**
 * Crear nuevo cliente 
 */

export const createClient = async (req, res) => {
    try{
        const{name,contact,company,product,phone} = req.body;

        const newClient = new Clients({name,contact,company,product,phone});
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