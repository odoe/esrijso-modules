## esrijso-modules

*Inspired by [node-list-dependencies](https://github.com/mrjoelkemp/node-list-dependencies), but will only create a list of Esri/Dojo specific modules.*

Simple node app that will scan directory and create a list of
only [ArcGIS API for JS](https://developers.arcgis.com/javascript/) dependencies.

````
node index.js src output
````

Where `src` is the source of your JavaScript files used in your application and `output` is the output directory to store the module list.

It will create a file called `modules` in the `output` directory that can be used to create a custom build with the [ArcGIS JavaScript Optimizer](https://jso.arcgis.com/).

You can then host this build locally or in the cloud and use it to replace the Esri JS API CDN in your application.
