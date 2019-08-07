
import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function comments(state = initialState.users, action) {
    switch (action.type) {
        case types.comments.ADD: {
            const { comment } = action;            
            let nextState = [];

            for (const user of comment.users) {
                if (user.id === comment.userId) {
                    user.comments = [...user.comments, {
                    id: user.comments.length ? user.comments[user.comments.length - 1].id + 1 : 1,
                    author: comment.author,
                    phone: comment.phone,
                    title: comment.title,
                    comment: comment.comment
                    }]
                }
                nextState = [...nextState, user];
            }

            console.log(nextState)

            return nextState;
        }
        default:
            return state;
    }
}