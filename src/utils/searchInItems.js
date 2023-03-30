const searchInItems = (value, arr) => {
  const lowerCaseValue = value.toLowerCase();

  const keysToSearch = [
    'category',
    'name',
    'language',
    'code',
    'edition',
    'letter',
  ];

  const results = [];

  for (const obj of arr) {
    for (const key of keysToSearch) {
      if (
        obj.hasOwnProperty(key) &&
        obj[key].toLowerCase().includes(lowerCaseValue)
      ) {
        results.push(obj);
        break;
      }
    }
  }

  return results.length > 0 ? results : false;
};

export default searchInItems;
