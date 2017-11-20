import React, { Component } from 'react'
import { View, Text } from 'react-native'

import styles from './styles'

export default class Label extends Component {
  render () {
    const {
      style,
      textStyle,
    } = this.props

    return (
      <View style={style || styles.container}>
        <Text style={textStyle || styles.text}>
          {this.props.children}
        </Text>
      </View>
    )
  }
}

Label.propTypes = {
  style: PropTypes.any,
  textStyle: PropTypes.any,
}
