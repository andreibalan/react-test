import React, {Component} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import FontAwesome from "react-fontawesome";
import {isEmpty} from "../utils/general";
import {Translate} from "react-redux-i18n";
import {connect} from "react-redux";

@connect()
export default class Track extends Component {
    static propTypes = {
        albumart: PropTypes.string,
        artist: PropTypes.string,
        name: PropTypes.string,
        duration: PropTypes.number
    };

    static defaultProps = {
        albumart: null,
        artist: null,
        name: null,
        duration: null
    };

    render() {
        const {albumart, artist, name} = this.props;

        const classes = classNames(
            'track',
            this.props.className
        );

        return (
            <div className={classes}>
                <div className="picture">{!isEmpty(albumart) ? <img role="presentation" src={albumart}/> :
                    <FontAwesome className="placeholder" name="music"/>}</div>
                <div className="content">
                    <div className="container">
                        <div className="name">{name}</div>
                        <div className="artist">{!isEmpty(artist) ? artist : <Translate value="unknownArtist"/>}</div>
                    </div>
                </div>
            </div>
        );
    }
};