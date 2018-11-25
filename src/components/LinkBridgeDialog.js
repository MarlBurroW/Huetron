import React from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as linkBridgeSelectors from '../store/selectors/linkBridgeSelectors';

import {
  linkBridgeThunk,
  cancelBridgeLinkThunk,
} from '../store/thunks/linkBridgeThunks';

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
      <DialogContentText id="alert-dialog-slide-description">
        Let Google help apps determine location. This means sending anonymous
        location data to Google, even when no apps are running.
        {JSON.stringify(props.countDown)}
      </DialogContentText>
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
    cancelBridgeLink: () => dispatch(cancelBridgeLinkThunk()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkBridgeDialog);
