// Libs
import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

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

import LinkBridgeDialog from '../components/LinkBridgeDialog';
import BridgeItem from '../components/BridgeItem';

// Actions
import * as discoverBridgesActions from '../store/actions/discoverBridgesActions';
import * as linkBridgeActions from '../store/actions/linkBridgeActions';

// Selectors
import * as linkBridgeSelectors from '../store/selectors/linkBridgeSelectors';
import { mergedBridges } from '../store/selectors/bridgeSelectors';

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 2,
  },
});

class BridgesScreen extends React.Component {
  componentDidMount() {
    this.props.fetchBridges();
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
        <div className={classes.container}>
          {this.props.bridges.map(bridge => (
            <BridgeItem bridge={bridge} key={bridge.bridgeid} />
          ))}

          <LinkBridgeDialog />
        </div>
        {JSON.stringify(this.props.bridges)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bridges: mergedBridges(state),
    fetching: state.discoveredBridges.fetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBridges: () =>
      dispatch(discoverBridgesActions.discoverBridgesAction()),
    linkBridge: discoveredDridge =>
      dispatch(linkBridgeActions.linkBridgeAction(discoveredDridge)),
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BridgesScreen)
);
