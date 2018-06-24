import React, { Component } from "react";
import styled from "styled-components";

const SVG = styled.svg`
    position: absolute;
    border: 1px solid #fff;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
`;

class Brush extends Component {
    constructor(props) {
        super(props);

        this.path = null;
        this.start = null;
        this.duration = 200;
        this.finished = false;
        this.offsets = [0, 0];
        this.repeat = 0;

        this.data = [...Array(30)].map(() => []);
        this.paths = [];
    }

    componentDidMount() {
        requestAnimationFrame(this.animate);
    }

    drawPoints() {
        const path = [];

        for(let i = 0; i <1; i++) {
            for (let j = 0; j < 10; j++) {
                const angle = Math.random() * 360;
                const x = 400 + Math.random() * 30 * Math.cos(angle * Math.PI / 180);
                const y = 400 + Math.random() * 30 * Math.sin(angle * Math.PI / 180);
    
                j === 0 && path.push({ type: "M", values: [x, y] });
                path.push({ type: "L", values: [x, y] });
            }
        }

        return path;
    }

    drawSome = () => {
        const j = this.repeat;

        for (let i = 0; i < 30; i ++) {
            const angle = Math.random() * 360;
            const x = 400 + Math.random() * 30 * Math.cos(angle * Math.PI / 180);
            const y = 400 + Math.random() * 30 * Math.sin(angle * Math.PI / 180);
            const xOffset = this.offsets[0] * (j % 2 ? -(j <= 1 ? 1 : 2) : (j >= 10 ? 1 : 2));
            const yOffset = this.offsets[1] / (j <=1 ? 3 : 1);
            const prevValues = j > 0 && this.data[i][j - 1].values;
    
            j === 0 && (this.data[i][j] = { type: "M", values: [x, y] });
            j > 0 && (this.data[i][j] = { type: "L", values: [prevValues[0] + xOffset, prevValues[1] + yOffset] });
        }

        const data = this.createPathData(this.data);
        this.paths.forEach((path, id) => {
            path.setAttribute("d", data[id]);
        });
    }

    update = (elapsed) => {
        const percent = elapsed / this.duration;

        if (elapsed < this.duration) {
            this.offsets = [200 * percent, 30 * percent];
            this.finished = false;
        } else this.finished = true;
    };

    animate = (timestamp) => {
        if (this.finished && 10 <= this.repeat) {
            this.onComplete && this.onComplete();
            return;
        }
        
        if (!this.start || this.finished) this.start = timestamp;
        let elapsed = timestamp - this.start;

        if (this.finished) {
            this.repeat += 1;
            this.offsets = [0, 0];
        }

        this.drawSome();
        this.update(elapsed);

        requestAnimationFrame(this.animate);
    }

    animatePoints() {

    }

    createPathData = (data) =>
        data.map((path) =>
            path.reduce((string, { type, values }) => (
                string + `${type}${values[0]} ${values[1]} `
            ), "")
        )

    render() {
        return (
            <SVG width="800" height="800">
                <defs>
                    <clipPath id="clipPath">
                        {[...Array(30)].map((_, id) => (
                            <path key={id} ref={(el) => this.paths[id] = el} fillRule="nonzero" />
                        ))}
                    </clipPath>
                </defs>
                <image
                    clipPath="url(#clipPath)"
                    xlinkHref="/background-img.jpg"
                    x="200"
                    y="300"
                    width="60%"
                    height="60%" />
                <circle cx="50%" cy="50%" r="1" fill="#fff" />
            </SVG>
        );
    }
}

export default Brush;