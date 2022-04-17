import { Context, Status } from 'oak/mod.ts';

const ResponseHelper = {
	json: (
		context: Context,
		payload: unknown,
		status: Status = Status.OK,
	): Context => {
		context.response.headers.set('Content-Type', 'application/json');
		context.response.status = status;
		context.response.body = JSON.stringify(payload);
		return context;
	},
};

export default ResponseHelper;
