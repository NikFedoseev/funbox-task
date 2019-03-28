import React, {Component} from 'react';
import { connect } from 'react-redux';
import './RoutesInputField.css';

class RoutesInputField extends Component {
  addPoint(e, cb) {
    if(e.keyCode != 13) return
    this.geocode(e.target);
    const value = e.target.value.trim();
    cb(value);
    e.target.value = '';
  }

  componentDidMount() {
    window.addEventListener('load', this.initSuggestions);
  }

  geocode(el) {

  }

  initSuggestions() {
    //console.log(this.ymaps);
    window.ymaps.ready(() => {
      const suggestView = new window.ymaps.SuggestView('suggest')
    })
  }

  render() {
    return (
      <div className='route-input-field'>
        <input 
          type='text'
          className='route-input'
          id='suggest'
          placeholder='Москва, ул. Арбат'
          onKeyUp={(e) => this.addPoint(e, this.props.addPoint)}
          >
        </input>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    route: store.route
  }
}

export default connect(mapStateToProps)(RoutesInputField);