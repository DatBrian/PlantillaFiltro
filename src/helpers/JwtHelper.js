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
            this.database = this.getDatabase();
            if (Object.keys(req.body).length === 0) {
                resError(res, 400, "No se enviaron datos");
                return;
            }
            const result = await this.database.collection(this.entity).findOne(req.body);

            if (!result) {
                resError(res, 400, "Usuario no encontrado");
                return
            }

            const encoder = new TextEncoder();
            const id = result._id.toString();
            const jwtConstructor = await new SignJWT({ id: id })
                .setProtectedHeader({ alg: "HS256", typ: "JWT" })
                .setIssuedAt()
                .setExpirationTime("3h")
                .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

            req.data = { status: 200, message: jwtConstructor };
            next();
        } catch (error) {}
    }

    async validateToken(req, token) {
        try {
                        this.database = this.getDatabase();
            const encoder = new TextEncoder();
            const jwtData = await jwtVerify(
                token,
                encoder.encode(process.env.JWT_PRIVATE_KEY)
            );

            const res = await this.database.collection(this.entity).findOne({
                _id: new ObjectId(jwtData.payload.id),
                [`permisos.${req.baseUrl}`]: `${req.headers["accept-version"]}`
            });

            const { _id, permisos, ...usuario } = res;
            return usuario;
        } catch (error) {
            return false;
        }
    }
}
export default Auth;