import { cube } from './math.js'
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap'


const component = (val) => {
  var element = document.createElement('pre')

  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5)
  ].join('\n\n')
  return element
}

document.body.appendChild(component())
