import React from 'react';

import { connect } from 'react-redux';
import { fetchBrdigeIPAction } from '../store/actions/discoverBridgesActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

class DiscoverBridgesScreen extends React.Component {
  componentDidMount() {
    this.props.fetchBridges();
  }

  render() {
    return (
      <div>
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBridges: () => dispatch(fetchBrdigeIPAction()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscoverBridgesScreen);
