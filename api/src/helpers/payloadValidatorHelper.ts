import Ajv from 'ajv/';
import { Schema } from 'lib/schemas/index.ts';

const ajv = new Ajv({ allErrors: true });

const PayloadValidatorHelper = {
	json: (payload: unknown, schema: Schema) => {
		const validate = ajv.compile(schema);

		validate(payload);

		if (validate.errors) {
			console.log(validate.errors);
			throw new Error('Invalid payload content.');
		}
	},
};

export default PayloadValidatorHelper;
