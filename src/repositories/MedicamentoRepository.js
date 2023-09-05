import Connection from "../db/Connection.js";
import ClientError from "../utils/ClientError.js";

class MedicamentoRepository extends Connection {
    constructor() {
        super();
        this.entity = "medicamento";
        this.alias = {
                        "_id": 0,
                        "nombre_medicamento": "$nombre",
                        "cantidad_medicamento": "$cantidad",
                        "unidades_medicamento": "$unidades",
                        "precio_medicamento": "$precio",
                        "proveedor_medicamento": "$proveedor",
                        "caducidad_medicamento": "$fecha_caducidad"
                    }
    }

    async getAll() {
        try {
            await this.connect();
            return await this.getDatabase().collection(this.entity).aggregate([
                {
                    $project: this.alias
                }
            ]).toArray();
        } catch (error) {
            throw new ClientError(`Error al obtener ${this.entity}, ${error.message}`);
        } finally {
            this.close();
        }
    }

    async get50Stock() {
        try {
            await this.connect();
            const collection = this.getDatabase().collection(this.entity);

            return await collection.aggregate([
                {
                    $match: {
                        "unidades": { $lt: 50 }
                    }
                },
                {
                    $project: this.alias
                }
            ]).toArray();
        } catch (error) {
            throw new ClientError(`Error al obtener ${this.entity}, ${error.message}`);
        } finally {
            this.close();
        }
    }

    async getProveedorA() {
        try {
            await this.connect();
            const collection = this.getDatabase().collection(this.entity);

            return await collection.aggregate([
                {
                    $match: {
                        "proveedor": "Proveedor A"
                    }
                },
                {
                    $project: this.alias
                }
            ]).toArray();

        } catch (error) {
            throw new ClientError(`Error al obtener ${this.entity}, ${error.message}`);
        } finally {
            this.close();
        }
    }

    async getCaducaEnero() {
        try {
            await this.connect();
            const collection = this.getDatabase().collection(this.entity);

            return await collection.aggregate([
                {
                    $match: {
                        "fecha_caducidad": { $lt: new Date("2024-01-01") }
                    }
                },
                {
                    $project: this.alias
                }
            ]).toArray();

        } catch (error) {
            throw new ClientError(`Error al obtener ${this.entity}, ${error.message}`);
        } finally {
            this.close();
        }
    }

    async getMedicamentoCaro() {
        try {
            await this.connect();
            const collection = this.getDatabase().collection(this.entity);

            return await collection.aggregate([
                {
                    $project: this.alias
                }
            ]).sort(
                { "precio": 1}
            ).limit(1).toArray();

        } catch (error) {
            throw new ClientError(`Error al obtener ${this.entity}, ${error.message}`);
        } finally {
            this.close();
        }
    }

    async getCaduca2024() {
        try {
            await this.connect();
            const collection = this.getDatabase().collection(this.entity);
            return await collection.aggregate([
                {
                    $match: {
                        "fecha_caducidad": { $gt: new Date("2023-12-31"), $lt: new Date("2025-01-01") }
                    }
                },
                {
                    $project: this.alias
                }
            ]).toArray();
        } catch (error) {
            throw new ClientError(`Error al obtener ${this.entity}, ${error.message}`);
        } finally {
            this.close();
        }
    }

    async getPrecio50Stock100() {
        try {
            await this.connect();
            const collection = this.getDatabase().collection(this.entity);
            return await collection.aggregate([
                {
                    $match: {
                        "precio": { $gt: 50 },
                        "unidades": { $lt: 100 }
                    }
                },
                {
                    $project: this.alias
                }
            ]).toArray();
        } catch (error) {
            throw new ClientError(`Error al obtener ${this.entity}, ${error.message}`);
        } finally {
            this.close();
        }
    }

    async getProveedor50Stock() {
        try {
            await this.connect();
            const collection = this.getDatabase().collection(this.entity);
            return await collection.aggregate([
                {
                    $match: {
                        "unidades": { $lt: 50 }
                    }
                },
                {
                    $project: {
                        "_id": 0,
                        "proveedor_medicamento": "$proveedor"
                    }
                }
            ]).toArray();
        } catch (error) {
            throw new ClientError(`Error al obtener ${this.entity}, ${error.message}`);
        } finally {
            this.close();
        }
    }
}
export default MedicamentoRepository;
