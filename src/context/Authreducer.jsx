import { View, Text } from 'react-native';
import React from 'react';
export const Authreducer = (state , action)=>{
    switch(action.type){
        case 'loggin':
            return{
                ...state,
                status:'auth',
                token:action.payload.token,
                user: action.payload.user
            }
        case 'sign_up':
            return{
                ...state,
                status:'auth',
                token:action.payload.token,
                user: action.payload.user
            }
        case 'not_auth':
            return{
                ...state,
                status:'noauth',
                token:null,
                user: null
            }
        case 'logout':
            return{
                ...state,
                errorMessage:'',
                status:'noauth',
                token:null,
                user: null
            }
        case 'add_error':
            return{}
        case 'remove_error':
            return{}
        break;
        default:
            return state;
        break;
    }
}