// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Wire } = initSchema(schema);

export {
  Wire
};