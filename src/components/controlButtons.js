import React, {Component} from 'react';
import { connect } from 'react-redux';
import './controlButtons.css';
import { changeType } from '../actions/routeActions';

class ControlButtons extends Component {

  onChangeType (e) {
    const { changeType } = this.props;
    const type = e.currentTarget.firstChild.dataset.type;
    if (type) {
      changeType(type);
    }
  }

  render () {
    console.log(this.props)
    return (
      <div className='control-buttons'>
      {
        this.props.types.map(el => {
        return (
          <div onClick={this.onChangeType.bind(this)} className={`control-button-inner ${(el == this.props.activeType) ? 'active' : ''}`}>
            <div 
              className={`control-button control-button-${el}`}
              data-type={el}
              
            >
            </div>
          </div>
        )
      })
      }
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    activeType: store.route.activeType,
    types: store.route.types
  }
}

const mapDispatchToProps = dispatch => ({
  changeType: type => dispatch(changeType(type))
})


export default connect(mapStateToProps, mapDispatchToProps)(ControlButtons);