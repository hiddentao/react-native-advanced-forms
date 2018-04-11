import React, { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import styles from './styles'
import utils, { componentsCall, VALIDATION_RESULT } from './utils'

export default class Form extends Component {
  render () {
    const { children, style } = this.props

    let i = 0
    const kids = Children.map(children, c => (!c) ? null : cloneElement(c, {
      ref: `child${i++}`,
      onSubmit: this.onSubmitField,
      onChange: this.onChangeField
    }))

    return (
      <View style={style || styles.container}>
        {kids}
      </View>
    )
  }

  validateAndSubmit () {
    this.onSubmitField()
  }

  unfocus () {
    componentsCall(this.refs, 'unfocusFields')
  }

  canSubmit () {
    // get current field values
    const values = this.getValues()
    // validate field values
    const badFields = validate(values) || {}

    return !(Object.keys(badFields).length)
  }

  onSubmitField = (submittedFieldName) => {
    const {
      validate,
      onSubmit,
      onFocusField,
      onValidationError
    } = this.props

    // was whole form submitted rather than submit a single input?
    const submittedWholeForm = !submittedFieldName

    // get current field values
    const values = this.getValues()
    // validate field values
    const badFields = validate(values) || {}
    // get names of fields which failed validation
    const badFieldNames = Object.keys(badFields)

    // if some fields failed validation
    if (badFieldNames.length) {
      onValidationError && onValidationError(badFieldNames)

      // highlight incorrect fields
      badFieldNames.forEach(f => {
        const fieldValidationResult = badFields[f]

        // only count missing fields if we submitted the form as a whole
        if (VALIDATION_RESULT.MISSING !== fieldValidationResult || submittedWholeForm) {
          componentsCall(this.refs, 'showFieldError', f, fieldValidationResult)
        }
      })

      // focus on first erroneous field
      const firstBadFieldName = badFieldNames.shift()

      // trigger pre-focus callback
      const _focusCall = () =>
        setTimeout(() => componentsCall(this.refs, 'focusField', firstBadFieldName), 0)

      onFocusField
        ? onFocusField(firstBadFieldName, _focusCall)
        : _focusCall()

    } else {
      onSubmit(values)
    }
  }

  onChangeField = (fieldName, newValues) => {
    const {
      onChange
    } = this.props

    const values = this.getValues()

    values[fieldName] = newValues

    onChange(values)
  }

  getValues () {
    const ret = {}

    componentsCall(this.refs, 'collectFieldValues', ret)

    return ret
  }
}

Form.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  onValidationError: PropTypes.func,
  onFocusField: PropTypes.func,
  style: PropTypes.any,
}

Form.utils = utils
Form.VALIDATION_RESULT = VALIDATION_RESULT

import Field from './Field'
import Label from './Label'
import LabelGroup from './LabelGroup'
import Layout from './Layout'
import Section from './Section'
import TextField from './TextField'

Form.Field = Field
Form.Label = Label
Form.LabelGroup = LabelGroup
Form.Layout = Layout
Form.Section = Section
Form.TextField = TextField
