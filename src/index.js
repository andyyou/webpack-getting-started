import _ from 'lodash'

const component = (val) => {
  var element = document.createElement('div')
  element.innerHTML = _.join(['Hello', 'webpack', val], ' ')

  return element
}

document.body.appendChild(component('Yo!'));
