const Joi = require('@hapi/joi')

const options = { abortEarly: false }
const rules = {
	email: Joi.string().email().required(),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
	name: Joi.string().required(),
}

const accountSignIn = (req, res, next) => {
	const { email, password } = req.body

	const schema = Joi.object({
		email: rules.email,
		password: rules.password,
	})

	const { error } = schema.validate({ email, password }, options)

	if (error) {
		const messages = getValidatorError(error, 'account.signin')
		return res.jsonBadRequest(null, null, { error: messages })
	}

	next()
}

const accountSignUp = (req, res, next) => {
	const { email, password, name } = req.body

	const schema = Joi.object({
		email: rules.email,
		password: rules.password,
		name: rules.name,
	})

	const { error } = schema.validate({ email, password, name }, options)

	if (error) {
		const messages = getValidatorError(error, 'account.signup')
		return res.jsonBadRequest(null, null, { error: messages })
	}

	next()
}

module.exports = { accountSignUp, accountSignIn }
