import {Component} from "react";
import {findDOMNode} from "react-dom";
import {isEmpty} from "../utils/general";
import $ from "jquery";
import {isTextColorLightSimple} from "../utils/color";

export default class Ripple extends Component {

    constructor(props) {
        super(props);

        this.handleRippleClick = this.handleRippleClick.bind(this);
        this.rippleElement = this.rippleElement.bind(this);
        this.rippleCenterPoint = this.rippleCenterPoint.bind(this);
        this.rippleRadius = this.rippleRadius.bind(this);
        this.generateRippleEffect = this.generateRippleEffect.bind(this);
    }

    rippleElement() {
        const rippleRef = this.refs.ripple;
        if (isEmpty(rippleRef)) {
            return null;
        }

        return $(findDOMNode(rippleRef));
    }

    rippleCenterPoint() {
        const el = this.rippleElement();
        return {
            x: el.innerWidth() / 2,
            y: el.innerHeight() / 2
        };
    }

    rippleRadius() {
        const el = this.rippleElement();
        return Math.max(el.outerWidth(), el.outerHeight()) / 2;
    }

    generateRippleEffect(x, y, radius, isLight, isRound = false) {
        const colorClass = isLight ? 'light' : 'dark';
        const roundClass = isRound ? 'round' : '';
        const ripple = $(`<div class="ripple ${colorClass} ${roundClass}"></div>`)
            .css({
                height: radius * 2,
                width: radius * 2,
                top: y + 'px',
                left: x + 'px'
            });

        const el = this.rippleElement();
        el.prepend(ripple);
        setTimeout(() => ripple.remove(), 660);
    }

    handleRippleClick(e, rippleLight, rippleContain = true, rippleRound = false) {
        const el = this.rippleElement();
        if (isEmpty(el)) {
            return;
        }

        let r = Math.max(el.outerWidth(), el.outerHeight()) / 2;

        if (rippleContain) {
            el.css('overflow', 'hidden');
        }

        let isLight = rippleLight;
        if (isEmpty(isLight)) {
            isLight = isTextColorLightSimple(el);
        }

        let x = e.pageX - el.offset().left - r;
        let y = e.pageY - el.offset().top - r;

        if (rippleRound) {
            r *= 1.5;
            const centerPoint = this.rippleCenterPoint();

            if (!isEmpty(centerPoint)) {
                x = centerPoint.x - r;
                y = centerPoint.y - r;
            }

        }

        this.generateRippleEffect(x, y, r, isLight, rippleRound);
    }

    render() {
        return this.props.children;
    }

};