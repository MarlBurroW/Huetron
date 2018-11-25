import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

class BridgeItem extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Card>
        <div>
          <CardContent>
            <Typography component="h5" variant="h5">
              {this.props.bridge.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {this.props.bridge.internalipaddress}
            </Typography>
          </CardContent>
        </div>
      </Card>
    );
  }
}

BridgeItem.propTypes = {
  bridge: PropTypes.object.isRequired,
};

export default BridgeItem;
