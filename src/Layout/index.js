import React, { Component, Children, cloneElement } from 'react'
import { View } from 'react-native'

import { componentsCall } from '../utils'

export default class View extends Component {
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
    batchExec(this.refs, 'unfocusFields')
  }

  focusOnField (name) {
    batchExec(this.refs, 'focusOnField', name)
  }

  showFieldError (name) {
    batchExec(this.refs, 'showFieldError', name)
  }

  addFieldValueTo (obj) {
    batchExec(this.refs, 'addFieldValueTo', obj)
  }
}
