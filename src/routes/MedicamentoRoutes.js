import routesVersioning from "express-routes-versioning";
import MedicamentoController from "../api/version1/MedicamentoController.js";
import { Router } from "express";
// import { dsDTO } from "../models/dto/dDTO.js";
import ValidateDTOMiddleware from "../middlewares/ValidateDTOMiddleware.js";
import { limitUsuario } from "../helpers/LimitHelper.js";
import PassportHelper from "../helpers/PassportHelper.js";

class MedicamentoRoutes {
    constructor() {
        this.path = "/medicamento";
        this.router = Router();
        this.controller = new MedicamentoController();
        this.version = routesVersioning();
        this.initRoutes();
    }

    async initRoutes() {
        // this.router.use(
        //     limitUsuario(),
        //     PassportHelper.authenticate("bearer", { session: false })
        // );
        this.router.get(
            `/all`,
            this.version({
                "1.0.0": this.controller.getAll,
                "1.0.1": this.controller.get50Stock,
                "1.0.2": this.controller.getProveedorA,
                "1.0.3": this.controller.getCaducaEnero,
                "1.0.4": this.controller.getCaduca2024,
                "1.0.5": this.controller.getPrecio50Stock100,
                "1.1.0": this.controller.getProveedor50Stock
            })
        );
        this.router.get(
            "/one",
            this.version({
                "1.0.0": this.controller.getMedicamentoCaro
            })
        )
    }
}
export default MedicamentoRoutes;