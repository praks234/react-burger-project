import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Auxx';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { logout } from '../../store/actions/auth';

class Layout extends Component {

  state = {
    showSideDrawer: false
  };

  sideDrawerToggleHadler =() => {
    this.setState((prevState, props) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    })
  }

  sideDrawerClosedHadler = () => {
    this.setState({showSideDrawer:false});
  }

  render () {
    return (
      <Aux>
        <Toolbar 
          isAuth={this.props.isAuthenticated} 
          open={this.sideDrawerToggleHadler}/>
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHadler} />
        <main className = {classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }

};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
