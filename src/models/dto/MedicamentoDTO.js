import { check } from "express-validator";

check("nombre_medicamento")
    .notEmpty().withMessage("El campo nombre_medicamento es obligatorio")
    .isString().withMessage("El campo nombre_medicamento debe ser un string"),

check("cantidad_medicamento")
    .notEmpty().withMessage("El campo cantidad_medicamento es obligatorio")
    .isInt().withMessage("El campo cantidad_medicamento debe ser un integer"),

check("precio_unitario")
    .notEmpty().withMessage("El campo precio_unitario es obligatorio")
    .isInt().withMessage("El campo precio_unitario debe ser un integer")

check("proveedor_medicamento")
    .notEmpty().withMessage("El campo proveedor_medicamento es obligatorio")
    .isInt().withMessage("El campo proveedor_medicamento debe ser un integer")

check("caducidad")
    .notEmpty().withMessage("El campo caducidad es obligatorio")
    .isString().withMessage("El campo caducidad debe ser un string")