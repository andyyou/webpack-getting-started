import _ from 'lodash'
import './stylesheets/base.css'
import WebpackLogoImageSource from './images/webpack-logo.png'
import Sheet from './excels/example.xlsx'

const component = (val) => {
  var element = document.createElement('div')
  element.innerHTML = _.join(['Hello', 'webpack', val], ' ')
  element.classList.add('text-danger')

  var webpackLogoImage = new Image()
  webpackLogoImage.src = WebpackLogoImageSource
  element.insertAdjacentElement('afterbegin', webpackLogoImage)
  return element
}

const lsExcel = () => {
  var table = document.createElement('table')
  Sheet[0].data.forEach(function (row) {
    var tr = document.createElement('tr')
    row.forEach(function (content) {
      var td = document.createElement('td')
      var txtnode = document.createTextNode(content)
      td.appendChild(txtnode)
      tr.appendChild(td)
    })
    table.appendChild(tr)
  })
  return table
}

document.body.appendChild(component('Yo!!'))
document.body.appendChild(lsExcel())
