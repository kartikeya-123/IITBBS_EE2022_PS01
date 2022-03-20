import React from "react";

import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "./Arrows";
import "./hideScrollBar.css";

const ScrollContainer = ({ items }) => {
    return (
        <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            style={{ border: "2px solid red" }}
        >
            {items}
        </ScrollMenu>
    );
};
export default ScrollContainer;
