import React, {Component} from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Auxx';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  constructor(props) {
    super(props);
    console.log("[App.js] - Inside constructor function");
  }

  componentWillMount() {
    console.log("[App.js] - Inside componentWillMount function");
  }

  componentDidMount() {
    console.log("[App.js] - Inside componentDidMount function");
  }

  componentWillReceiveProps (nextProps) {
    console.log("[UPDATE App.js] - Inside componentWillReceiveProps function", nextProps);
  }
  // shouldComponentUpdate (nextProps, nextState) {
  //   console.log("[UPDATE App.js] - Inside shouldComponentUpdate function", nextProps, nextState);
  //   return nextState.persons !== this.state.persons ||
  //     nextState.showPersons !== this.state.showPersons;
  // }
  componentDidUpdate () {
    console.log("[UPDATE App.js] - Inside componentDidUpdate function");
  }
  shouldComponentUpdate(nextprops, nextState) {
    return nextprops.show !== this.props.show || nextprops.children !== this.props.children;
  }
  componentWillUpdate () {
    console.log("[Modal.js]-- will update");
  }

  render () {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.props.children}
        </div>
      </Aux>
    );
  }
};

export default Modal;
