import ClientError from "../../utils/ClientError.js";

class MovimientoSchema{

    constructor(database) {
        this.database = database;
        this.entity = "movimiento";
        this.collection = database.collection(this.entity);
    }

    static properties() {
        return {
            _id: {
                bsonType: "objectId"
            },
            tipo: {
                bsonType: "string",
                description: "El campo doctor_movimiento es obligatorio"
            },
            vendedor: {
                bsonType: "string",
                description: "El campo emision_movimiento es obligatorio"
            },
            comprador: {
                bsonType: "string",
                description: "El campo paciente_movimiento es obligatorio"
            },
            descripcion: {
                bsonType: "string",
                description: "El campo prescripcion_movimiento es obligatorio"
            },
            fecha: {
                bsonType: "string",
                description: "EL campo date es obligatorio"
            },
            medicamento: {
                bsonType: "array",
                items: {
                    bsonType: "object",
                    required: [
                        "nombre", "cantidad"
                    ],
                    properties: {
                        nombre: {
                            bsonType: "string",
                        },
                        cantidad: {
                            bsonType: "string"
                        }
                    }
                }
            },
            cantidad: {
                bsonType: "string",
                description: "El campo cantidad_movimiento es obligatorio"
            },
            unidades: {
                bsonType: "number",
                description: "El campo unidades_movimiento es obligatorio"
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
                            "tipo", "vendedor", "comprador", "descripcion", "fecha", "medicamento", "unidades"
                        ],
                        properties: MovimientoSchema.properties()
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
                    tipo: "Compra",
                    vendedor: "Proveedor Martínez",
                    comprador: "farmacia",
                    descripcion: "Gran compra de paracetamol",
                    fecha: "10-12-2023",
                    medicamento: [
                        {
                            nombre: "Paracetamol",
                            cantidad: "50/mg"
                        }
                    ],
                    unidades: 50
                },
                {
                    tipo: "Venta",
                    vendedor: "Empleado Martínez",
                    comprador: "Paciente Fernandez",
                    descripcion: "Venta de acetaminofém",
                    fecha: "10-12-2023",
                    medicamento: [
                        {
                            nombre: "Acetaminofém",
                            cantidad: "50/mg"
                        }
                    ],
                    unidades: 25
                }
            ])
        } catch (error) {
            throw new ClientError(`Error al generar la data de ${this.entity}, ${error.message}`);
        }
    }
}
export default MovimientoSchema;