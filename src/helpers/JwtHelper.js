import { SignJWT, jwtVerify } from "jose";
import Connection from "../db/Connection.js";
import resError from "../utils/ResError.js";
import { ObjectId } from "mongodb";

class Auth extends Connection{
    constructor() {
        this.database = null;
        this.entity = "usuarios";
    }

    async createToken(req, res, next) {
       try {
           const connection = new Connection();
           await connection.connect();
           const conexionDB = await connection.getDatabase();

           console.log(req.body);

           if (Object.keys(req.body).length === 0) {
               return res.status(400).send({ message: "Datos no enviados" });
           }

           const result = await conexionDB.collection("user").findOne(req.body);
           console.log(result);

           if (!result) {
               return res
                   .status(401)
                   .send({ message: "Usuario no encontrado" });
           }

           const encoder = new TextEncoder();
           const id = result._id.toString();

           const jwtConstructor = await new SignJWT({ id: id })
               .setProtectedHeader({ alg: "HS256", typ: "JWT" })
               .setIssuedAt()
               .setExpirationTime("3h")
               .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

           req.data = {
               status: 200,
               message: "Usuario enconrado!! Toma tu token :D",
               token: jwtConstructor,
           };
           next();
       } catch (error) {
           // Manejo de errores aquí
           console.error("Error de conexión a la base de datos:", error);
           return res
               .status(500)
               .send({ message: "Error interno del servidor" });
       }
    }

    async validateToken(req, token) {
 try {
     const connection = new Connection();
     await connection.connect();
     const conexionDB = await connection.getDatabase();
     console.log(req.baseUrl);
     const encoder = new TextEncoder();
     const jwtData = await jwtVerify(
         token,
         encoder.encode(process.env.JWT_PRIVATE_KEY)
     );
     console.log({
         _id: new ObjectId(jwtData.payload.id),
         [`permisos.${req.baseUrl}`]: `${req.headers["accept-version"]}`,
     });
     let res = await conexionDB.collection("user").findOne({
         _id: new ObjectId(jwtData.payload.id),
         [`permisos.${req.baseUrl}`]: `${req.headers["accept-version"]}`,
     });

     let { _id, permisos, ...usuario } = res;
     return usuario;
 } catch (error) {
     return false;
 }
    }
}
export default Auth;