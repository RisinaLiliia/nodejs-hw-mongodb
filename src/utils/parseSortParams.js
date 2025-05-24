function parseSortBy(value) {
    const validKeys = ['name', 'email', 'phoneNumber']; 
    if (!value || !validKeys.includes(value)) return 'name';
    return value;
  }
  
  function parseSortOrder(value) {
    if (value !== 'asc' && value !== 'desc') return 'asc';
    return value;
  }
  
  export function parseSortParams(query) {
    const { sortBy, sortOrder } = query;
    return {
      sortBy: parseSortBy(sortBy),
      sortOrder: parseSortOrder(sortOrder),
    };
  }
  