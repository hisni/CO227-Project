import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    username: null,
    error: null,
    loading: false,
    signUpSuccess: false,
    Authority:null
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    return updateObject( state, {         
        token: action.idToken,
        userId: action.userId,
        username: action.name,
        Authority: action.Authority,
        error: null,
        loading: false,
        signUpSuccess: false
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null, username: null, Authority:null });
};

const setAuth = (state, action) => {
    return updateObject(state, { 
        signUpSuccess: false,
        error: null,
        loading: false,
        Authority:null });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH: return setAuth(state,action);
        default:
            return state;
    }
};

export default reducer;