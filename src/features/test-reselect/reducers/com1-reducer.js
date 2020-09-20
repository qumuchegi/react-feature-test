export const com1Reducer = (state = {count: 0}, action) => {
  switch (action.type) {
    case 'change-state': return { count: state.count + 1 };
    default: return state;
  }
}