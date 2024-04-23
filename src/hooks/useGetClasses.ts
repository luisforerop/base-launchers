export const useGetClasses = (classes: any, customClasses: any) => {
  const listOfClasses = Object.keys(classes)
  const _classes: any = {}

  for (const _class of listOfClasses) {
    _classes[_class] = `${classes[_class]} ${
      customClasses ? customClasses[_class] || '' : ''
    }`
  }

  return _classes
}
