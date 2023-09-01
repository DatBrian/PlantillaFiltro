import AreaRepository from "../repositories/AreaRepository.js";

class AreaService{
    constructor(){
        this.repository = new AreaRepository()
    }

    async getAll(){
        try {
            return await this.repository.getAll();
        } catch (error) {
            console.error("Error al obtener las areas S", error);
            throw error
        }
    }
}
export default AreaService;