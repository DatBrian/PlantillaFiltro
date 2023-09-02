import AreaService from "../../services/AreaService.js";

class AreaController {
    async getAll(_req, res) {
        console.log("controller");
        try {
            const areas = await new AreaService().getAll();
            res.json(areas);
        } catch (error) {
            console.error("Ocurrió un error al obtener las areas C", error);
            throw error.message;
        }
    }

    async insertOne(req, res) {
        try {
            const body = req.body;
            const response = await new AreaService().insertOne(body);
            res.json(response);
        } catch (error) {
            throw error.message;
        }
    }
}
export default AreaController;
