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
<br>

## Transform Objects
We can transform objects in for different properties
- position
- scale
- rotation
- quaternion

## Animations
Animations in ThreeJS is like stop motion, it is done frame by frame. You make your change and you render each frame till you achieve the smooth animation effect.
- most screens can run at 60 FPS
- calculation of delta time in code is used to set animation speed regardless of the PC frame rate
- another way is to use the inbuilt class 'Clock'
- to improve and make more complex animations, we can use libraries like the GSAP library **npm install --save gsap@x.x.x**

## Camera
Camera is an abstract class, there are other cameras that inherit from this abstract class.
- ArrayCamera
- StereoCamera
- CubeCamera
- OrthographicCamera
- PerspectiveCamera

## Controls
Custom controls to move objects in your scene
- Device Orientation Controls
- Fly Controls
- First Person Controls (Nothing to do with FPS Game)
- Pointer lock Controls
- Orbit Controls
- Trackball Controls
- Transform Controls
- Drag Controls

## Geometries
Geometries are composed of vertices (point cordinates in 3D Space), and faces (triabgles that join those vertices to create a surface)

## Textures
Tetxures are images that cover the geometries
- Color (Albedo)
- Alpha
- Height (Displacement)
- Normal (Add's details, especially things like lighting)
- Amnient Occlusion (Add's details like fake shadows in crevices)
- Metalness (Mostly for reflection)
- Roughness (Mostly for light dissipation)

These textures usually follow PBR (Physical Based Renderring) principles, meaning it tries to imitate realistic results by getting close to real life calculations

### UV Unwrapping
This is about how a texture is placed (wrapped) around a geometry, this concept is similar to unrwapping origami

## Materials
Materials are used to put a color on each visible pixel of your geometery, materials are written in programs called shaders.


