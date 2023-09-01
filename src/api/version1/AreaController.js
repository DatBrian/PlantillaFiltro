import AreaService from "../../services/AreaService.js";

class AreaController{

    async getAll(_req, res){
        try {
            const areas = await new AreaService().getAll();
            res.json(areas);
        } catch (error) {
            console.error("Ocurrió un error al obtener las areas C", error);
            throw error.message;
        }
    }
}
export default AreaController;