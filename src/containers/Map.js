import React, {Component} from 'react';
import { connect } from 'react-redux';
import './Map.css'
import { dragPoint } from '../actions/routeActions';


class Map extends Component {

  state = {
    map: false
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad.bind(this));
  }

  handleLoad() {
    const { activeType } = this.props.route;
    if (this.state.mapLoaded === true) return
    window.ymaps.ready(() => {
      this.localMap = new window.ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 9,
      },{
        maxZoom: 18
      });
      this.setState({
        mapLoaded: true
      })
      const model = {
        referencePoints: [...this.props.route.points]
      };
      const options = {
        boundsAutoApply: true,
        wayPointDraggable: true,
      };
      this.multiRoute = new window.ymaps.multiRouter.MultiRoute(model, options);
      this.localMap.geoObjects.add(this.multiRoute);
      this.multiRoute.getWayPoints().each( (point) =>  console.log(this) );
      this.multiRoute.events.once("boundschange", this.setView.bind(this));
      this.multiRoute.events.add('dragend', (event) => this.reGeo(event))
      this.multiRoute.model.setParams({
        routingMode: activeType
      });
      window.addEventListener('resize', this.fitMap.bind(this));
      console.log(this.props.route.type);
      //enableButtons(this.localMap, this.multiRoute);
    });
    
  }

  fitMap() {
    if (this.multiRoute.getWayPoints().toArray().length === 0) return 
    this.localMap.setBounds(this.multiRoute.getBounds(), { checkZoomRange:true });
  }

  reGeo(event) {
    const self = this;
    const { dragPoint } = this.props;
    this.multiRoute.getWayPoints().each(function (point) {
      const coords = point.properties.get('coordinates').reverse();
      window.ymaps.geocode(coords).then(function (res) {
        const firstGeoObject = res.geoObjects.get(0);
        self.setCustomBaloon(point);
        dragPoint({
          id: point.properties.get('index'),
          addr: firstGeoObject.getAddressLine()
        })  
      })
    });
  }

  setPoints (points) {

    const referencePoints = [...points];
    return referencePoints;
  }

  setView (event) {
    if (this.multiRoute.getWayPoints().toArray().length === 0) return 
    this.multiRoute.getWayPoints().each( (point) => {
      this.setCustomBaloon(point);
    })
    this.localMap.setBounds(this.multiRoute.getBounds(), { checkZoomRange:true });
  }

  setCustomBaloon (point) {
    window.ymaps.geoObject.addon.balloon.get(point);
    point.options.set({
      balloonContentLayout: window.ymaps.templateLayoutFactory.createClass(
        '{{ properties.address|raw }}'
      )
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.route.points) return
    if (nextProps.route.activeType) this.changeType(nextProps.route.activeType)
    this.multiRoute.model.setReferencePoints(this.setPoints(nextProps.route.points));
    this.multiRoute.events.once("boundschange", this.setView.bind(this));
    
    
  }

  changeType(type) {
    this.multiRoute.model.setParams({
      routingMode: type
    });
  }


  render() {
    return (
      <div id='map'></div>
    )
  }
}

const mapStateToProps = store => {
  return {
    route: store.route
  }
}

const mapDispatchToProps = dispatch => ({
  dragPoint: point => dispatch(dragPoint(point))
})

export default connect(mapStateToProps, mapDispatchToProps)(Map);