import React, { Component, PropTypes } from 'react'
import { TextInput as NativeTextInput } from 'react-native'

import { scrollToComponentInScrollView } from '../utils'
import styles from './styles'

export default class TextField extends Component {
  render () {
    const {
      value,
      onChange,
      onSubmit,
      error,
      style,
      errorStyle,
      ...props
    } = this.props

    return (
      <NativeTextInput
        {...props}
        value={value}
        style={error ? (errorStyle || styles.error) : (style || styles.normal)}
        ref="nativeField"
        onChangeText={onChange}
        onFocus={this.onFocus}
        onSubmitEditing={onSubmit}
      />
    )
  }

  onFocus = () => {
    const { getParentScrollView } = this.props

    if (getParentScrollView) {
      const parentScrollView = getParentScrollView()

      if (parentScrollView) {
        scrollToComponentInScrollView(
          parentScrollView, this.refs.nativeField
        )
      }
    }
  }

  focus () {
    this.refs.nativeField.focus()
  }

  unfocus () {
    this.refs.nativeField.blur()
  }

  getValue () {
    return this.props.value
  }
}

TextField.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  getParentScrollView: PropTypes.func,
  error: PropTypes.any,
  style: PropTypes.any,
  errorStyle: PropTypes.any,
}

TextField.defaultProps = {
  error: null,
  value: '',
}
