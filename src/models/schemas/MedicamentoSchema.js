import ClientError from "../../utils/ClientError.js";

class MedicamentoSchema{

    constructor(database) {
        this.database = database;
        this.entity = "medicamento";
        this.collection = database.collection(this.entity);
    }

    static properties() {
        return {
            _id: {
                bsonType: "objectId"
            },
            nombre:{
                bsonType: "string",
                description: "El campo nombre_medicamento es obligatorio"
            },
            cantidad: {
                bsonType: "string",
                description: "El campo cantidad_medicamento es obligatorio"
            },
            unidades: {
                bsonType: "number",
                description: "El campo unidades_disponibles es obligatorio"
            },
            precio: {
                bsonType: "number",
                description: "El campo precio_unitario es obligatrio"
            },
            proveedor: {
                bsonType: "string",
                description: "El campo proveedor_medicamento es obligatorio"
            },
            fecha_caducidad: {
                bsonType: "string",
                description: "El campo caducidad es obligatorio"
            }
        }
    }

    async generateCollection() {
        try {
            await this.database.createCollection(this.entity, {
                capped: true,
                size: 16000,
                max: 50,
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        additionalProperties: false,
                        required: [
                            "nombre", "cantidad", "unidades", "precio", "proveedor", "fecha_caducidad"
                        ],
                        properties: MedicamentoSchema.properties()
                    }
                }
            })
        } catch (error) {
            throw new ClientError(`Error al generar la coleccción: ${this.entity}, ${error.message}`);
        }
    }

    async createData() {
        try {
            await this.collection.insertMany([
                {
                    nombre: "Paracetamol",
                    cantidad: "50/mg",
                    unidades: 50,
                    precio: 5000,
                    proveedor: "Paracetamol_proveedor",
                    fecha_caducidad: "30-01-2024"
                },
                {
                    nombre: "Acetaminofén",
                    cantidad: "50/mg",
                    unidades: 100,
                    precio: 2000,
                    proveedor: "Acetaminofén_proveedor",
                    fecha_caducidad: "30-01-2025"
                }
            ])
        } catch (error) {
            throw new ClientError(`Error al generar la data de ${this.entity}, ${error.message}`);
        }
    }
}
export default MedicamentoSchema;