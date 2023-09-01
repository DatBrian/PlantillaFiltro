import Connection from "../db/Connection.js";

class AreaRepository extends Connection{
    constructor(){
        super();
        this.entity = "area";
    }

    async getAll(){
        try {
            await this.connect();
            return "realiza la consulta aqui"
        } catch (error) {
            console.error("Ocurrió un error al obtener las areas");
            throw error.message;
        }finally{
            this.close();
        }
    }
}
export default AreaRepository;