import nconf from 'nconf';

export default function setEnvironment() {
  const params = process.argv.filter((a) => a.startsWith("env="));
  if (!params || params.length < 0) {
    throw Error("Please provide the environment as a param. like:[env=dev]");
  }
  const env = params[0].split('=')[1];
  console.log("Environment: ", env);
  nconf.set('NODE_ENV', env);
  let envFile = './config/dev.json';
  switch (env.toLowerCase()) {
    case 'dev':
      envFile = './config/dev.json';
      break;
    default:
      envFile = './config/dev.json';
      break;
  }
  nconf.file({ file: envFile });
}