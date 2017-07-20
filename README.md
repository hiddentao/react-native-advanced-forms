# react-native-advanced-forms

[![npm](https://img.shields.io/npm/v/react-native-advanced-forms.svg?maxAge=2592000)](https://www.npmjs.com/package/react-native-advanced-forms)
[![Join the chat at https://discord.gg/bYt4tWB](https://img.shields.io/badge/discord-join%20chat-738bd7.svg?style=flat-square)](https://discord.gg/bYt4tWB)
[![Follow on Twitter](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&label=Follow&maxAge=2592000)](https://twitter.com/hiddentao)

![Demo1](https://github.com/hiddentao/react-native-advanced-forms/raw/master/recordings/rec2.gif "Demo1")

Flexible React Native architecture for building and managing forms.

Features:

* Cross-platform (iOS, Android)
* Allow for flexible form layouts
* Easily manage and validate field input values
* Auto-focussing of next field for better user experience
* Easily integrate your own custom components
* Component-based - use with or without Redux
* Compatible with React Native 0.40+

## Installation

Use NPM/Yarn to install package: `react-native-advanced-forms`

## Demo

A working demo app can be found in the `demo` folder _(Note that you will need
to copy `src` to `demo/src` for the app to successfully build)._

## Usage

This code will render the form you can see in the demo animation above:

```js
import React from 'react'
import { Button, Alert, StyleSheet, Text, View } from 'react-native'
import Form from 'react-native-advanced-forms'

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
      firstName, lastName, age, country
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
```

## API and props

## Flexible layouts

The `Form.Layout`

## Form validation and submission

You must provide a `validate` property to the form, the value of which is a
function which returns which fields have failed validation, for example:

```js
render () {
  return (
    <Form onSubmit={this.onSubmit} validate={this.validate} ...>
      ...
    </Form>
  )
}

validate = (values) => {
  const ret = {}

  if (!values.firstName) {
    ret.firstName = Form.VALIDATION_RESULT.MISSING
  }

  if (isNaN(values.age)) {
    ret.age = Form.VALIDATION_RESULT.INCORRECT
  }

  return ret
}

onSubmit = (values) = {
  ...
}
```

_Note: The default `VALIDATION_RESULT` values can be found in `src/utils.js`:_


If all fields have valid values then `validate()` must return `{}`. If
  validation thus succeeds the form will be submitted and the `onSubmit`
  handler which you passed in will be called with the `values`.

If you try submit the form programmatically (by calling `validateAndSubmit()`)
and some fields have not yet been filled in, then they will be highlighted. On
the other hand, if you submit a
field (i.e. you enter text and then press _done_ or the equivalent on your
  keyboard) then the form logic will auto-focus on the next field that needs to
  be filled in:

![Demo2](https://github.com/hiddentao/react-native-advanced-forms/raw/master/recordings/rec1.gif "Demo2")


## Auto-scrolling to fields (ScrollView)

## Custom components

## License

[MIT](https://github.com/hiddentao/react-native-advanced-forms/raw/master/LICENSE.md)
