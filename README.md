# OnlyOffice Extension - An Alfresco Content App integration of OnlyOffice for ACS

## Description

The OnlyOffice Extension is a plugin that implements online edition and conversion features from Alfresco OnlyOffice modules to Alfresco Content App.

## Features
### Online edition

![Online edition](/onlyoffice-lib/screenshots/OnlyOffice-01.png "Online edition")

The extension adds a new action button, available both in document actions and details page. The button is only available for documents in Office format(docx, xlsx, pptx, ...)

Please refer to the editor documentation to get all the available supported formats below: 
https://helpcenter.onlyoffice.com/ONLYOFFICE-Editors/ONLYOFFICE-Document-Editor/HelpfulHints/SupportedFormats.aspx

The document is edited in a custom page.

![Close edition](/onlyoffice-lib/screenshots/OnlyOffice-02.png "Close edition")

You can end editing the document by clicking on the red button. The changes will be saved in a new version of the document.

### Conversion

If the edit button is not available, it means that the document is not directly editable. However, the document can be converted if it has one of the following formats:

- LibreOffice formats (odt, odp, ods, ...)
- Old Office version formats (doc, xls, ppt, ...)

![Conversion](/onlyoffice-lib/screenshots/OnlyOffice-03.png "Conversion")

When clicking the button, the convert action from the OnlyOffice repository module is called. A copy from the original document is created in an editable format. When the conversion is done, the document list is refreshed, displaying the new document in a editable format.

## Installation

### Prerequisites

You will need an instance of ONLYOFFICE Document Server and Alfresco with the ONLYOFFICE repository module installed. https://github.com/ONLYOFFICE/onlyoffice-alfresco
Please refer to the OnlyOffice website (https://www.onlyoffice.com/) to get OnlyOffice solution. The documentation to configure the server is available here: https://helpcenter.onlyoffice.com/)"

Check out the Alfresco Content App project from the Alfresco GitHub Repository if you have not already done so.

```sh
$ git clone https://github.com/Alfresco/alfresco-content-app.git
```

The OnlyOffice extension is compatible with ACA 1.11

Clone the OnlyOffice project. The onlyoffice-lib needs to be in the same folder as your Alfresco Content App project

```sh
$ git clone https://github.com/atolcd/adf-onlyoffice-extension.git
```

### Build

Run `npm run build:onlyoffice-extension` in /onlyoffice-lib. This will build the OnlyOffice extension in the /dist directory of your Alfresco Content App project. If the onlyoffice-lib is not in the same folder as your Alfresco Content App, an Alfresco Content App folder will be created with the sources available in alfresco-content-app/dist/onlyoffice-extension/. You can get the sources and place them manually in your Alfresco Content App /dist directory

Then, in your Alfresco Content App directory, run `npm install dist/@atolcd/onlyoffice-extension --save`
Since the extension works with ng-bootstrap, run `@ng-bootstrap/ng-bootstrap@4.0.0`

### Configure Alfresco Content App

We need to configure Alfresco Content App to register the new extension.

In angular.json file, add these lines

```json
{
  ...
 "projects": {
   "app": {
    ...
     "architect": {
       "build": {
         ...
         "options": {
         ...
           "assets": [
             ...
             {
               "glob": "**/*.json",
               "input": "node_modules/@atolcd/onlyoffice-extension/assets",
               "output": "/assets/plugins"
             },
             {
               "glob": "**/*.json",
               "input": "node_modules/@atolcd/onlyoffice-extension/assets",
               "output": "/assets/onlyoffice-extension"
             }
...
```
Then, in app.extensions.json, add the reference to the OnlyOffice plugin

```json
"$references": [..., "onlyoffice.plugin.json"]
```

Finally, in extensions.module.ts, import and add the OnlyOffice module

```typescript
...
import { OnlyofficeExtensionModule } from '@atolcd/onlyoffice-extension';
@NgModule({
 imports: [..., OnlyofficeExtensionModule]
})
```

Run `npm start` if you want to test the extension locally. You also can build a new application by running `npm run build`.

To check if the extension is properly deployed, you can navigate to http://localhost:4200/#/about

![About page](/onlyoffice-lib/screenshots/OnlyOffice-04.png "About page")

### Configure OnlyOffice extension

Once the extension is properly installed, you’ll need to add your own onlyoffice URL to the app in app.config.json file as following

```json
"onlyOfficeUrl": <your.onlyoffice.installation>
```

## Contributors

Created by Antoine HEITZMANN

## LICENSE

This extension is licensed under `GNU Library or "Lesser" General Public License (LGPL)`.

## Our company

[Atol Conseils et Développements](http://www.atolcd.com) is Alfresco [Strategic Partner](http://www.alfresco.com/partners/atol)

Follow us on Twitter [@atolcd](https://twitter.com/atolcd)