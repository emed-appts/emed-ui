// get calendars as array
export const calendars = state => {
  const ids = Object.keys(state.calendars);
  // map to array
  if (ids.length > 0) {
    return ids.map(id => state.calendars[id]);
  }
  return [];
};
