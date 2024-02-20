export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          ...action.payload,
          id: new Date().getTime(),
        },
      ];
    case "remove":
      return state.filter((user) => user.id != action.payload);
    default:
      return state;
  }
};
