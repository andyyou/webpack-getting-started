import _ from 'lodash'
import './stylesheets/base.css'

const component = (val) => {
  var element = document.createElement('div')
  element.innerHTML = _.join(['Hello', 'webpack', val], ' ')
  element.classList.add('text-danger')
  return element
}

document.body.appendChild(component('Yo!!'));
