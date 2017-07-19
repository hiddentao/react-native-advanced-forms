import React, { Component, PropTypes } from 'react'
import { TextInput as NativeTextInput } from 'react-native'

import { scrollToComponentInScrollView } from '../utils'
import styles from './styles'

export default class TextInput extends Component {
  render () {
    const {
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

FormTextInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  style: PropTypes.object,
  errorStyle: PropTypes.object,
}

FormTextInput.defaultProps = {
  error: null,
}
