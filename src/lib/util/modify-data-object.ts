const modifyObjectData = (obj: any, propertyPath: string, newValue: any, action = 'get') => {
  if (!obj || typeof obj !== 'object') {
    // Base case: If the input is not an object, we can't modify it.
    return obj;
  }

  const keys = propertyPath.split('.');
  const currentKey = keys[0];


  if (keys.length === 1) {
    // If this is the target property, perform the specified action.
    if (Array.isArray(obj) && currentKey === 'push' && action === 'add') {

      // If the object is an array, and the action is 'add' with the key 'push',
      // we push the newValue to the array.
      obj.push(newValue);
    } else if (action === 'get') {
      return obj[currentKey];
    } else if (action === 'update') {
      obj[currentKey] = newValue;
    } else if (action === 'delete') {
      if (obj.hasOwnProperty(currentKey)) {
        delete obj[currentKey];
      }
    } else if (action === 'add') {
      obj[currentKey] = newValue;
    }
    return obj;
  }

  // Recursively dive deeper into the object.
  if (obj.hasOwnProperty(currentKey)) {
    obj[currentKey] = modifyObjectData(obj[currentKey], keys.slice(1).join('.'), newValue, action);
  } else if (action === 'add') {
    // If the key doesn't exist and the action is 'add', create a new object.
    obj[currentKey] = modifyObjectData({}, keys.slice(1).join('.'), newValue, action);
  }

  return obj;
}

export default modifyObjectData
