import { findNodeHandle } from 'react-native'

export const componentsCall = (components, methodName, ...args) => {
  for (let key in components) {
    const c = components[key]

    if (c[methodName]) {
      c[methodName].apply(c, args)
    }
  }
}

export const scrollToComponentInScrollView = (scrollViewRef, componentRef) => {
  if (scrollViewRef) {
    setTimeout(() => {
      try {
        const scrollResponder = scrollViewRef.getScrollResponder()

        scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
          findNodeHandle(componentRef), 100, true
        )
      } catch (err) {}
    }, 50)
  }
}

export const VALIDATION_RESULT = {
  MISSING: 1,
  INCORRECT: 2,
}
