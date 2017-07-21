import React, { Component, PropTypes } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import ModalPicker from 'react-native-modal-filter-picker'

export default class Dropdown extends Component {
  constructor (props) {
    super(props)

    this.state = {
      picking: false
    }
  }

  render () {
    const {
      options,
      selected,
      placeholderText,
      error,
    } = this.props

    const { picking } = this.state

    const selectedItem = options.find(({key}) => key === selected)

    const touchableStyle = (error) ? styles.error : styles.normal

    const buttonTextStyle = selectedItem ? styles.selectedValueText : styles.placeholderText

    return (
      <View style={styles.containerStyle}>
        <ModalPicker
          title={placeholderText}
          visible={picking}
          options={options}
          onSelect={this.onSelect}
          onCancel={this.onHide} />
        <TouchableOpacity style={touchableStyle} onPress={this.onShow}>
          <Text style={buttonTextStyle}>
            {selectedItem ? selectedItem.label : placeholderText}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  onSelect = (value) => {
    this.setState({
      picking: false
    }, () => {
      this.props.onChange(value)
    })
  }

  onShow = () => {
    this.setState({
      picking: true
    })
  }

  onHide = () => {
    this.setState({
      picking: false
    })
  }

  unfocus () {
    /* do nothing */
  }

  focus () {
    this.setState({
      picking: true
    })
  }

  getValue () {
    return this.props.selected
  }
}


const styles = StyleSheet.create({
  selectedValueText: {
    color: '#000'
  },
  placeholderText: {
    color: '#999',
    fontStyle: 'italic',
  },
  error: {
    padding: 10,
    backgroundColor: '#faa',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
  },
  normal: {
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
  },
})
