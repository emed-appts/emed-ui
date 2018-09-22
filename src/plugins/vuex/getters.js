// get calendars as array
export const calendars = state => {
  const ids = Object.keys(state.calendars);
  // map to array
  if (ids.length > 0) {
    return ids.map(id => state.calendars[id]);
  }
  return [];
};

// get appointments as array
export const appointments = state => {
  const indexes = Object.keys(state.appointments);
  // map to array
  if (indexes.length > 0) {
    return indexes.map(index => state.appointments[index]);
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
