import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { useMappedState, useDispatch } from "redux-react-hook";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LinearProgress from "@material-ui/core/LinearProgress";

import SandboxIcon from "@material-ui/icons/BugReport";

import Content from "../../Components/Content/Content";

import { getBunqApiKeys, selectBunqApiKey } from "../../Redux/Actions/bunq_api_keys";

const styles = theme => ({
    gridItemRight: {
        textAlign: "right"
    }
});

const mapState = state => ({
    bunqApiKeys: state.bunq_api_keys.bunq_api_keys,
    bunqApiKeysLoading: state.bunq_api_keys.loading
});

const BunqApiKeys = ({ classes }) => {
    const dispatch = useDispatch();
    const { bunqApiKeys, bunqApiKeysLoading } = useMappedState(mapState);

    const bunqApiKeyListItems = Object.keys(bunqApiKeys).map(identifier => {
        const storedKey = bunqApiKeys[identifier];

        return (
            <ListItem button key={identifier} onClick={() => dispatch(selectBunqApiKey(identifier))}>
                <ListItemText
                    primary={storedKey.deviceName}
                    secondary={storedKey.errorState ? "Has errors" : "Active and ready"}
                />
                <ListItemSecondaryAction>
                    <ListItemIcon>{storedKey.environment === "SANDBOX" ? <SandboxIcon /> : null}</ListItemIcon>
                </ListItemSecondaryAction>
            </ListItem>
        );
    });

    return (
        <Content title="bunqAutomation - API key overview">
            <Grid container spacing={16}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" style={{ marginBottom: 16 }}>
                        bunq API keys
                    </Typography>

                    <Paper style={{ padding: 12 }}>
                        <Typography variant="h5" onClick={() => dispatch(getBunqApiKeys())}>
                            btn
                        </Typography>

                        {bunqApiKeysLoading && <LinearProgress />}

                        <List>{bunqApiKeyListItems}</List>
                    </Paper>
                </Grid>
            </Grid>
        </Content>
    );
};

export default withStyles(styles)(BunqApiKeys);
