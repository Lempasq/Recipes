const Joi = require('@hapi/joi');

const clicksValidation = (data) => {

    const schema = Joi.object({
        clicks: Joi.number()
    })

    return schema.validate(data)
}

module.exports.clicksValidation = clicksValidation;
