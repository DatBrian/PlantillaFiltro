import MedicamentoService from "../../services/MedicamentoService.js";
import MedicamentosService from "../../services/MedicamentoService.js";
import resError from "../../utils/ResError.js";

class MedicamentosController {
    async getAll(_req, res) {
        try {
            const Medicamentoss = await new MedicamentosService().getAll();
            res.json(Medicamentoss);
        } catch (error) {
            resError(res, 400, error.message);
        }
    }

    async get50Stock(_req, res) {
        try {
            const medicamentos = await new MedicamentosService().get50Stock();
            res.json(medicamentos);
        } catch (error) {
            resError(res, 400, error.message);
        }
    }

    async getProveedorA(_req, res) {
        try {
            const medicamentos = await new MedicamentoService().getProveedorA();
            res.json(medicamentos);
        } catch (error) {
            resError(res, 400, error.message);
        }
    }

    async getCaducaEnero(_req, res) {
        try {
            const medicamentos = await new MedicamentoService().getCaducaEnero();
            res.json(medicamentos);
        } catch (error) {
            resError(res, 400, error.message);
        }
    }

    async getMedicamentoCaro(_req, res) {
        try {
            const medicamentos = await new MedicamentoService().getMedicamentoCaro();
            res.json(medicamentos)
        } catch (error) {
            resError(res, 400, error.message);
        }
    }

    async getCaduca2024(_req, res) {
        try {
            const medicamentos = await new MedicamentoService().getCaduca2024();
            res.json(medicamentos);
        } catch (error) {
            resError(res, 400, error.message);
        }
    }

    async getPrecio50Stock100(_req, res) {
        try {
            const medicamentos = await new MedicamentoService().getPrecio50Stock100();
            res.json(medicamentos)
        } catch (error) {
            resError(res, 400, error.message);
        }
    }

    async getProveedor50Stock(_req, res) {
        try {
            const proveedores = await new MedicamentoService().getProveedor50Stock();
            res.json(proveedores);
        } catch (error) {
            resError(res, 400, error.message);
        }
    }
}
export default MedicamentosController;
