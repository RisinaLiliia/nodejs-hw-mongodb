function parseNumber(value, defaultValue) {
    if (typeof value === 'undefined') return defaultValue;
    const parsed = parseInt(value);
    return Number.isNaN(parsed) ? defaultValue : parsed;
  }
  
  export function parsePaginationParams(query) {
    const { page, perPage } = query;
    return {
      page: parseNumber(page, 1),
      perPage: parseNumber(perPage, 10),
    };
  }
  