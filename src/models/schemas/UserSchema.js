import bcrypt from "bcryptjs";
import Connection from "../../db/Connection.js";

class UserSchema {
    constructor(database) {
        this.database = database;
        this.entity = "user";
        this.Collection = database.collection(this.entity);
    }

    static registerProperties(){
        return{
            registerProperties
        }
    }

    static properties(){
        return {
           properties
        };
    }

    async generateCollection() {
        try {
          createSquema
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
         insertData
        } catch (error) {
            throw error;
        }
    }
}
export default UserSchema;
