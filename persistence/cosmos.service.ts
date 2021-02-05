import { CosmosClient } from "@azure/cosmos";
import cosmosConfig from "./cosmos.config";

const { connectionString, databaseId, containerId } = cosmosConfig;

if (!connectionString) {
  throw new Error("CosmosDb connection string is not defined.");
}

const cosmosClient = new CosmosClient(connectionString);
const database = cosmosClient.database(databaseId);
const container = database.container(containerId);

console.log(JSON.stringify(container));

const getContainerAsync = () =>
  cosmosClient.database(databaseId).container(containerId);

export const createDocument = async (item: any, partitionKey: string) => {
  // const { database } = await cosmosClient.databases.createIfNotExists({
  //   id: databaseId
  // });
  // const { container } = await database.containers.createIfNotExists({
  //   id: containerId
  // });

  // const container = getContainerAsync();

  try {
    const result = await container.items.create({ ...item, partitionKey });
    console.log(result);
    return result;
  } catch (error) {
    return { 1: 1 };
  }
};
