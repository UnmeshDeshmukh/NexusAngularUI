import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "btn-custom": {
        "marginTop": 10,
        "marginRight": 10,
        "marginBottom": 10,
        "marginLeft": 10
    },
    "div-centered": {
        "position": "fixed",
        "top": "50%",
        "left": "50%",
        "transform": "-ms-translate(-50%, -50%)"
    },
    "custom-inc-font-size": {
        "paddingTop": 25,
        "paddingRight": 25,
        "paddingBottom": 25,
        "paddingLeft": 25,
        "height": 60,
        "fontSize": 20
    },
    "custom-icon-size": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "marginTop": 5,
        "marginRight": 5,
        "marginBottom": 5,
        "marginLeft": 5,
        "fontSize": 35
    },
    "custom-margin-10": {
        "marginBottom": 10
    },
    "custom-background": {
        "backgroundImage": "url(\"../img/landing.jpg\")"
    },
    "btn-purple": {
        "color": "#FFFFFF",
        "backgroundImage": "url(\"../img/background.jpg\")"
    },
    "btn-purple:hover": {
        "color": "#FFFFFF",
        "backgroundColor": "#5d3660"
    },
    "btn-red": {
        "color": "#FFFFFF",
        "backgroundImage": "url(\"../img/red-background.jpg\")"
    },
    "btn-red:hover": {
        "color": "#FFFFFF",
        "backgroundColor": "##ff4c4c"
    },
    "btn-green": {
        "color": "#FFFFFF",
        "backgroundImage": "url(\"../img/green-background.jpg\")"
    },
    "btn-green:hover": {
        "color": "#FFFFFF",
        "backgroundColor": "##99ff99"
    },
    "custom-author": {
        "display": "inline-block"
    },
    "custom-card-height": {
        "minHeight": 432
    },
    "input[type=text]": {
        "width": "100%",
        "paddingTop": 12,
        "paddingRight": 20,
        "paddingBottom": 12,
        "paddingLeft": 20,
        "marginTop": 8,
        "marginRight": 0,
        "marginBottom": 8,
        "marginLeft": 0,
        "display": "inline-block",
        "border": "1px solid #ccc",
        "borderRadius": 4,
        "boxSizing": "border-box"
    },
    "select": {
        "width": "100%",
        "paddingTop": 12,
        "paddingRight": 20,
        "paddingBottom": 12,
        "paddingLeft": 20,
        "marginTop": 8,
        "marginRight": 0,
        "marginBottom": 8,
        "marginLeft": 0,
        "display": "inline-block",
        "border": "1px solid #ccc",
        "borderRadius": 4,
        "boxSizing": "border-box"
    },
    "input": {
        "width": "100%",
        "paddingTop": 12,
        "paddingRight": 20,
        "paddingBottom": 12,
        "paddingLeft": 20,
        "marginTop": 8,
        "marginRight": 0,
        "marginBottom": 8,
        "marginLeft": 0,
        "display": "inline-block",
        "border": "1px solid #ccc",
        "borderRadius": 4,
        "boxSizing": "border-box"
    }
});