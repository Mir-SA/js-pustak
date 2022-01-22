import { useState, useEffect } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.css";

interface ResizableProps {
    direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
    let resizableProps: ResizableBoxProps;
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(innerWidth * 0.66);

    // manages editor dimensions on window resize
    useEffect(() => {
        let timer: any;
        const listener = () => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                setInnerHeight(window.innerHeight);
                setInnerWidth(window.innerWidth);
                if (window.innerWidth * 0.66 < width) {
                    setWidth(window.innerWidth * 0.66);
                }
            }, 200);
        };

        window.addEventListener("resize", listener);

        return () => {
            window.removeEventListener("resize", listener);
        };
    });

    if (direction === "horizontal") {
        resizableProps = {
            className: "resize-horizontal",
            minConstraints: [innerWidth * 0.33, Infinity],
            maxConstraints: [innerWidth * 0.66, Infinity],
            height: Infinity,
            width,
            resizeHandles: ["e"],
            onResizeStop: (e, data) => {
                setWidth(data.size.width);
            },
        };
    } else {
        resizableProps = {
            minConstraints: [Infinity, innerHeight * 0.1],
            maxConstraints: [Infinity, innerHeight * 0.9],
            height: innerHeight * 0.33,
            width: Infinity,
            resizeHandles: ["s"],
        };
    }

    return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
