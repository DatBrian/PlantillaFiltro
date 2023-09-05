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
                bsonType: "date",
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
                    fecha_caducidad: new Date("01-30-2025")
                },
                {
                    nombre: "Acetaminofén",
                    cantidad: "50/mg",
                    unidades: 100,
                    precio: 2000,
                    proveedor: "Acetaminofén_proveedor",
                    fecha_caducidad: new Date("01-01-2023")
                },
                {
                    nombre: "Aspirina",
                    cantidad: "50/mg",
                    unidades: 49,
                    precio: 500,
                    proveedor: "Proveedor A",
                    fecha_caducidad: new Date("01-02-2024")
                }
            ])
        } catch (error) {
            throw new ClientError(`Error al generar la data de ${this.entity}, ${error.message}`);
        }
    }
}
export default MedicamentoSchema;