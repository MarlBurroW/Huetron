import React from 'react';

import { connect } from 'react-redux';
import { fetchBridgeIPAction } from '../store/actions/discoverBridgesActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

import { discoverBridgesThunk } from '../thunks/discoverBridgesThunks';

class DiscoverBridgesScreen extends React.Component {
  componentDidMount() {
    this.props.fetchBridges();
  }

  render() {
    return (
      <div>
        <div>
          {this.props.fetching ? <LinearProgress color="primary" /> : ''}
          <Button
            variant="contained"
            color="primary"
            onClick={this.props.fetchBridges}
          >
            {this.props.fetching ? (
              <CircularProgress color="accent" size={18} /> // Size 14 works pretty well
            ) : (
              'REFRESH'
            )}
          </Button>
        </div>

        <List dense={true}>
          {this.props.bridges.map(bridge => (
            <ListItem key={bridge.bridgeid}>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={bridge.name} />
              <ListItemSecondaryAction>
                <IconButton aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bridges: state.discoveredBridges.bridges,
    fetching: state.discoveredBridges.fetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBridges: () => dispatch(discoverBridgesThunk()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscoverBridgesScreen);
