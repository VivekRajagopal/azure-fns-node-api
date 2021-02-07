import { CosmosClient, Resource, SqlQuerySpec } from "@azure/cosmos";
import { pipe } from "fp-ts/lib/function";
import { chainNullableK, fromNullable } from "fp-ts/lib/Option";
import cosmosConfig from "./cosmos.config";

const { connectionString, databaseId, containerId } = cosmosConfig;

if (!connectionString) {
  throw new Error("CosmosDb connection string must be provided.");
}

const cosmosClient = new CosmosClient(connectionString);
const database = cosmosClient.database(databaseId);
const container = database.container(containerId);

type IdentifiedItem<T> = T & { id: string };

const mapResourceToItem = <T>(resource: T & Resource): IdentifiedItem<T> => {
  return {
    ...resource,
    _rid: undefined,
    _ts: undefined,
    _self: undefined,
    _etag: undefined,
    _attachments: undefined
  };
};

export const getDocument = async <T>(id: string, partitionKey: string) => {
  const querySpec: SqlQuerySpec = {
    query: "SELECT * FROM Users U WHERE U.id = @id",
    parameters: [
      {
        name: "@id",
        value: id
      }
    ]
  };

  const resourceResponse = await container.items
    .query<T>(querySpec, {
      partitionKey
    })
    .fetchAll();

  return pipe(
    fromNullable(resourceResponse.resources[0]),
    chainNullableK(mapResourceToItem)
  );
};

export const createDocument = async <T>(item: any, partitionKey: string) => {
  const resourceResponse = await container.items.create<T>(
    { ...item, partitionKey },
    { disableAutomaticIdGeneration: false }
  );

  return {
    statusCode: resourceResponse.statusCode,
    isSuccessful: resourceResponse.statusCode === 201,
    etag: resourceResponse.etag,
    item: pipe(
      resourceResponse.resource,
      fromNullable,
      chainNullableK(mapResourceToItem)
    )
  };
};
