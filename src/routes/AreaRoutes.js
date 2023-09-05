import routesVersioning from "express-routes-versioning";
import AreaController from "../api/version1/AreaController.js";
import { Router } from "express";
import ValidationDTOMiddleware from "../middlewares/ValidateDTOMiddleware.js";
import { AreasDTO } from "../models/dto/AreaDTO.js";
import ValidateDTOMiddleware from "../middlewares/ValidateDTOMiddleware.js";

class AreaRoutes {
    constructor() {
        this.path = "/area";
        this.router = Router();
        this.controller = new AreaController();
        this.version = routesVersioning();
        this.initRoutes();
    }

    async initRoutes() {
        this.router.use(
            limitUsuario(),
            passportHelper.authenticate("bearer", { session: false })
        );
        this.router.get(
            `${this.path}/all`,
            this.version({
                "1.0.0": this.controller.getAll,
            })
        );
        this.router.post(
            `${this.path}/insert`,
            new ValidateDTOMiddleware(AreasDTO, AreasSchema.properties).validate(),
            (req, res) => {
                this.version({
                    "1.0.0": this.controller.insertOne(req, res),
                });
            }
        );
    }
}
export default AreaRoutes;
