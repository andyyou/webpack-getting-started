import _ from 'lodash'
import './stylesheets/base.css'
import WebpackLogoImageSource from './images/webpack-logo.png'

const component = (val) => {
  var element = document.createElement('div')
  element.innerHTML = _.join(['Hello', 'webpack', val], ' ')
  element.classList.add('text-danger')

  var webpackLogoImage = new Image()
  webpackLogoImage.src = WebpackLogoImageSource
  element.insertAdjacentElement('afterbegin', webpackLogoImage)

  return element
}

document.body.appendChild(component('Yo!!'));
