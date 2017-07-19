export const componentsCall = (components, methodName, ...args) => {
  for (let key of components) {
    const c = components[key]

    if (c[methodName]) {
      c[methodName].apply(c, args)
    }
  }
}

export const VALIDATION_RESULT = {
  MISSING: 1,
  INCORRECT: 2,
}
