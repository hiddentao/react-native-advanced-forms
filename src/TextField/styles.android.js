import { StyleSheet } from 'react-native'

const normalStyle = {
  backgroundColor: '#fff',
  borderRadius: 3,
  paddingLeft: 5,
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
