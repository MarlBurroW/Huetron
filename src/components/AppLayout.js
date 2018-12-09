import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { LightbulbOutline } from 'mdi-material-ui';
import { Link } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';

import Tooltip from '@material-ui/core/Tooltip';

import * as settingsSelectors from '../store/selectors/settingsSelectors';
import * as settingsActions from '../store/actions/settingsActions';

const drawerWidth = 240;

const menu = [
  {
    identifier: 'bridges',
    tooltip: 'Bridges',
    to: '/bridges',
    icon: <LightbulbOutline />,
  },
];

const styles = theme => ({
  root: {
    display: 'flex',
  },
  currentBridgeFormControl: {
    width: 200,
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },

  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
  },
});

class AppLayout extends React.Component {
  state = {
    open: false,
  };

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar>
            <Typography
              className={classes.grow}
              variant="h6"
              color="inherit"
              noWrap
            >
              ChromeHue
            </Typography>
            {this.props.currentBridgeId &&
            this.props.linkedBridges.length > 0 ? (
              <FormControl
                className={classes.currentBridgeFormControl}
                variant="filled"
              >
                <InputLabel htmlFor="current-bridge">Current Bridge</InputLabel>
                <Select
                  value={this.props.currentBridgeId}
                  input={<FilledInput id="current-bridge" />}
                  onChange={event => {
                    this.props.setCurrentBridgeId(event.target.value);
                  }}
                >
                  {this.props.linkedBridges.map(bridge => (
                    <MenuItem key={bridge.bridgeid} value={bridge.bridgeid}>
                      {bridge.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              ''
            )}
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar} />

          <List>
            {menu.map(item => (
              <Tooltip
                key={item.identifier}
                placement="right"
                title={item.tooltip}
              >
                <ListItem button component={Link} to={item.to}>
                  <ListItemIcon>
                    <LightbulbOutline />
                  </ListItemIcon>
                </ListItem>
              </Tooltip>
            ))}
          </List>
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    linkedBridges: settingsSelectors.linkedBridgesSelector(state),
    currentBridgeId: settingsSelectors.currentBridgeIdSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentBridgeId: bridgeid =>
      dispatch(settingsActions.setCurrentBridgeIdAction(bridgeid)),
  };
};

AppLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(AppLayout));
