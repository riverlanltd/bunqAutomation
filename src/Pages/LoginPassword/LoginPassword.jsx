import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useMappedState, useDispatch } from "redux-react-hook";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import MinimalContent from "../../Components/MinimalContent/MinimalContent";
import ThemedLogo from "../../Components/ThemedLogo";

import { loginWithPassword } from "../../Redux/Actions/authentication";

const styles = theme => ({
    root: {
        width: 280,
        textAlign: "center"
    },
    image: {
        width: "60%"
    },
    textField: {
        width: "100%",
        marginBottom: 8
    },
    button: {
        width: "100%",
        marginBottom: 8
    }
});

const mapState = state => ({
    darkMode: state.theme.darkMode,

    bunqApiKeys: state.bunq_api_keys.bunq_api_keys,
    bunqApiKeysLoading: state.bunq_api_keys.loading,

    apiKey: state.authentication.api_key,

    serverStatusChecked: state.server_status.checked,
    serverStatus: state.server_status.status
});

const LoginPassword = ({ classes }) => {
    const dispatch = useDispatch();
    const { darkMode, bunqApiKeys, bunqApiKeysLoading, serverStatus, serverStatusChecked, apiKey } = useMappedState(
        mapState
    );

    const [password, setPassword] = useState("testpassword1234");

    const themedLogo = ThemedLogo(darkMode);

    if (!bunqApiKeys && !bunqApiKeysLoading && serverStatusChecked && serverStatus === "STATUS_FIRST_INSTALL") {
        return <Redirect to="/setup" />;
    }

    // console.log(serverStatusChecked, apiKey, serverStatus);
    if (bunqApiKeys && !bunqApiKeysLoading && serverStatusChecked && apiKey && serverStatus === "STATUS_API_READY") {
        return <Redirect to="/" />;
    }

    return (
        <MinimalContent title="bunqAutomation - Login">
            <form className={classes.root}>
                <img className={classes.image} alt="bunqAutomation logo" src={themedLogo} />
                <TextField
                    className={classes.textField}
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disabled={!password || password.length < 8 || serverStatus === "DISCONNECTED"}
                    onClick={() => dispatch(loginWithPassword(password))}
                >
                    Login
                </Button>
            </form>
        </MinimalContent>
    );
};

export default withStyles(styles)(LoginPassword);
