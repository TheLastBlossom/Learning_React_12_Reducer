export const VideoGameReducer = (state = [], action) => {
    switch (action.type) {
        case "create":
            return [...state, action.payload];
        case "delete":
                let index = action.index;                
                let filteredState = state.filter(videogame => videogame.id !== parseInt(index));         
                return filteredState;      
        case "edit":
            state[action.index].title = action.newTitle;            
            return [...state];
        default:
            return state;
    }
}
