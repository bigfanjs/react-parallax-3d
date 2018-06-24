import React, { Component, Fragment } from "react";
import { Motion, spring } from "react-motion";
import styled from "styled-components";

import Title from "react-title-animations/Title6";

import HeartIcon from "./HeartIcon";
import HeartIcon2 from "./HeartIcon2";
import Flower from "./Flower";
import Leaf from "./Leaf";
import Leaves from "./Leaves";
import Moon from "./Moon";
import Star from "./Star";
import SunFlower from "./SunFlower";
import BaloonsIcon from "./BaloonsIcon";
import Almond from "./Almond";

const icons = [
    HeartIcon, HeartIcon2, Flower,
    Leaf, Leaves, Moon, Almond,
    Star, SunFlower, BaloonsIcon
];

const SVG = styled.svg`
    position: absolute;
    transform-origin: 50% 50%;
`;

class Parallex extends Component {
    constructor(props) {
        super(props);

        const args = { stiffness: 20, damping: 30 };

        this.start = { z1: 0, z2: 0 };
        this.end = { z1: spring(4000, args), z2: spring(100) };

        this.shapes = [...Array(8)].map((_, i) =>
            [...Array(20)].map((_, j) => ({
                Shape: icons[Math.floor(Math.random() * icons.length)],
                style: {
                    x: -45 + Math.random() * 90,
                    y: -45 + Math.random() * 90,
                    scale: 0.03 + Math.random() * 0.05
                }
            }))
        );
    }

    calculateStyle = (id, z) => ({
        transform: `
            perspective(500px) 
            translate3d(0, 0, ${(8 - id) * -1000 + 0}px) 
            scale(${1 + (8 - id) * 2})
        `
    })

    iconStyle = ({ x, y, scale }) => ({
        transform: `
            translate(${x}%, ${y}%) 
            scale(${scale})
        `,
        transformOrigin: "50% 50%"
    });

    titleStyle = (z) => {
        return {
            position: "absolute",
            // top: "85%",
            // left: "25%",
            transformOrigin: "50% 50%",
            transform: `translate(0, ${z})`
        }
    }

    render() {
        const src = this.props.src;

        return (
            <Motion defaultStyle={this.start} style={this.end}>
                {({ z1, z2 }) =>
                    <Fragment>
                        {[...Array(8)].map((_, id) =>
                            <SVG
                                width="100%"
                                height="100%"
                                viewBox="0 0 1600 1067"
                                preserveAspectRatio="xMidYMid slice"
                                key={id}
                                style={this.calculateStyle(id, z1)}>
                                <defs>
                                    <filter id="blur-ellipse">
                                        <feGaussianBlur stdDeviation="5" />
                                    </filter>
                                    <filter id={`blur-img-${id}`}>
                                        <feGaussianBlur stdDeviation={id * 0.5} />
                                    </filter>
                                    <mask id={`mask-${id}`}>
                                        <rect width="100%" height="100%" fill="#fff" />
                                        <ellipse
                                            filter="url(#blur-ellipse)"
                                            cx="50%"
                                            cy="50%"
                                            rx={`${45 - (7 - id) * 3}%`}
                                            ry={`${45 - (7 - id) * 2}%`}
                                        />
                                    </mask>
                                </defs>
                                <image
                                    filter={`url(#blur-img-${id})`}
                                    mask={id === 0 ? "none" : `url(#mask-${id})`}
                                    xlinkHref="/background-img9.jpg"
                                    width="100%"
                                    height="100%"
                                />
                                {/* <rect opacity="0.1" width="100%" height="100%" /> */}
                                {id > 0 && this.shapes[id].map(({ Shape, style }, i) =>
                                    <Shape key={i} style={this.iconStyle(style)} />
                                )}
                            </SVG>
                        )}
                        <Title
                            style={this.titleStyle(z2)}
                            size={400}
                            text1="HAPPY"
                            text2="WEDDING"
                            fontFamily="monospace"
                            open={true}
                        />
                    </Fragment>
                }
            </Motion>
        );
    }
}

export default Parallex;