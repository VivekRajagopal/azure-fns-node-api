# azfns-node-real-api

This project is an exploration C. Early 2021 of the viability of using Azure Functions + NodeJS for projects of beyond basic complexity. These are projects that surface APIs that can persist information, make requests to third party APIs, using strongly typed languages and potentially allow custom extension of the underlying framework.

## Motivation

Azure Functions is geared towards the `dotnet` ecosystem with languages like C# and F#, but does support languages like Python and Javascript (and Typescript). Both of these languages offer a wealth of libraries (open source or not) that could be leveraged in Azure Functions. As a matter of preference, both languages also offer cleaner and lighter syntax.

## Desirable Requirements

1. Leverage `typescript` as much as possible
2. Request payload validation
3. Connect to a Cosmos service and
   a. Create documents
   b. Read documents
4. Emulating "Startup" logic (i.e. registering singleton services)
5. Create a custom binding
6. Use App Insights for logging

## Instructions

1. Clone this repo
2. Run `npm install`
3. Run `npm start` to run the function host

You will need to install and run [CosmosDB local emulator](!https://docs.microsoft.com/en-us/azure/cosmos-db/local-emulator).
