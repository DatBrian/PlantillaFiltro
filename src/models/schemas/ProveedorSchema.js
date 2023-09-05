import ClientError from "../../utils/ClientError.js";

class ProveedorSchema{

    constructor(database) {
        this.database = database;
        this.entity = "proveedor";
        this.collection = database.collection(this.entity);
    }

    static properties() {
        return {
            _id: {
                bsonType: "objectId"
            },
            nombre: {
                bsonType: "string",
                description: "El campo nombre_proveedor es obligatorio"
            },
            telefono: {
                bsonType: "string",
                description: "El campo telefono_proveedor es obligatorio"
            },
            email: {
                bsonType: "string",
                description: "El campo email_proveedor es obligatrio"
            },
            tipo: {
                bsonType: "string",
                description: "El campo direccion_proveedor es obligatorio"
            },
            descripcion: {
                bsonType: "string",
                description: "El campo cargo_proveedor es obligatorio"
            },
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
                            "nombre", "telefono", "email", "descripcion", "tipo"
                        ],
                        properties: ProveedorSchema.properties()
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
                    nombre: "Proveedor Martinez",
                    telefono: "+57 311 877 9881",
                    email: "proveedor.martínez@gmail.com",
                    descripcion: "Vende barato",
                    tipo: "Mayorista"
                },
                {
                    nombre: "Proveedor Fernandez",
                    telefono: "+57 351 384 5131",
                    email: "proveedor.fernandez@gmail.com",
                    descripcion: "Vende bueno",
                    tipo: "Internacional"
                }
            ])
        } catch (error) {
            throw new ClientError(`Error al generar la data de ${this.entity}, ${error.message}`);
        }
    }
}
export default ProveedorSchema;