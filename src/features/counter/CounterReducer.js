const initialState = { value: 0 };

export default function CounterReducer(state = initialState, action) {
  if (action.type === "counter/increment") {
    return {
      ...state,
      value: (state.value += 1),
    };
  }
  return state;
}
