# Tune Squad Watch Party - Application Sample

## Minimal Path to Awesome

1. Ensure [NodeJS](https://nodejs.org) is installed on your computer. Note that NodeJS is only used to run a small HTTP server; there is no build step required and the application code runs entirely in the user's web browser.

1. Register an application in Azure Active Directory and save your clientId and tenant Id from the registration.

    Setting|Value
    -------|-----
    Name|My app
    Platform|Single-page application
    Redirect URIs|http://localhost
    Supported account types|Accounts in this organizational directory only (Single tenant)
    API permissions|Microsoft Graph User.Read (delegated)

1. Based on the `.env_sample` file, create a new file named `.env.js`

1. In the `.env.js` file update the following values:

   Take the value from | Paste it into your .env.js as
   --------------------|------------------------------
   App registration application (client) ID | clientId
   App registration tenant (directory) ID | authority

1. Run `npm start` to start the app

## Run the app in Microsoft Teams

> **Important:** to run this app in Microsoft Teams, you will need an ngrok license. If you don't have an ngrok license, you will need to adjust the **start:ngrok** npm script so that it doesn't use a custom subdomain (remove the **-subdomain** argument). Each time you start ngrok, you will need to update the Microsoft Teams app manifest in the **teams/manifest.json** file with the domain name used by ngrok and upload your app to Microsoft Teams.

1. Create a Teams app package by zipping the contents of the **teams** folder (just its contents, not the whole folder)
1. [Ensure that you can upload custom apps](https://docs.microsoft.com/microsoftteams/platform/build-your-first-app/build-and-run?tabs=do-not-have-a-tenant?WT.mc_id=m365-26570-cxa#set-up-your-teams-development-tenant)
1. [Upload the app package](https://docs.microsoft.com/microsoftteams/platform/concepts/deploy-and-publish/apps-upload?WT.mc_id=m365-26570-cxa) to Microsoft Teams
1. In the command line, start the web server by executing: `npm start`
1. In another command line, start ngrok, by executing: `npm run start:ngrok`

## Interesting concepts

This application illustrates the following concepts:

   Concept | Shown in file(s)
   --------|-----------------
   ES6 Modules | all .js files
   Get fans from Microsoft Graph | graph/fans.js
   Get calendar events from Microsoft Graph across a date range | graph/watchParties.js
   Set up Graph client with MSAL | auth.js, graph/graphClient.js
   Cache Graph results in browser storage | graph/graphClient.js, graph/CacheMiddleware.js

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft trademarks or logos is subject to and must follow  [Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general).

Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship. Any use of third-party trademarks or logos are subject to those third-party's policies.
