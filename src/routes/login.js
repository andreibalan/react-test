import React, {Component} from "react";
import {connect} from "react-redux";
import {unprotectedRoute} from "../utils/wrapper";
import Message from "../components/message";
import ButtonGroup from "../components/buttonGroup";
import Button from "../components/button";
import Dialog from "../components/dialog";
import Input from "../components/input";
import Progress from "../components/progress";
import Paragraf from "../components/paragraf";
import {Row, Column} from "react-foundation";
import {isEmpty} from "../utils/general";
import {isEmail} from "../utils/validation";
import {firebaseConnect, pathToJS} from "react-redux-firebase";
import {Translate, I18n} from "react-redux-i18n";

@firebaseConnect()
@connect(({firebase}) => ({authError: pathToJS(firebase, 'authError')}))
@unprotectedRoute
export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoginLoading: false,
            isRecoverLoading: false,
            isRecoverSuccessful: false,
            isLoginDialogVisible: false,
            isRecoverDialogVisible: false,

            username: null,
            password: null,
            usernameError: null,
            passwordError: null,
            loginError: null,

            email: null,
            emailError: null,
            recoverError: null
        };

        this.showLoginDialog = this.showLoginDialog.bind(this);
        this.hideLoginDialog = this.hideLoginDialog.bind(this);
        this.doLogin = this.doLogin.bind(this);
        this.showRecoverDialog = this.showRecoverDialog.bind(this);
        this.hideRecoverDialog = this.hideRecoverDialog.bind(this);
        this.doRecover = this.doRecover.bind(this);
    }

    showLoginDialog() {
        this.setState({isLoginDialogVisible: true});
    }

    hideLoginDialog() {
        this.setState({
            isLoginDialogVisible: false,
            username: null,
            password: null,
            usernameError: null,
            passwordError: null
        });
    }

    doLogin() {
        const {username, password} = this.state;

        const errorState = {};

        if (isEmpty(username)) {
            errorState.usernameError = <Translate value="emptyField"/>;
        } else if (!isEmail(username)) {
            errorState.usernameError = <Translate value="invalidEmail"/>;
        }

        if (isEmpty(password)) {
            errorState.passwordError = <Translate value="emptyField"/>;
        } else if (password.length < 6) {
            errorState.passwordError = <Translate value="passwordLength"/>;
        }

        if (Object.keys(errorState).length > 0) {
            this.setState(errorState);
            return;
        }

        this.setState({isLoginLoading: true});

        this.props.firebase.login({
            email: username,
            password: password
        }).catch(e => {
            Object.assign(errorState, {
                isLoginLoading: false,
                username: null,
                password: null
            });

            switch (e.code) {
                case 'auth/invalid-email': {
                    errorState.loginError = <Translate value="login.errorInvalidEmail"/>;
                    break;
                }

                case 'auth/wrong-password':
                case 'auth/user-not-found': {
                    errorState.loginError = <Translate value="login.errorInvalidCredentials"/>;
                    break;
                }

                case 'auth/user-disabled': {
                    errorState.loginError = <Translate value="login.errorUserDisabled"/>;
                    break;
                }

                default: {
                    errorState.loginError = (
                        <span>
                            <Translate value="generalError"/>
                            <br/>
                            <Translate value="tryAgainLater"/>
                        </span>
                    );
                    break;
                }
            }

            this.setState(errorState);
        });
    }

    showRecoverDialog() {
        this.setState({isRecoverDialogVisible: true});
    }

    hideRecoverDialog() {
        this.setState({
            isRecoverDialogVisible: false,
            email: null,
            emailError: null,
            isRecoverSuccessful: false
        });
    }

    doRecover() {
        const {email} = this.state;

        const errorState = {};

        if (isEmpty(email)) {
            errorState.emailError = <Translate value="emptyField"/>;
        } else if (!isEmail(email)) {
            errorState.emailError = <Translate value="invalidEmail"/>;
        }

        if (Object.keys(errorState).length > 0) {
            this.setState(errorState);
            return;
        }

        this.setState({isRecoverLoading: true});
        this.props.firebase.resetPassword(email)
            .then(() => {
                this.setState({
                    isRecoverLoading: false,
                    isRecoverSuccessful: true,
                });
            })
            .catch(e => {
                Object.assign(errorState, {
                    isRecoverLoading: false,
                    email: null
                });

                switch (e.code) {
                    default: {
                        errorState.recoverError = (
                            <span>
                            <Translate value="generalError"/>
                            <br/>
                            <Translate value="tryAgainLater"/>
                        </span>
                        );
                        break;
                    }

                    case 'auth/user-not-found': {
                        errorState.recoverError = <Translate value="forgot.errorNoAccount"/>
                        break;
                    }
                }

                this.setState(errorState);
            });
    }

    render() {
        const {username, password, isLoginLoading, isRecoverLoading, isRecoverSuccessful, isLoginDialogVisible, isRecoverDialogVisible, loginError, usernameError, passwordError, recoverError, emailError} = this.state;

        let loginDialog = null;
        if (isLoginDialogVisible) {
            if (isLoginLoading) {
                loginDialog = (
                    <Dialog>
                        <div>
                            <Progress/>
                            <br/>
                            <br/>
                            <Translate value="login.loading"/>
                        </div>
                    </Dialog>
                );
            } else if (!isEmpty(loginError)) {
                loginDialog = (
                    <Dialog
                        title={<Translate value="login.errorTitle"/>}
                        buttons={[
                            <Button
                                key="login-btn"
                                label={<Translate value="ok"/>}
                                primary={true}
                                onClick={() => this.setState({loginError: null})}/>
                        ]}>
                        <div>{loginError}</div>
                    </Dialog>
                );
            } else {
                loginDialog = (
                    <Dialog
                        title={<Translate value="login.title"/>}
                        buttons={[
                            <Button
                                key="cancel-btn"
                                label={<Translate value="cancel"/>}
                                onClick={this.hideLoginDialog}/>,
                            <Button
                                key="login-btn"
                                label={<Translate value="loginBtn"/>}
                                primary={true}
                                onClick={this.doLogin}/>
                        ]}
                        dismissible={true}
                        onDismiss={this.hideLoginDialog}>
                        <div>
                            <Translate value="login.description"/>
                            <br/>
                            <br/>
                            <form ref="loginForm">
                                <Row className="row-input">
                                    <Column small={12}>
                                        <Input
                                            type="text"
                                            icon="user"
                                            placeholder={I18n.t('login.usernamePlaceholder')}
                                            required={true}
                                            name="username"
                                            value={username}
                                            error={usernameError}
                                            onChange={e => this.setState({
                                                username: e.target.value,
                                                usernameError: null
                                            })}
                                            onErrorDismiss={() => this.setState({usernameError: null})}
                                        />
                                    </Column>

                                    <Column small={12}>
                                        <Input
                                            type="password"
                                            icon="key"
                                            placeholder={I18n.t('login.passwordPlaceholder')}
                                            required={true}
                                            name="password"
                                            value={password}
                                            error={passwordError}
                                            onChange={e => this.setState({
                                                password: e.target.value,
                                                passwordError: null
                                            })}
                                            onErrorDismiss={() => this.setState({passwordError: null})}
                                        />
                                    </Column>
                                </Row>
                            </form>

                            <Paragraf leftIcon="envelope" className="link">
                                <span onClick={this.showRecoverDialog}><Translate value="forgot.btn"/></span>
                            </Paragraf>

                            <Paragraf leftIcon="address-card" className="link">
                                <span onClick={() => this.setState({
                                    username: "react@test.com",
                                    password: "qwerty"
                                })}>
                                    <Translate value="login.demo"/>
                                </span>
                            </Paragraf>
                        </div>
                    </Dialog>
                );
            }
        }

        let recoverDialog = null;
        if (isRecoverDialogVisible) {
            if (isRecoverLoading) {
                recoverDialog = (
                    <Dialog>
                        <div>
                            <Progress/>
                            <br/>
                            <br/>
                            <Translate value="forgot.loading"/>
                        </div>
                    </Dialog>
                );
            } else if (!isEmpty(recoverError)) {
                recoverDialog = (
                    <Dialog
                        title={<Translate value="error"/>}
                        buttons={[
                            <Button
                                key="login-btn"
                                label={<Translate value="ok"/>}
                                primary={true}
                                onClick={() => this.setState({recoverError: null})}/>
                        ]}>
                        <div>{recoverError}</div>
                    </Dialog>
                );
            } else if (isRecoverSuccessful) {
                recoverDialog = (
                    <Dialog
                        title={<Translate value="forgot.successful"/>}
                        buttons={[
                            <Button
                                key="login-btn"
                                label={<Translate value="ok"/>}
                                primary={true}
                                onClick={this.hideRecoverDialog}/>
                        ]}>
                        <Translate value="forgot.successfulDescription"/>
                        <br/>
                        <Translate value="forgot.successfulDescription2"/>
                    </Dialog>
                );
            } else {
                recoverDialog = (
                    <Dialog
                        title={<Translate value="forgot.title"/>}
                        buttons={[
                            <Button
                                key="cancel-btn"
                                label={<Translate value="cancel"/>}
                                onClick={this.hideRecoverDialog}/>,
                            <Button
                                key="login-btn"
                                label={<Translate value="recoverBtn"/>}
                                primary={true}
                                onClick={this.doRecover}/>
                        ]}
                        dismissible={true}
                        onDismiss={this.hideRecoverDialog}>
                        <div>
                            <Translate value="forgot.description"/>
                            <br/>
                            <br/>
                            <form ref="recoverForm">
                                <Row className="row-input">
                                    <Column small={12}>
                                        <Input
                                            type="text"
                                            icon="envelope"
                                            placeholder={I18n.t('login.emailPlaceholder')}
                                            required={true}
                                            name="email"
                                            error={emailError}
                                            onChange={e => this.setState({email: e.target.value})}
                                            onErrorDismiss={() => this.setState({emailError: null})}
                                        />
                                    </Column>
                                </Row>
                            </form>
                        </div>
                    </Dialog>
                );
            }
        }

        return (
            <div className="login-route">
                <Message
                    icon="lock"
                    title={<Translate value="login.page.title"/>}
                    description={<Translate value="login.page.description"/>}>
                    <ButtonGroup direction="column">
                        <Button
                            label={<Translate value="loginBtn"/>}
                            onClick={this.showLoginDialog}/>
                    </ButtonGroup>
                </Message>

                {loginDialog}
                {recoverDialog}
            </div>
        );
    }
};