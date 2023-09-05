import ClientError from "../../utils/ClientError.js";

class EmpleadoSchema{

    constructor(database) {
        this.database = database;
        this.entity = "empleado";
        this.collection = database.collection(this.entity);
    }

    static properties() {
        return {
            _id: {
                bsonType: "objectId"
            },
            nombre: {
                bsonType: "string",
                description: "El campo nombre_empleado es obligatorio"
            },
            doc: {
                bsonType: "int",
                description: "El campo cc es obligatorio"
            },
            telefono: {
                bsonType: "string",
                description: "El campo telefono_empleado es obligatorio"
            },
            email: {
                bsonType: "string",
                description: "El campo email_empleado es obligatrio"
            },
            direccion: {
                bsonType: "string",
                description: "El campo direccion_empleado es obligatorio"
            },
            cargo: {
                bsonType: "string",
                description: "El campo cargo_empleado es obligatorio"
            },
            area: {
                bsonType: "string",
                description: "El campo area_empleado es obligatorio"
            },
            jornada: {
                bsonType: "string",
                description: "El campo jornada_empleado es obligatorio"
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
                            "nombre", "doc", "telefono", "email", "direccion", "cargo", "area", "jornada"
                        ],
                        properties: EmpleadoSchema.properties()
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
                    nombre: "Empleado Martinez",
                    doc: 635135153,
                    telefono: "+57 311 877 9881",
                    email: "empleado.martínez@gmail.com",
                    direccion: "calle 8",
                    cargo: "Vendedor",
                    area: "Comercial",
                    "jornada": "Mañana"
                },
                {
                    nombre: "Empleado Fernandez",
                    doc: 53153123,
                    telefono: "+57 351 384 5131",
                    email: "empleado.fernandez@gmail.com",
                    direccion: "calle 9",
                    cargo: "Cajero",
                    area: "Comercial",
                    "jornada": "Tarde"
                }
            ])
        } catch (error) {
            throw new ClientError(`Error al generar la data de ${this.entity}, ${error.message}`);
        }
    }
}
export default EmpleadoSchema;