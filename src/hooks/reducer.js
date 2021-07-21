import { useReducer } from 'react';

const reducer = (state, action) => {
    switch (action.type) {
        case 'create':
            return {
                ...state,
                rangeList: [...state.rangeList, {...action.payload, id: `${state.rangeList.length + 1}`}],
                isModalOpen: false
            }
        case 'viewItem':
            return {
                ...state,
                activeItem: state.rangeList.find(data => data.id === action.payload)
            }
        case 'setModal':
            return {
                ...state,
                isModalOpen: action.payload
            }
        case 'update':
            return {
                ...state,
                rangeList: state.rangeList.map((data) => {
                    if (data.id === action.payload.id) {
                        return { ...action.payload }
                    } else {
                        return data
                    }
                }),
            }
        case 'delete': 
            return {
                ...state,
                rangeList: state.rangeList.filter(data => data.id !== action.payload)
            }
        default: 
            return state;
    }
}

export const useHookReducer = () => useReducer(reducer, { rangeList: [], activeItem: {}, isModalOpen: false });