// FIXME: I don't think I will have time to finish this part properly.
// My plan was in that in the Dockerized environment, upon building the project (docker compose up --build),
// we could have just swapded the URLs (in the bundled .js file) with the ones specified in the .env files with a Docker entrypoint script.
// Either this solution or write an Angular service that fetches a local JSON file from a pre-defined folder in the src/ level,
// and that file could contain the needed endpoint URLs. In this case we have to make sure to fetch this file right before the
// application bootstraps (https://angular.io/api/core/APP_INITIALIZER).
export const env = {
  apiUrl: 'http://127.0.0.1:3000',
  gqlUrl: 'http://127.0.0.1:4000/graphql'
};
