// Libs
import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
//  Material components
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import LockIcon from '@material-ui/icons/Lock';
import { ServerMinus as ServerMinusIcon } from 'mdi-material-ui';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import BridgeItem from '../components/BridgeItem';

// Thunks
import { discoverBridgesThunk } from '../store/thunks/discoverBridgesThunks';
import { linkBridgeThunk } from '../store/thunks/linkBridgeThunks';

// Selectors
import * as linkBridgeSelectors from '../store/selectors/linkBridgeSelectors';

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 2,
  },
});

class BridgesScreen extends React.Component {
  componentDidMount() {
    this.props.fetchBridges();
  }

  formatBridgeCount(bridges) {
    switch (bridges.length) {
      case 0:
        return 'No unlinked brdige found on your local network';

      case 1:
        return '1 Unlinked bridge found on your local network';

      default:
        return `${bridges.length} Unlinked bridges found on your local network`;
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={24} className={classes.container}>
          <Grid item>
            <Typography variant="h5">Bridges</Typography>
          </Grid>
          <Grid item>
            <Button onClick={this.props.fetchBridges}>
              {this.props.fetching ? (
                <CircularProgress color="primary" size={18} /> // Size 14 works pretty well
              ) : (
                'REFRESH'
              )}
            </Button>
          </Grid>
        </Grid>

        <List
          component="nav"
          subheader={
            <ListSubheader component="div">
              {this.formatBridgeCount(this.props.bridges)}
            </ListSubheader>
          }
        >
          {this.props.bridges.map(bridge => (
            <ListItem key={bridge.bridgeid}>
              <ListItemIcon>
                <ServerMinusIcon />
              </ListItemIcon>
              <ListItemText inset primary={bridge.name} />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => this.props.linkBridge(bridge)}
                  aria-label="Delete"
                >
                  <LockIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          <Dialog
            open={this.props.bridgeToLink ? true : false}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
              </DialogContentText>
            </DialogContent>
            <DialogActions />
          </Dialog>
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bridges: state.discoveredBridges.bridges,
    fetching: state.discoveredBridges.fetching,
    bridgeToLink: linkBridgeSelectors.bridgeToLink(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBridges: () => dispatch(discoverBridgesThunk()),
    linkBridge: bridge => dispatch(linkBridgeThunk(bridge)),
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BridgesScreen)
);
