class AreaSchema {
    constructor(database) {
        this.database = database;
        this.entity = "area";
        this.collection = this.database.collection(this.entity);
    }

    async generateCollection() {
        try {
            await this.database.createCollection(this.entity, {
                capped: true,
                size: 16000,
                max: 10,
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        required: ["nombre", "aguacate"],
                        properties: {
                            nombre: {
                                bsonType: "string",
                            },
                            aguacate: {
                                bsonType: "number",
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
                    nombre: "prueba1",
                    aguacate: 1,
                },
                {
                    nombre: "prueba2",
                    aguacate: 2,
                },
            ]);
        } catch (error) {
            throw error;
        }
    }
}
export default AreaSchema;