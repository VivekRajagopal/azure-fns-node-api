import cosmosService from "./cosmos.service";

export const UsersPartitionKeyName = "Users";

export default cosmosService(UsersPartitionKeyName);
