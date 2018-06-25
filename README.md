# react-parallex-3d
React-parallex-3d provides the ability to show a 3d parallex effect on the given image.
    *NOTE: this project initially supports google chrome only*

# Usage
```js
import React, {Component, Fragment} from "react";
import {Scene} from "react-parallex-3d";

class Parallex extends Component {
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
``npm install react-parallex-3d`` or ``yarn add react-parallex-3d``

# Component API
| Name          | Type          | Default      | Description                                          |
| ------------- |:-------------:|:------------:|:----------------------------------------------------:|
| ID            | number        | undefined    | A unique ID number                                   |
| scene         | number        | 0            | The current scene                                    |
| img           | string        | empty string | An image url for the scene background                |
| title         | string        | empty string | A string to be used as the title                     |
| subTitle      | string        | empty string | A string to be used as subtitle                      |

# License
``react-parallex-3d`` is under the MIT license.