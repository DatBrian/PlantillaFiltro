import ClientError from "../../utils/ClientError.js";

class RecetaSchema{

    constructor(database) {
        this.database = database;
        this.entity = "receta";
        this.collection = database.collection(this.entity);
    }

    static properties() {
        return {
            _id: {
                bsonType: "objectId"
            },
            doctor: {
                bsonType: "string",
                description: "El campo doctor_receta es obligatorio"
            },
            fecha_emision: {
                bsonType: "string",
                description: "El campo emision_receta es obligatorio"
            },
            paciente: {
                bsonType: "string",
                description: "El campo paciente_receta es obligatorio"
            },
            prescripcion: {
                bsonType: "string",
                description: "El campo prescripcion_receta es obligatorio"
            },
            medicamentos: {
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
                            "doctor", "fecha_emision", "paciente", "prescripcion", "medicamentos"
                        ],
                        properties: RecetaSchema.properties()
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
                    doctor: "Doctor Martínez",
                    fecha_emision: "30-02-2023",
                    paciente: "Paciente Martínez",
                    prescripcion: "El paciente debe tomarse 2 tabletas por día",
                    medicamentos: [
                        {
                            nombre: "Paracetamol",
                            cantidad: "50/mg"
                        }
                    ]
                },
                {
                    doctor: "Doctor Fernandez",
                    fecha_emision: "20-10-2023",
                    paciente: "Paciente Fernandez",
                    prescripcion: "El paciente debe tomarse 1 tableta cada 4 horas",
                    medicamentos: [
                        {
                            nombre: "Acetaminofém",
                            cantidad: "50/mg"
                        }
                    ]
                }
            ])
        } catch (error) {
            throw new ClientError(`Error al generar la data de ${this.entity}, ${error.message}`);
        }
    }
}
export default RecetaSchema;