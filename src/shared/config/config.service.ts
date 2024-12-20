import * as dotenv from 'dotenv';
import * as joi from 'joi';

dotenv.config();

const schema = joi
  .object({
    PORT: joi.number().required(),
    FRONTEND_URL: joi.string().required(),
  })
  .unknown()
  .required();

const { error, value: envVars } = schema.validate(process.env);
if (error) {
  throw new Error(`ENV validation error: ${error.message}`);
}

export const config = {
  PORT: {
    APP_PORT: envVars.PORT,
  },
  FRONTEND_URL: envVars.FRONTEND_URL,
};
