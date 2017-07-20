import React, { Component, Children, cloneElement, PropTypes } from 'react'
import { View } from 'react-native'

import { componentsCall } from '../utils'

export default class Layout extends Component {
  render () {
    const { children, style, ...props } = this.props

    let i = 0
    const kids = Children.map(children, c => cloneElement(c, {
      ...props,
      ref: `child${i++}`
    }))

    return (
      <View style={style}>
        {kids}
      </View>
    )
  }

  unfocusFields () {
    componentsCall(this.refs, 'unfocusFields')
  }

  focusField (name) {
    componentsCall(this.refs, 'focusField', name)
  }

  showFieldError (name, error) {
    componentsCall(this.refs, 'showFieldError', name, error)
  }

  collectFieldValues (obj) {
    componentsCall(this.refs, 'collectFieldValues', obj)
  }
}

Layout.propTypes = {
  style: PropTypes.any,
}
