# Text-analyzer

# Folder Structure

-> All main code inside src/ directory

1. src/app

```
 page.tsx => home page , login
 StoreProvider.tsx => provider for redux
 ChakraProvider => provider for chakra ui
 /signup => signup route
 / analyze => main page to upload analysis text or file
 /analysis-result => route for displaying result from api
 / history => user history
```

2. src/components => have components for login , navbar and file drop

3. src/hooks => isAuthenticated hook for protecting routes that require login

4. src/http => axios config for calling api's

5. src/icons

6. src/store => redux toolkit configuration

7. src/utlis => have utlity fn like exportToPdf

### Running locally

1. Clone this repo or download zip

2. navigate to root folder of this project

3. run this command to install dependencies

```
npm install
```

4. run this command to start server

```
npm run dev
```
