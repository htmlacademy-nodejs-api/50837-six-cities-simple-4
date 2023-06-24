export const getMongoURI = (
  // username: string,
  // password: string,
  host: string,
  port: string,
  databaseName: string,
): string => `mongodb://${host}:${port}/${databaseName}?authSource=admin`;
//string => `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;
