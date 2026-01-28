### EAS ANDROID PRODUCTION

`eas build -p android --profile production`

- Navigate to the links provided by the [EAS](https://expo.dev/accounts/migfus)
- Download the \*.AAB file
- Upload the \*.AAB file to [Google Play Store Console](https://play.google.com/console/u/0/developers/8454680803352709258/app-list)

---

### WEB PRODUCTION

`npx expo export -p web`

---

### WINDOWS PRODUCTION

- copy the `/dist` (from WEB PRODUCTION) to `/electron/dist`
  `cd electron`
- update the `/electron/package.json` version according to the main `./package.json`

`npm run build:win`

- get the installer file from `/release`
