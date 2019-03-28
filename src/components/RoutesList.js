import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RoutesList.css'
import DragDrop from '../utils/dragndrop'
import { reorganizePoints } from '../actions/routeActions';

class RoutesList extends Component {

  componentDidMount() {
    const container = document.querySelector('.list-container');
    new DragDrop (container, this.isReorganize.bind(this));
  }

  componentWillReceiveProps (nextProps) {
  }

  deletePoint(e, cb) {
    e.preventDefault();
    /*const container = document.querySelector('.list-container');
    container.removeChild(e.target.parentNode);*/
    const name = e.target.parentNode.innerText.trim();
    cb(name);
  }

  isReorganize() {
    const { reorganizePoints } = this.props;
    const points = [].map.call(document.querySelectorAll('.list-item'), (el, i) => {
      return el.innerText;
    });
    reorganizePoints(points);
  }

  render () {
    const points = this.props.points;
    return (
      <div className='routes-list'>
        <ul className='list-container'>
          {
            points.map((el, i) => {
              return <li className='list-item' key={i} draggable="true">
              {el}
              <i className='list-item-icon' onClick={(e) => this.deletePoint(e,this.props.deletePoint)}></i>
              </li>
            })
          }
        </ul>
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
  reorganizePoints: points => dispatch(reorganizePoints(points))
})

export default connect(mapDispatchToProps, mapDispatchToProps)(RoutesList);