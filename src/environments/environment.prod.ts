import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product: 'https://dzn1c90duj.execute-api.us-east-1.amazonaws.com',
    order: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://4x1dtkzvqd.execute-api.us-east-1.amazonaws.com',
    bff: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    cart: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
  },
  apiEndpointsEnabled: {
    product: true,
    order: false,
    import: false,
    bff: false,
    cart: false,
  },
};
