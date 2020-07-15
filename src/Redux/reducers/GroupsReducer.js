const SET_DATA = 'app/SET_TIME';
const CLEAR_DATA = 'app/CLEAR_DATA';

let initialState = {
    dbData: [],
};

export const GroupsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                dbData: action.data
            };
        case CLEAR_DATA:
            return {
                ...state,
                dbData: []
            };
        default:
            return state
    }
}

export const setData = (data) => ({type: SET_DATA, data});
export const clearData = () => ({type: CLEAR_DATA});

export const setDataTC = (props) => (dispatch, getState) => {
    return dispatch(getState().app.dbData ? setData(getState().app.dbData.concat(props)) : setData(props))
};

