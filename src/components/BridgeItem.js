import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import LockIcon from '@material-ui/icons/Lock';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

import * as linkBridgeActions from '../store/actions/linkBridgeActions';

import image from '../images/bridge.jpg';

const styles = theme => ({
  card: {
    display: 'flex',
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
          <IconButton
            onClick={() => props.linkBridge(bridge)}
            aria-label="Next"
          >
            <LockIcon />
          </IconButton>
          {bridge.username ? (
            <Chip
              label="Authorized"
              onDelete={() => {}}
              className={classes.chip}
              color="primary"
              deleteIcon={<DoneIcon />}
              variant="outlined"
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
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    linkBridge: discoveredDridge =>
      dispatch(linkBridgeActions.linkBridgeAction(discoveredDridge)),
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
