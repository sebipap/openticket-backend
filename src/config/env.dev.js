const dotenv = require("dotenv");

dotenv.config();

const audience = process.env.AUTH0_AUDIENCE;
const domain = process.env.AUTH0_DOMAIN;
const serverPort = process.env.SERVER_PORT;
const clientOriginUrl = process.env.CLIENT_ORIGIN_URL;
const dbURL = process.env.DATABASE_URL;
const nodeEnviroment = process.env.NODE_ENV;

if (!audience) {
  throw new Error(
    ".env is missing the definition of an AUTH0_AUDIENCE environmental variable"
  );
}

if (!domain) {
  throw new Error(
    ".env is missing the definition of an AUTH0_DOMAIN environmental variable"
  );
}

if (!serverPort) {
  throw new Error(
    ".env is missing the definition of a API_PORT environmental variable"
  );
}

if (!clientOriginUrl) {
  throw new Error(
    ".env is missing the definition of a APP_ORIGIN environmental variable"
  );
}

const clientOrigins = [
  "http://localhost:3000",
  "https://192.168.1.60:3000",
  "http://127.0.0.1:5500",
  "http://localhost:5000",
  "http://192.168.1.60:5000/",
  "http://127.0.0.1:3000",
  "localhost:5000",
  "https://sebipap.github.io/openticket.github.io/"
];

module.exports = {
  audience,
  domain,
  serverPort,
  clientOriginUrl,
  clientOrigins,
  dbURL,
  nodeEnviroment,
};
