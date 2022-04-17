import { HYDRATE } from 'next-redux-wrapper';
import { ApplicationState, initialState } from './state';
import { reducer as listReducer } from './list';

export type ReducerAction = {
    type: string;
    payload?: any;
    data?: any;
    error?: Error;
};

export type Reducer = (state: ApplicationState, action: ReducerAction) => ApplicationState;

const reducer = (state: ApplicationState = initialState, action: ReducerAction) => {
    const type = action.type;

    if (type === HYDRATE) {
        return { ...state, ...action.payload };
    }

    let result;

    result = (listReducer as Reducer) && listReducer(state, action);

    if (result) return result;

    return state;
};

export default reducer;
