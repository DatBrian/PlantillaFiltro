import UserSchema from "./UserSchema.js";
import MedicamentoSchema from "./MedicamentoSchema.js";
import DoctorSchema from "./DoctorSchema.js";
import PacienteSchema from "./PacienteSchema.js";
import EmpleadoSchema from "./EmpleadoSchema.js";
import ProveedorSchema from "./ProveedorSchema.js";
import RecetaSchema from "./RecetasSchema.js";
import MovimientoSchema from "./MovimientoSchema.js";

const schemas = [
    MedicamentoSchema,
    DoctorSchema,
    PacienteSchema,
    EmpleadoSchema,
    ProveedorSchema,
    RecetaSchema,
    MovimientoSchema
]

export {schemas}