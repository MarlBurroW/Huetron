import React from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import * as linkBridgeSelectors from '../store/selectors/linkBridgeSelectors';
import * as linkBridgeActions from '../store/actions/linkBridgeActions';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

const LinkBridgeDialog = props => (
  <Dialog
    open={props.bridgeToLink ? true : false}
    keepMounted
    onClose={props.cancelBridgeLink}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle id="alert-dialog-slide-title">
      {"Use Google's location service?"}
    </DialogTitle>
    <DialogContent>
      {JSON.stringify(props.countDown)}

      <CircularProgress
        size={200}
        thickness={1}
        className={props.classes.progress}
        variant="static"
        value={(props.countDown / 30) * 100}
      />
    </DialogContent>
    <DialogActions />
  </Dialog>
);

const mapStateToProps = state => {
  return {
    countDown: linkBridgeSelectors.countDown(state),
    bridgeToLink: linkBridgeSelectors.bridgeToLink(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cancelBridgeLink: () =>
      dispatch(linkBridgeActions.linkBridgeCancelAction()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LinkBridgeDialog));
