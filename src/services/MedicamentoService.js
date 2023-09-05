import MedicamentoRepository from "../repositories/MedicamentoRepository.js";
import ClientError from "../utils/ClientError.js";

class MedicamentoService {
    constructor() {
        this.repository = new MedicamentoRepository();
    }

    async getAll() {
        try {
            return await this.repository.getAll();
        } catch (error) {
           throw new ClientError(`Error en el servicio, ${error.message}`)
        }
    }

    async get50Stock() {
        try {
            return await this.repository.get50Stock();
        } catch (error) {
            throw new ClientError(`Error en el servicio, ${error.message}`)
        }
    }

    async getProveedorA() {
        try {
            return await this.repository.getProveedorA();
        } catch (error) {
            throw new ClientError(`Error en el servicio, ${error.message}`)
        }
    }

    async getCaducaEnero() {
        try {
            return await this.repository.getCaducaEnero();
        } catch (error) {
            throw new ClientError(`Error en el servicio, ${error.message}`)
        }
    }

    async getMedicamentoCaro() {
        try {
            return await this.repository.getMedicamentoCaro();
        } catch (error) {
            throw new ClientError(`Error en el servicio, ${error.message}`)
        }
    }

    async getCaduca2024() {
        try {
            return await this.repository.getCaduca2024();
        } catch (error) {
            throw new ClientError(`Error en el servicio, ${error.message}`)
        }
    }

    async getPrecio50Stock100() {
        try {
            return await this.repository.getPrecio50Stock100();
        } catch (error) {
            throw new ClientError(`Error en el servicio, ${error.message}`)
        }
    }

    async getProveedor50Stock() {
        try {
            return await this.repository.getProveedor50Stock();
        } catch (error) {
            throw new ClientError(`Error en el servicio, ${error.message}`)
        }
    }

}
export default MedicamentoService;
