export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          ...action.payload,
          // id: new Date().getTime(),
        },
      ];
    case "remove":
      return state.filter((user) => user.id != action.payload);
    case "update":
      return state.map(u => {
        if(u.id == action.payload.id) return {...action.payload, password: u.password}
        return u;
      })
    case "load":
      return action.payload
    default:
      return state;
  }
};
