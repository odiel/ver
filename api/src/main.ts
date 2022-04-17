import { Application, isHttpError, Status } from 'oak/mod.ts';
import { APPLICATION_HOSTNAME, APPLICATION_PORT } from 'lib/constants.ts';
import router from 'src/router.ts';

const app = new Application();

//logger
app.use(async (ctx, next) => {
	await next();
	const rt = ctx.response.headers.get('X-Response-Time');
	console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.response.headers.set('X-Response-Time', `${ms}ms`);
});

app.use((ctx, next) => {
	ctx.response.headers.set('Access-Control-Allow-Origin', '*');
	ctx.response.headers.set('Access-Control-Allow-Headers', '*');
	ctx.response.headers.set('Access-Control-Allow-Methods', '*');
	return next();
});

app.use(async (context, next) => {
	try {
		await next();
	} catch (err) {
		if (isHttpError(err)) {
			context.response.status = err.status;
			context.response.body = {
				error: { message: err.message, code: 400 },
			};
			context.response.headers.set('Content-type', 'application/json');
		} else {
			context.response.status = 500;
			context.response.body = {
				error: { message: err.message, code: 500 },
			};
			context.response.headers.set('Content-type', 'application/json');
		}
	}
});

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('listen', ({ hostname, port, secure }) => {
	console.log(
		`Listening on: ${secure ? 'https://' : 'http://'}${
			hostname ??
				'localhost'
		}:${port}`,
	);
});

await app.listen({ hostname: APPLICATION_HOSTNAME, port: APPLICATION_PORT });
