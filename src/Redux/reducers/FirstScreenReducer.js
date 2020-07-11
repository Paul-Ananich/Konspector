const SET_DATA = 'app/SET_TIME';

let initialState = {
    dbData: [],
};

export const FirstScreenReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                dbData: action.data
            };
        default:
            return state
    }
}

export const setData = (data) => ({type: SET_DATA, data});

export const setDataTC = (props) => (dispatch, getState) => {
    return dispatch(getState().app.dbData ? setData(getState().app.dbData.concat(props)) : setData(props))
};

