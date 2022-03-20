import React from "react";

import { VisibilityContext } from "react-horizontal-scrolling-menu";

import { IconButton } from "@mui/material";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

function Arrow({ children, disabled, onClick, position }) {
    return (
        <IconButton
            disabled={disabled}
            onClick={onClick}
            sx={{
                alignSelf: "center",
                right: position === "left" ? "1%" : "0",
                left: position === "right" ? "1%" : "0",
                opacity: disabled ? "0" : "1",
            }}
        >
            {children}
        </IconButton>
    );
}

export const LeftArrow = () => {
    const {
        getPrevItem,
        isFirstItemVisible,
        scrollToItem,
        visibleItemsWithoutSeparators,
        initComplete,
    } = React.useContext(VisibilityContext);

    const [disabled, setDisabled] = React.useState(
        !initComplete || (initComplete && isFirstItemVisible)
    );
    React.useEffect(() => {
        if (visibleItemsWithoutSeparators.length) {
            setDisabled(isFirstItemVisible);
        }
    }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

    const clickHandler = () => {
        const prevItem = getPrevItem();
        scrollToItem(prevItem?.entry?.target, "smooth", "start");
    };

    return (
        <Arrow disabled={disabled} onClick={clickHandler}>
            <BsFillArrowLeftCircleFill />
        </Arrow>
    );
};

export const RightArrow = () => {
    const {
        getNextItem,
        isLastItemVisible,
        scrollToItem,
        visibleItemsWithoutSeparators,
    } = React.useContext(VisibilityContext);

    const [disabled, setDisabled] = React.useState(
        !visibleItemsWithoutSeparators.length && isLastItemVisible
    );
    React.useEffect(() => {
        if (visibleItemsWithoutSeparators.length) {
            setDisabled(isLastItemVisible);
        }
    }, [isLastItemVisible, visibleItemsWithoutSeparators]);

    const clickHandler = () => {
        const nextItem = getNextItem();
        scrollToItem(nextItem?.entry?.target, "smooth", "end");
    };

    return (
        <Arrow disabled={disabled} onClick={clickHandler}>
            <BsFillArrowRightCircleFill />
        </Arrow>
    );
};
