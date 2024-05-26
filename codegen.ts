import { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

import { sanityGraphqlAPIUrl } from './utils';

dotenv.config();

const apiUrl = sanityGraphqlAPIUrl({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_GRAPHQL_API_VERSION,
});

const config: CodegenConfig = {
  schema: apiUrl,
  documents: ['queries/**/*.graphql.ts'],
  generates: {
    './generated/': {
      preset: 'client',
      plugins: [
        'typescript',
        'typescript-operations',
        {
          add: {
            content: '// @ts-nocheck',
          },
        },
      ],
    },
  },
};

export default config;
