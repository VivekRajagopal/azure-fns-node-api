import { CosmosClient, Resource, SqlQuerySpec } from "@azure/cosmos";
import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";
import cosmosConfig from "./cosmos.config";

const { connectionString, databaseId, containerId } = cosmosConfig;

if (!connectionString) {
  throw new Error("CosmosDb connection string must be provided.");
}

const cosmosClient = new CosmosClient(connectionString);
const database = cosmosClient.database(databaseId);
const container = database.container(containerId);

type IdentifiedItem<T> = T & { id: string };

const stripResourceProps = <T>(resource: T & Resource): IdentifiedItem<T> => {
  return {
    ...resource,
    _rid: undefined,
    _ts: undefined,
    _self: undefined,
    _etag: undefined,
    _attachments: undefined
  };
};

const cosmosService = (partitionKey: string) => {
  const getDocument = async <T>(id: string) => {
    const querySpec: SqlQuerySpec = {
      query: "SELECT * FROM root r WHERE r.id = @id",
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
      resourceResponse.resources[0],
      O.fromNullable,
      O.chainNullableK(stripResourceProps)
    );
  };

  const createDocument = async <T>(item: any) => {
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
        O.fromNullable,
        O.chainNullableK(stripResourceProps)
      )
    };
  };

  return {
    getDocument,
    createDocument
  };
};

export default cosmosService;
