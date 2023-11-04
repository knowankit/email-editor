const hyphenToCamelCase = (str: string) => {
  return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
}

export const getCamelCasedAttributes = (attributes: any) => {
  return Object.keys(attributes).reduce((result, key) => {
    const camelKey = hyphenToCamelCase(key);
    result[camelKey] = attributes[key];

    return result;
  }, {} as any);
}


export const objectToCSS = (styles: Record<string, string>) => {
  const propertyMap: Record<string, string> = {
    'backgroundHeight': 'height',
    'backgroundWidth': 'width',
    'backgroundUrl': 'background',
    'containerBackgroundColor': 'backgroundColor',
    'align': 'textAlign'
  };

  const cssObject: Record<string, string> = Object.keys(styles).reduce((cssObj, property) => {
    const cssProperty = propertyMap[property] || property

    // If background does not have url then don't add in the object
    if (cssProperty === 'background' && styles[property]) {
      cssObj[cssProperty] = `url("${styles[property]}")`
    } else {
      cssObj[cssProperty] = styles[property];
    }
    return cssObj;
  }, {} as any);

  return cssObject;
}
