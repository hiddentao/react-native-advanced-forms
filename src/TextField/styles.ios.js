import { StyleSheet } from 'react-native'

const normalStyle = {
  borderWidth: 1,
  borderColor: '#999',
  backgroundColor: '#fff',
  borderRadius: 3,
  paddingLeft: 10,
  paddingVertical: 5,
  fontSize: 18,
}

export default StyleSheet.create({
  normal: normalStyle,
  error: {
    ...normalStyle,
    backgroundColor: '#faa'
  }
})
