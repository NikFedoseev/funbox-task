import React, {Component} from 'react';
import { connect } from 'react-redux';
import './Routes.css'
import RoutesInputField from '../components/RoutesInputField';
import RoutesList from '../components/RoutesList';
import { addPoint, removePoint, reorganizePoints } from '../actions/routeActions'
import ControlButtons from '../components/controlButtons';

class Routes extends Component {
  state = {
    point: '',
    points: ['A','B']
  }

  addPoint(name) {
    const { addPoint } = this.props;
    if (this.props.route.points.includes(name)) {
      alert(`Point ${name} already exist`);
      return
    }
    addPoint(name);
  }

  deletePoint(name) {
    //console.log(this.props.route.points.includes(name))
    const { removePoint } = this.props;
    if (this.props.route.points.includes(name)) {
      removePoint(name);
    }
  }

  render() {
    //console.log(this.props.route.points,'1')
    return (
      <div className='routes'>
        <RoutesInputField addPoint={this.addPoint.bind(this)}/>
        <ControlButtons/>
        <RoutesList points={this.props.route.points} deletePoint={this.deletePoint.bind(this)}/>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    route: store.route
  }
}

const mapDispatchToProps = dispatch => ({
  addPoint: point => dispatch(addPoint(point)),
  removePoint: point => dispatch(removePoint(point)),
  reorganizePoints: points => dispatch(reorganizePoints(points))
})


export default connect(mapStateToProps, mapDispatchToProps)(Routes);