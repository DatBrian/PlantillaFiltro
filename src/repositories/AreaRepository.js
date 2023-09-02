import Connection from "../db/Connection.js";

class AreaRepository extends Connection {
    constructor() {
        super();
        this.entity = "area";
    }

    async getAll() {
        try {
            await this.connect();
            return "consulta get"
        } catch (error) {
            console.error("Ocurrió un error al obtener las areas");
            throw error.message;
        } finally {
            this.close();
        }
    }

    async insertOne(body) {
        try {
            await this.connect();
            "consulta post"
            return `${this.entity} Inserted successfully`;
        } catch (error) {
            throw error.message;
        } finally {
            this.close();
        }
    }
}
export default AreaRepository;
