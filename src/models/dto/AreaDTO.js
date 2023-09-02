import { check } from "express-validator";

export const AreasDTO = [
    check("nombre")
        .notEmpty()
        .withMessage("El campo nombre es obligatorio")
        .isString()
        .withMessage("El campo nombre debe ser un string")
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ,.#@\\s-]+$/)
        .withMessage("Solo admite letras"),

    check("aguacate")
        .notEmpty()
        .withMessage("El campo aguacate es obligatorio")
        .isNumeric()
        .withMessage("El campo aguacate debe ser un número"),
];
