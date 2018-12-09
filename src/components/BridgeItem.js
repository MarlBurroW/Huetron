import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import LockIcon from '@material-ui/icons/Lock';

import { LockOpenOutline, LockOutline, Target } from 'mdi-material-ui';

import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';

import * as linkBridgeActions from '../store/actions/linkBridgeActions';
import * as unlinkBridgeActions from '../store/actions/unlinkBridgeActions';
import * as settingsActions from '../store/actions/settingsActions';

import * as settingsSelectors from '../store/selectors/settingsSelectors';

import image from '../images/bridge.jpg';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  buttonIcon: {
    marginRight: theme.spacing.unit,
  },
  details: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

const BridgeItem = props => {
  const { classes, bridge } = props;

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography color="primary" component="h5" variant="h5">
            {bridge.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {bridge.internalipaddress}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          {bridge.username ? (
            <Button onClick={() => props.unlinkBridge(bridge)}>
              <LinkOffIcon className={classes.buttonIcon} />
              {'Unlink'}
            </Button>
          ) : (
            <Button onClick={() => props.linkBridge(bridge)}>
              <LinkIcon className={classes.buttonIcon} />
              {'Link'}
            </Button>
          )}
          {bridge.username &&
          props.currentBridge &&
          props.currentBridge.bridgeid !== bridge.bridgeid ? (
            <Button onClick={() => props.setAsCurrentBridge(bridge)}>
              <Target className={classes.buttonIcon} />
              {''}
            </Button>
          ) : (
            ''
          )}

          {bridge.username ? (
            <Chip
              avatar={
                <Avatar>
                  <LinkIcon />
                </Avatar>
              }
              color="primary"
              label="Linked"
            />
          ) : (
            ''
          )}

          {props.currentBridge &&
          props.currentBridge.bridgeid === bridge.bridgeid ? (
            <Chip
              avatar={
                <Avatar>
                  <Target />
                </Avatar>
              }
              color="primary"
              label="Current bridge"
            />
          ) : (
            ''
          )}
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={image}
        title="Live from space album cover"
      />
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    currentBridge: settingsSelectors.currentBridgeSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAsCurrentBridge: bridge =>
      dispatch(settingsActions.setCurrentBridgeIdAction(bridge.bridgeid)),
    unlinkBridge: bridge =>
      dispatch(unlinkBridgeActions.unlinkBridgeAction(bridge)),
    linkBridge: bridge => dispatch(linkBridgeActions.linkBridgeAction(bridge)),
  };
};

BridgeItem.propTypes = {
  bridge: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(BridgeItem));
