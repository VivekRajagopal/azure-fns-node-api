export default {
  connectionString: process.env.CosmosDbConnectionString,
  databaseId: "Tasks",
  containerId: "Items",
  partitionKey: { kind: "Hash", paths: ["/partitionKey"] }
};
