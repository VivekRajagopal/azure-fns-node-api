import cosmosService from "../../host-services/cosmos/cosmos.service";

export const UsersPartitionKeyName = "Users";

export default cosmosService(UsersPartitionKeyName);
