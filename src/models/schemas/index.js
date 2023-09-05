import AutoincrementSchema from "./AutoincrementSchema.js";
import RolesSchema from "./RolesSchema.js";
// import UserSchema from "./UserSchema.js";
import MedicamentoSchema from "./MedicamentoSchema.js";
import DoctorSchema from "./DoctorSchema.js";
import PacienteSchema from "./PacienteSchema.js";
import EmpleadoSchema from "./EmpleadoSchema.js";
import ProveedorSchema from "./ProveedorSchema.js";
import RecetaSchema from "./RecetasSchema.js";
import MovimientoSchema from "./MovimientoSchema.js";

const schemas = [
    AutoincrementSchema,
    RolesSchema,
    // UserSchema,
    MedicamentoSchema,
    DoctorSchema,
    PacienteSchema,
    EmpleadoSchema,
    ProveedorSchema,
    RecetaSchema,
    MovimientoSchema
]

export {schemas}