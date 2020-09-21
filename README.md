# OnlyOffice Extension - An Alfresco Digital Workspace integration of OnlyOffice for ACS

## Description

The OnlyOffice Extension is a plugin that implements online edition and conversion features from Alfresco OnlyOffice modules to Alfresco Digital Workspace.

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

If you want to build the OnlyOffice extension with ADW, you will need to get the source code for ADW 1.6.0 from Alfresco Support.

Clone the OnlyOffice project. The onlyoffice-lib needs to be in the same folder as your ADW project.

```sh
$ git clone https://github.com/atolcd/adf-onlyoffice-extension.git
```
### Build

Run `npm run build:onlyoffice-extension` in /onlyoffice-lib. This will build the OnlyOffice extension in the /dist directory of your Alfresco Digital Workspace project. If the onlyoffice-lib is not in the same folder as your Alfresco Digital Workspace project, an ADW folder will be created with the sources available in alfresco-digital-workspace-1.6.0/dist/onlyoffice-extension/. You can get the sources and place them manually in your ADW / dist directory

Run `npm install dist/onlyoffice-extension` in the ADW project

Run `npm start` if you want to test the extension locally. You also can build a new application by running `npm run build`.

To check if the extension is properly deployed, you can navigate to http://localhost:4200/#/about

![About page](/onlyoffice-lib/screenshots/OnlyOffice-04.png "About page")

### Configure Alfresco Digital Workspace

We need to configure ADW to register the new extension.

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
Then, in plugins.json, add the reference to the OnlyOffice plugin

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

### Configure Alfresco Content App

Please notice that you can also build the extension for Alfresco Content App if you don't have access to ADW sources. You will need to modify the angular.json and extensions.module.ts files the same way. The plugins.json file does not exist in Alfresco Content App, so you have to modify app.extensions.json instead.

You will also need to modify the build target of the OnlyOffice extension. Please configure the onlyoffice-lib/projects/onlyoffice-extension/ng-package.json and onlyoffice-lib/package.json files so that the target matches your Alfresco Content App folder.

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