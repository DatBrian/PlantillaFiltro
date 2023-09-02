import { check, validationResult } from "express-validator";

class ValidateDTOMiddleware {
    constructor(dto) {
        this.dto = dto;
    }

    validate() {
        return async (req, res, next) => {
            await Promise.all(this.dto.map((field) => field.run(req)));
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        };
    }
}

export default ValidateDTOMiddleware;
