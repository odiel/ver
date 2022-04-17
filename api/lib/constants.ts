export const APPLICATION_HOSTNAME = '0.0.0.0';
export const APPLICATION_PORT = 8000;
export const APPLICATION_ENVIRONMENT = Deno.env.get('DENO_ENV') || 'dev';
