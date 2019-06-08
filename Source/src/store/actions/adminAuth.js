import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        name:username
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authSignIn = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD_U3qQekQqULtlVCv7A2GsysPnH2X96TI';
        var dbURL = '';

        axios.post(url, authData)
        .then(response => {
            console.log(response);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            localStorage.setItem('username', response.data.displayName);
            dbURL = 'https://co227-project.firebaseio.com/Users/'+response.data.localId+'.json?auth=' + response.data.idToken; 
            dispatch(loadSigninData( dbURL, response.data.idToken, response.data.localId ));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        });
    };
};

export const storeSignupData = ( dbURL, dbData ) => {
    return dispatch => {
        axios.post(dbURL, dbData)
        .then(response => {
            dispatch(signUpSuccess());
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        });
    }
}

export const loadSigninData = ( dbURL, idToken, localId ) => {
    
    return dispatch => {
        var username = '';
        axios.get(dbURL)
        .then(response => {
            for(let key in response.data){
                username = response.data[key].Username;
            }
            // localStorage.setItem('username', username);
            dispatch(authSuccess(idToken, localId, username));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        });
    }
}

export const setAuth = () => {
    return {
        type: actionTypes.SET_AUTH,
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                const username = localStorage.getItem('username');
                
                dispatch(authSuccess(token, userId, username));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};