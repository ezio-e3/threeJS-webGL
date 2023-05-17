# threeJS-webGL
ThreeJS Journey course by Bruno Simon
<br>
- threeJS is a 3d JavaScript library for the web
- webGL is a JavaScript API compatible with most modern browsers, it works by making use of the GPU
- shaders are programs that contain instructions to place points, draw pixels perform calculations and tranformaitons etc
- native webGL is pretty technical, it takes many lines of code to perfrom simple takss such as drawin a triangle
- native webGL is excellent for direct interaction with the GPU and is great for performance related work or optimization
- threeJS is a library built on top of webGL
<br>
## Basic Scence
- a scene is basically a container where we put objects, models, lights etc and render to get an output
- to create a visible of object we need to create a mesh, which is a combination of geometry and material
- camera serve as a point of view for your scene
- first parameter for the camera is your field of view
- second parameter is the aspect ratio
- a renderer outputs your scene through your camera point on view on a canvas (html element)
