
class UsersSchema{
    constructor(database) {
        this.database = database;
        this.entity = "users";
        this.collection = this.database.collection(this.entity);
    }

    async generateCollection() {
        try {
            await this.database.createCollection(this.entity, {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        additionalProperties: false,
                        required: ["nombre", "rol"],
                        properties: {
                            _id: {
                                bsonType: "objectId"
                            },
                            nombre: {
                                bsonType: "string"
                            },
                            rol: {
                                bsonType: "array",
                                items: {
                                    bsonType: "int"
                                }
                            },
                            permisos: {
                                bsonType: "object",
                                properties: {
                                    "/user": {
                                        bsonType: "array",
                                        items: {
                                            bsonType: "string",
                                            description: "ingrese la versión autorizada"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
        } catch (error) {
            throw error;
        }
    }

    async createData() {
        try {
            await this.collection.insertMany([
                {
                    nombre: "Brian",
                    rol: [1],
                    permisos: {
                        "/user": ["1.0.0"]
                    }
                },
                {
                    nombre: "Miguel",
                    rol: [2],
                    permisos: {
                        "/user": ["*"]
                    }
                }
            ])
        } catch (error) {
            throw error;
        }
    }
}
export default UsersSchema;