import React from 'react'
import { Button, Alert, StyleSheet, Text, View } from 'react-native'

import Form from './src'

export default class App extends React.Component {
  constructor (props, ctx) {
    super(props, ctx)

    this.state = {
      firstName: null,
      lastName: null,
      age: null,
      country: null,
    }
  }

  render() {
    const {
      firstName, lastName, age, country, validated
    } = this.state

    return (
      <View style={styles.container}>
        <Form ref="form" onChange={this.onChange} onSubmit={this.onSubmit} validate={this.validate}>
          <Form.Layout style={styles.row}>
            <Form.Layout style={styles.columns}>
              <Form.Field name="firstName" label="First name" style={styles.field}>
                <Form.TextField value={firstName} />
              </Form.Field>
              <Form.Field name="lastName" label="Last name" style={styles.field}>
                <Form.TextField value={lastName} />
              </Form.Field>
            </Form.Layout>
          </Form.Layout>
          <Form.Layout style={styles.row}>
            <Form.Field name="age" label="Age" style={styles.ageField}>
              <Form.TextField value={age} keyboardType='numeric'/>
            </Form.Field>
          </Form.Layout>
          <Form.Layout style={styles.row}>
            <Form.Field name="country" label="Country" style={styles.field}>
              <Form.TextField value={country} />
            </Form.Field>
          </Form.Layout>
        </Form>
        <View style={styles.button}>
          <Button
            onPress={() => this.refs.form.validateAndSubmit()}
            title="Submit"
            color="#841584"
          />
        </View>
      </View>
    )
  }

  onChange = (values) => {
    this.setState({
      ...values,
    })
  }

  onSubmit = (values) => {
    Alert.alert('Submitted: ' + JSON.stringify(values))
  }

  validate = (values) => {
    const ret = Object.keys(this.state).reduce((m, v) => {
      if (!values[v] || !values[v].length) {
        m[v] = Form.VALIDATION_RESULT.MISSING
      }
      return m
    }, {})

    if (!ret.age && isNaN(values.age)) {
      ret.age = Form.VALIDATION_RESULT.INCORRECT
    }

    return ret
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100,
    paddingHorizontal: 30
  },
  row: {
    marginBottom: 20,
  },
  columns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  field: {
    marginRight: 10,
  },
  ageField: {
    width: 60,
  },
  button: {
    width: 80,
    marginTop: 15,
  },
  error: {
    marginTop: 10,
  },
  errorMsg: {
    color: 'red'
  }
})
