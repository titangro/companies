
import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function users(state = initialState.users, action) { 
    switch (action.type) {
        case types.users.GET: {
            const { users } = action;
            let nextState = Object.assign({}, state);
            for (let user of users) {
                if (!nextState[user.id]) {
                    nextState[user.id] = user;
                }
            }
            return nextState;
        }
        case types.users.CREATE: {
            const { users } = action;
            let nextState = users;           
            return nextState;
        }
        case types.users.ADD: {
            let nextState = [...state, {
                id: state[state.length - 1].id + 1,
                avatar: "https://www.gravatar.com/avatar/00000000000000000000000000000000?s=200",
                comments: [],
                name: "Name",
                surname: "Surname",
                position: "Worker"
            }];
            return nextState;
        }
        default:
            return state;
    }
}

export function user(state = initialState.user, action) {
    switch (action.type) {
        case types.users.TOGGLE: {
            const { users } = action;
            let nextState = users;           
            return nextState;
        }
        case types.users.SHOW: {
            const { user } = action;
            let nextState = user;
            return nextState;
        }
        default:
            return state;
    }
}