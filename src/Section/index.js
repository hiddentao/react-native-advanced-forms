import React, { Component, PropTypes } from 'react'
import { Text, View } from 'react-native'

import Layout from '../Layout'
import styles from './styles'

export default class Section extends Component {
  render () {
    const {
      children,
      title,
      style,
      layoutStyle,
      titleTextStyle,
      ...props
    } = this.props

    return (
      <View style={style || styles.container}>
        <Text style={titleTextStyle || styles.title}>{title}</Text>
        <Layout {...props} ref="layout" style={layoutStyle || styles.layout}>
          {children}
        </Layout>
      </View>
    )
  }

  unfocusFields () {
    this.refs.layout.unfocusFields()
  }

  focusField (name) {
    this.refs.layout.focusField(name)
  }

  collectFieldValues (obj) {
    this.refs.layout.collectFieldValues(obj)
  }

  showFieldError (name, err) {
    this.refs.layout.showFieldError(name, err)
  }
}

Section.propTypes = {
  title: PropTypes.string,
  style: PropTypes.any,
  titleTextStyle: PropTypes.any,
  layoutStyle: PropTypes.any,
}
