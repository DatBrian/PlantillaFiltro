import ClientError from "../../utils/ClientError.js";

class DoctorSchema{

    constructor(database) {
        this.database = database;
        this.entity = "doctor";
        this.collection = database.collection(this.entity);
    }

    static properties() {
        return {
            _id: {
                bsonType: "objectId"
            },
            nombre:{
                bsonType: "string",
                description: "El campo nombre_doctor es obligatorio"
            },
            doc: {
                bsonType: "number",
                description: "El campo cc es obligatorio"
            },
            telefono: {
                bsonType: "string",
                description: "El campo cantidad_doctor es obligatorio"
            },
            email: {
                bsonType: "string",
                description: "El campo precio_unitario es obligatrio"
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
                            "nombre", "doc", "telefono", "email",
                        ],
                        properties: DoctorSchema.properties()
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
                    nombre: "Dr.Martínez",
                    doc: 1203141412,
                    telefono: "+57 311 877 9881",
                    email: "dr.martínez@gmail.com",
                },
                {
                    nombre: "Dr.Fernandez",
                    doc: 2313124214,
                    telefono: "+57 351 384 5131",
                    email: "dr.fernandez@gmail.com"
                }
            ])
        } catch (error) {
            throw new ClientError(`Error al generar la data de ${this.entity}, ${error.message}`);
        }
    }
}
export default DoctorSchema;