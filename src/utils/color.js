import {isEmpty} from "./general";

export function HEX2RGBA(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
            a: 1
        } : null;
}

export function stringToRGBA(value) {
    if ('#' === value[0]) {
        return HEX2RGBA(value);
    } else if (value.search("rgb") > -1) {
        let result = value.replace(/^(rgb|rgba)\(/, '').replace(/\)$/, '').replace(/\s/g, '').split(',').map(v => Number(v));
        return result ? {
                r: result[0],
                g: result[1],
                b: result[2],
                a: result.length === 4 ? result[3] : 1
            } : null;
    }
}

export function getElementBackgroundColor(el) {
    let bgColor = null;
    while (el[0].tagName.toLowerCase() !== "html") {
        bgColor = stringToRGBA(el.css("background-color"));

        if (!isEmpty(bgColor) && bgColor.a === 1) {
            break;
        }

        el = el.parent();
    }
    return bgColor;
}

export function isTextColorLightSimple(el) {
    const color = getElementBackgroundColor(el);

    if (isEmpty(color)) {
        return false;
    }

    const {r, g, b} = color;

    return !((r * 0.299 + g * 0.587 + b * 0.114) > 186);
}