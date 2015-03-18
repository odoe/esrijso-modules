## esrijso-modules

*Inspired by [node-list-dependencies](https://github.com/mrjoelkemp/node-list-dependencies), but will only create a list of Esri/Dojo specific modules.*

Simple node app that will scan directory and create a list of
only [ArcGIS API for JS](https://developers.arcgis.com/javascript/) dependencies.

````
npm install -g esrijso-modules
````

### Options
````
-h, --help        output usage information
-V, --version     output the version number
-s, --src <directory>     Source directory with JavaScript files
-o, --output <directory>  Output directory for module list. (Optional)
````

### Usage
````
esrijso-modules -s src -o output
````

It will create a file called `modules` in the `output` directory that can be used to create a custom build with the [ArcGIS JavaScript Optimizer](https://jso.arcgis.com/).

You can then host this build locally or in the cloud and use it to replace the Esri JS API CDN in your application.
