import routesVersioning from "express-routes-versioning";
import AreaController from "../api/version1/AreaController.js";
import { Router } from "express";

class AreaRoutes{
    constructor(){
        this.path = "/area";
        this.router = Router();
        this.controller = new AreaController();
        this.version =  routesVersioning();
        this.initRoutes();    
    }

    async initRoutes() {
        try {            
            this.router.get(`${this.path}/all`, this.version({
                "1.0.0": this.controller.getAll
            }));
        } catch (error) {
            console.error("Error en las rutas");
            throw error;
        }
    }
}
export default AreaRoutes;