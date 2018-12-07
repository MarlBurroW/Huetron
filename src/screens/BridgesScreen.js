// Libs
import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import posed, { PoseGroup } from 'react-pose';

//  Material components
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// App components
import LinkBridgeDialog from '../components/LinkBridgeDialog';
import BridgeItem from '../components/BridgeItem';

// Actions
import * as discoverBridgesActions from '../store/actions/discoverBridgesActions';
import * as linkBridgeActions from '../store/actions/linkBridgeActions';

// Selectors
import * as discoverBridgesSelectors from '../store/selectors/discoverBridgesSelectors';

const BridgeItemPosed = posed.div({
  enter: {
    x: '0%',
    delay: ({ i }) => i * 100,
  },
  exit: { x: '500%' },
});

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
          <PoseGroup>
            {this.props.bridges.map((bridge, i) => (
              <BridgeItemPosed i={i} key={bridge.bridgeid}>
                <BridgeItem bridge={bridge} />
              </BridgeItemPosed>
            ))}
          </PoseGroup>
        </div>
        <LinkBridgeDialog />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bridges: discoverBridgesSelectors.mergedBridgesSelector(state),
    fetching: discoverBridgesSelectors.isDiscoveringSelector(state),
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
