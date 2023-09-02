import AutoincrementSchema from "./AutoincrementSchema.js";

class RolesSchema {
    constructor(database) {
        this.database = database;
        this.entity = "roles";
        this.collection = this.database.collection(this.entity);
    }

    async generateCollection() {
        try {
            await this.database.createCollection(this.entity, {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        additionalProperties: false,
                        required: ["id", "nombre"],
                        properties: {
                            _id: {
                                bsonType: "objectId",
                            },
                            id: {
                                bsonType: "int",
                            },
                            nombre: {
                                bsonType: "string",
                            },
                        },
                    },
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async createData() {
        try {
            await this.collection.insertMany([
                {
                    id: Number(
                        await new AutoincrementSchema(this.database).increment(
                            "rol"
                        )
                    ),

                    nombre: "admin",
                },
                {
                    id: Number(
                        await new AutoincrementSchema(this.database).increment(
                            "rol"
                        )
                    ),

                    nombre: "user",
                },
            ]);
        } catch (error) {
            throw error;
        }
    }
}
export default RolesSchema;
