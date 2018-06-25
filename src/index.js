import React, { Component } from "react";
import { TimelineMax } from "gsap";
import Title from "react-titles/Title6";

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

class Scene extends Component {
    constructor(props) {
        super(props);

        const { scene, ID, img } = this.props;
        const image = this.img = new Image();

        this.state = { scene, prev: ID === scene - 1 };

        this.svgs = [];
        this.images = [];
        this.title = null;
        this.rects = [];

        image.src = img;
        image.onload = () => {
            this.setState({ loaded: true });
        };

        this.shapes = [...Array(8)].map((_, i) =>
            [...Array(20)].map((_, j) => ({
                Shape: icons[Math.floor(Math.random() * icons.length)],
                style: {
                    x: -30 + Math.random() * 60,
                    y: -30 + Math.random() * 60,
                    scale: 0.03
                }
            }))
        );
    }

    static getDerivedStateFromProps = ({ scene, ID }, prevState) => {
        if (scene !== prevState.scene) {
            return { prev: ID === scene - 1 };
        }

        return null;
    }

    componentDidMount() {
        const { ID, scene } = this.props;
        if (ID !== scene && ID !== scene - 1) return;

        if (this.props.prev) this.close();
        else this.open();
    }

    componentDidUpdate(prevProps, prevState) {
        const { ID, scene } = this.props;
        if (ID !== scene && ID !== scene - 1) return;

        if (this.state.prev) this.close();
        else this.open();
    }

    close = () => {
        this.images.forEach((img, id) => {
            const timeline = new TimelineMax();

            timeline.fromTo(
                img,
                5,
                { transformPerspective: 500, z: (8 - id) * -1000 + 2000, scale: 1 + (8 - id) * 2 },
                { z: "-=2000" }
            );
        });
    };

    open = () => {
        const timeline3 = new TimelineMax();
        timeline3.fromTo(
            this.wrapper,
            3,
            { willChange: "opacity", opacity: 0 },
            { opacity: 1 }
        )

        this.images.forEach((img, id) => {
            const timeline = new TimelineMax();
            const timeline2 = new TimelineMax({ delay: 2 });

            timeline.fromTo(
                img,
                2,
                { transformPerspective: 500, y: 1000 - 100 * (8 - id), rotationX: (id + 1) * -5, z: 0, scale: 1 },
                { y: 0, rotationX: 0, z: 0, scale: 1 }
            );
            timeline2.fromTo(
                img,
                5,
                { transformPerspective: 500, z: (8 - id) * -1000, scale: 1 + (8 - id) * 2 },
                { z: "+=2000" }
            );
        });

        const timeline = new TimelineMax();

        timeline
            .fromTo(this.rects[0], 2, { y: 900, skewX: 25 }, { y: 0, skewX: 0 })
            .fromTo(this.rects[1], 2, { y: 900, skewX: -25 }, { y: 0, skewX: 0 }, "-=2")
    };

    iconStyle = ({ x, y, scale }) => ({
        transform: `translate(${x}%, ${y}%)  scale(${scale})`,
        transformOrigin: "50% 50%"
    });

    render() {
        const prev = this.state.prev;
        const { ID, img, scene, title, subTitle } = this.props;
        const clipStyle = { clipPath: `url(#${(prev ? "prev" : "curr")}-${ID})` };

        if (ID !== scene && ID !== scene - 1) return null;

        return (
            <div className="scene">
                <svg width="100%" height="100%" style={{ position: "absolute" }}>
                    <defs>
                        {prev &&
                            <clipPath id={`prev-${ID}`}>
                                <rect width="50%" height="100%" />
                                <rect x="50%" width="50%" height="100%" />
                            </clipPath>
                        }
                        {!prev &&
                            <clipPath id={`curr-${ID}`}>
                                <rect ref={(el) => this.rects[0] = el} width="50%" height="100%" />
                                <rect ref={(el) => this.rects[1] = el} x="50%" width="50%" height="100%" />
                            </clipPath>
                        }
                    </defs>
                </svg>
                <div ref={(el) => this.wrapper = el} style={clipStyle}>
                    {[...Array(8)].map((_, id) =>
                        <svg
                            width="100%"
                            height="100%"
                            viewBox={`0 0 ${1500} ${1000}`}
                            preserveAspectRatio="xMidYMid slice"
                            ref={(el) => this.images[id] = el}
                            key={id}
                            style={{
                                position: "absolute",
                                transformOrigin: "50% 50%",
                                willChange: "transform"
                            }}>
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
                                href={img}
                                width="100%"
                                height="100%"
                            />
                            {id === 2 &&
                                <Title
                                    x="25%"
                                    y="30%"
                                    innerRef={(el) => this.title = el}
                                    size={200}
                                    text1={title}
                                    text2={subTitle}
                                    fontFamily="monospace"
                                    open={!prev}
                                />
                            }
                            {id > 0 && this.shapes[id].map(({ Shape, style }, i) =>
                                <Shape key={i} style={this.iconStyle(style)} />
                            )}
                        </svg>
                    )}
                </div>
            </div>
        );
    }
}

export default Scene;