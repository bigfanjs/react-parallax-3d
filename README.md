# react-parallex-3d
React-parallax-3d provides the ability to show a 3d parallax effect on the given image.  
**NOTE: this project initially supports google chrome only**  
[See a demo](https://bigfanjs.github.io/react-parallax-3d-demo/)  

![sample](https://user-images.githubusercontent.com/10690029/41943988-a5790ec2-799d-11e8-870a-342d298b0368.gif)

# Screen cast
You can still see a video demo even if it didn't work on your web broweser:  
https://www.youtube.com/watch?v=788Gz6l0SW0

# Usage
```js
import React, {Component, Fragment} from "react";
import Scene from "react-parallax-3d";

class Parallax extends Component {
    state = { scene: 0 };

    render() {
        const scene = this.state.scene;

        return (
            <Fragment>
                <Scene
                    ID={0}
                    scene={scene}
                    img="/background-img.jpg"
                    title="REACT"
                    subTitle="AWESOME"
                />
                <Scene
                    ID={1}
                    scene={scene}
                    img="/background-img2.jpg"
                    title="SVG"
                    subTitle="REAL HOT"
                />
            </Fragment>
        );
    }
}
```

# Instalation
``npm install react-parallax-3d`` or ``yarn add react-parallax-3d``

# Component API
| Name          | Type          | Default      | Description                                          |
| ------------- |:-------------:|:------------:|:----------------------------------------------------:|
| ID            | number        | undefined    | A unique ID number                                   |
| scene         | number        | 0            | The current scene                                    |
| img           | string        | empty string | An image url for the scene background                |
| title         | string        | empty string | A string to be used as the title                     |
| subTitle      | string        | empty string | A string to be used as subtitle                      |

# License
``react-parallax-3d`` is under the MIT license.