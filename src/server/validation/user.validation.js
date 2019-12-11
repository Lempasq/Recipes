const Joi = require('@hapi/joi');

const registerValidation = (data) => {

    const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(30)
            .trim()
            .required(),
        email: Joi.string()
            .min(1)
            .max(255)
            .required()
            .trim()
            .email(),
        password: Joi.string()
            .min(6)
            .max(1024)
            .trim()
            .required()
    });

    return schema.validate(data)
}

const loginValidation = (data) => {

    const schema = Joi.object({
        username: Joi.string()
            .min(3)
            .max(30)
            .trim(),
        email: Joi.string()
            .min(1)
            .max(255)
            .trim()
            .email(),
        password: Joi.string()
            .min(6)
            .max(1024)
            .trim()
            .required()
    });

    return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
