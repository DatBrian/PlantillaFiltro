import ClientError from "../../utils/ClientError.js";

class PacienteSchema{

    constructor(database) {
        this.database = database;
        this.entity = "paciente";
        this.collection = database.collection(this.entity);
    }

    static properties() {
        return {
            _id: {
                bsonType: "objectId"
            },
            nombre: {
                bsonType: "string",
                description: "El campo nombre_paciente es obligatorio"
            },
            doc: {
                bsonType: "int",
                description: "El campo cc es obligatorio"
            },
            telefono: {
                bsonType: "string",
                description: "El campo telefono_paciente es obligatorio"
            },
            email: {
                bsonType: "string",
                description: "El campo email_paciente es obligatrio"
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
                            "nombre", "telefono", "email",
                        ],
                        properties: PacienteSchema.properties()
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
                    nombre: "Paciente Martínez",
                    telefono: "+57 311 877 9881",
                    email: "dr.martínez@gmail.com",
                },
                {
                    nombre: "Paciente Fernandez",
                    telefono: "+57 351 384 5131",
                    email: "dr.fernandez@gmail.com"
                }
            ])
        } catch (error) {
            throw new ClientError(`Error al generar la data de ${this.entity}, ${error.message}`);
        }
    }
}
export default PacienteSchema;