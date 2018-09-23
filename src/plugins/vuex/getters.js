// get calendars as array
export const calendars = state => {
  const ids = Object.keys(state.calendars);
  // map to array
  if (ids.length > 0) {
    return ids.map(id => state.calendars[id]);
  }
  return [];
};

// get slots as array
export const slots = state => {
  const indexes = Object.keys(state.slots);
  // map to array
  if (indexes.length > 0) {
    return indexes.map(index => state.slots[index]);
  }
  return [];
};

// get patients as array
export const patients = state => {
  const indexes = Object.keys(state.patients);
  // map to array
  if (indexes.length > 0) {
    return indexes.map(index => state.patients[index]);
  }
  return [];
};
