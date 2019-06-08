import axios from 'axios';

import * as actionTypes from './actionTypes';

export const adminAuthStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const adminAuthSuccess = (token, userId, username, authority) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        name:username,
        Authority: authority
    };
};

export const adminAuthFail = (error) => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminExpirationDate');
    localStorage.removeItem('adminUserId');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('authority');
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const adminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminExpirationDate');
    localStorage.removeItem('adminUserId');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('authority');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(adminLogout());
        }, expirationTime * 1000);
    };
};

export const adminAuthSignIn = (email, password) => {
    return dispatch => {
        dispatch(adminAuthStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD_U3qQekQqULtlVCv7A2GsysPnH2X96TI';
        var dbURL = '';

        axios.post(url, authData)
        .then(response => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('adminToken', response.data.idToken);
            localStorage.setItem('adminExpirationDate', expirationDate);
            localStorage.setItem('adminUserId', response.data.localId);
            localStorage.setItem('adminUsername', response.data.displayName);
            dbURL = 'https://co227-project.firebaseio.com/Users/'+response.data.localId+'.json?auth=' + response.data.idToken; 
            dispatch(loadAdminSigninData( dbURL, response.data.idToken, response.data.localId ));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            dispatch(adminAuthFail(err.response.data.error));
        });
    };
};

export const loadAdminSigninData = ( dbURL, idToken, localId ) => {
    
    return dispatch => {
        var username = '';
        var authority = '';
        axios.get(dbURL)
        .then(response => {
            for(let key in response.data){
                username = response.data[key].Username;
                authority = response.data[key].Authority;
            }
            if( authority === "admin" ){
                localStorage.setItem('authority', "admin");
                dispatch(adminAuthSuccess(idToken, localId, username, authority));
            }else{
                dispatch(adminAuthFail("Login Error"));
            }
        })
        .catch(err => {
            dispatch(adminAuthFail(err.response.data.error));
        });
    }
}

export const setAdminAuth = () => {
    return {
        type: actionTypes.SET_AUTH,
    };
};

export const adminAuthCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            dispatch(adminLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('adminExpirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(adminLogout());
            } else {
                const userId = localStorage.getItem('adminUserId');
                const username = localStorage.getItem('adminUsername');
                const authority = localStorage.getItem('authority');
                
                dispatch(adminAuthSuccess(token, userId, username, authority));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};