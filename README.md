# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

### EXPO DOCUMENT AND GUIDANCE FOR BEST PRACTICE BOILERPLATE

# EXPO AFTER CREATE PROJECT REQUIRED SETUP

npx create-expo-app@latest // after this command run this enter your project Name

npm run reset-project [https://docs.expo.dev/get-started/next-steps/#reset-your-project] : if you want fresh to start project. Remove extra code and start from scratch

1. Install EAS CLI in the project step

   npm install -g eas-cli [(https://docs.expo.dev/get-started/set-up-your-environment/?mode=development-build#install-eas-cli)]

   npx eas login [(https://expo.dev/)] : Login your EAS Account

   npx eas whoami // check login completed

   npx eas build:configure [https://docs.expo.dev/build/setup/#configure-the-project] : Run the following command to create an EAS config in your project: and create a eas.json file it require for build app in EAS

   Create a development build [https://docs.expo.dev/develop/development-builds/create-a-build/]
   npx expo prebuild //for android and ios eject folder

   npx expo install expo-dev-client //

   run android or ios build in app after => npx expo prebuild Command

   create a development build locally
   npx expo run:android/ios //Platform run command after run start your development App

   eas build --platform android --profile development // Run the following command to create a development build: in EAS

# EXPO LIBRARY MOST USAGE IN PROJECT IN THE PROJECTD

1.  native wind and tailwind css configuration [https://www.nativewind.dev/getting-started/expo-router]

    npx expo install nativewind tailwindcss react-native-reanimated react-native-safe-area-context :follow this command

    Setup Tailwind CSS [https://www.nativewind.dev/getting-started/expo-router#2-setup-tailwind-css]
    Create a Tailwind config file
    npx tailwindcss init -p

    Create a CSS file and add the Tailwind directives
    global.css //name file create

    //Import your global CSS file [https://www.nativewind.dev/getting-started/expo-router#5-import-your-css-file]
    import "../global.css";

    Create babel.config.js [https://docs.expo.dev/versions/latest/config/babel/#create-babelconfigjs] or manual
    npx expo customize // select babel.config.js then enter to create file

    npx expo customize metro.config.js // follow command create [https://nativewind.dev/getting-started/expo-router#4-modify-your-metroconfigjs]

2.  customize font family,color, font

    npx expo install expo-font expo-splash-screen [https://docs.expo.dev/develop/user-interface/fonts/]

    use google font
    npx expo install expo-font @expo-google-fonts/inter

    use vector icon from expo [https://docs.expo.dev/develop/user-interface/fonts/#handle-expovector-icons-initial-load]
    npx expo install expo-font @expo-google-fonts/inter

    set a fontLoader file and use this for dynamic use also in tailwind in

3.  SVG setup and use

    npx expo install react-native-svg [https://docs.expo.dev/versions/latest/sdk/svg/#api]
    npm i react-native-svg-transformer [https://www.npmjs.com/package/react-native-svg-transformer]

    change in metro.config.js file in as per document and remember if are using tailwind code includes

    declarations.d.ts //add file in root directory follow document
    .svgrrc //add file in root directory follow document .

4.  local storage

    npx expo install react-native-mmkv [https://github.com/mrousavy/react-native-mmkv]
    npx expo prebuild //if use already just ignore command

    currently not work in expo go -------------------------------------------------------------------------------

5.  setup redux structure

    npm i react-redux
    npm i @reduxjs/toolkit
    npm i react-persist
    npm i react-saga
    npm i react-thunk

    store and folder create and setup in root file call store configure

6.  npm install react-native-paper UI Component use [https://callstack.github.io/react-native-paper/docs/guides/getting-started/]
    change in babel.config.js

7.  React Native Elements UI Component use [https://reactnativeelements.com/docs/installation#using-expo]

8.  Dropdown [https://www.npmjs.com/package/react-native-element-dropdown]

9.  Bottom Sheet [https://www.npmjs.com/package/react-native-modalize]
    npm i react-native-modalize

10. signin - sign up for use
    npm i @hookform/resolvers/yup [https://www.npmjs.com/package/@hookform/resolvers]
    npm i yup [https://www.npmjs.com/package/yup] : validation
    npm i react-hook-form [https://react-hook-form.com/]

11. expo-camera
    expo-image-picker // pick from gallery and camera

12. expo video [https://docs.expo.dev/versions/latest/sdk/video/#installation]

#
