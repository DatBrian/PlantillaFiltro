import bcrypt from "bcryptjs";
import Connection from "../../db/Connection.js";

class UserSchema {
    constructor(database) {
        this.database = database;
        this.entity = "user";
        this.collection = database.collection(this.entity);
    }

    static registerProperties(){
        return{
            _id: {
               bsonType: "objectId"
            },
            user: {
                bsonType: "string"
            },
            contraseña: {
                bsonType: "string"
            }
        }
    }

    static properties(){
        return {
            _id: {
                bsonType: "objectId"
            },
            user: {
                bsonType: "string"
            },
            contraseña: {
                bsonType: "string"
            },
            roles: {
                bsonType: "array",
                items: {
                    bsonType: "string"
                }
            },
            permisos: {
                bsonType: "object",
                properties: {
                    "/api/medicamento": {
                        bsonType: "array",
                        items: {
                            bsonType: "string"
                        }
                    }
                }
            }
        };
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
                        additionalProperties: false,
                        required: ["user", "contraseña", "roles", "permisos"],
                        properties: UserSchema.properties
                    }
                }
          })
        } catch (error) {
            throw error;
        }
    }

    static async encryptPassword(password) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    static async matchPassword(password, userPassword) {
        return await bcrypt.compare(password, userPassword);
    }

    static async findUser(username){
        const connection = new Connection();
        try {
            await connection.connect();
            const exist = await connection.getDatabase().collection("user").findOne({"user": username});
            return exist ? true : false;
        } catch (error) {
            throw error;
        }finally{
            connection.close()
        }
    }

    static async createUser(user){
        const connection = new Connection();
        try {
            await connection.connect();
            const encryptedPassword = await this.encryptPassword(user.contraseña);
            const newUser = {
                user: user.user,
                contraseña: encryptedPassword,
                rol:user.rol,
                permisos: user.permisos
            };
            await connection.getDatabase().collection("user").insertOne(newUser);
            const response = {
                status: 200,
                message: "Usuario registrado correctamente",
                user: newUser
            }
            return response
        } catch (error) {
            throw error;
        }finally{
            connection.close()
        }
    }

    //! Es tamal
    async createData() {
        try {
            await this.collection.insertMany([
                {
                    user: "Miguel",
                    contraseña: await UserSchema.encryptPassword("miguel"),
                    roles: [
                        "admin"
                    ],
                    permisos: {
                        "/api/medicamento": [
                            "1.0.0",
                            "1.0.1",
                            "1.0.2",
                            "1.0.3",
                            "1.0.4",
                            "1.0.5",
                            "1.1.0"
                        ]
                    }
                }
         ])
        } catch (error) {
            throw error;
        }
    }
}
export default UserSchema;
