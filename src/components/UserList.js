import React from 'react';
import { Link } from 'react-router-dom';
import { showUser } from '../actions/users';

const UserList = ({users, store}) => {
    return (
        <div className="wrapper user-wrapper">
            {users.map(
                user =>
                <Link to={`/users/${user.id}`} className="user-link" key={user.id} onClick={() => store.dispatch(showUser(
                    user
                ))}>
                    <img src={user.avatar} alt={`${user.name} ${user.surname}`} />
                    <div className="wrap-items">
                        <p>
                            {user.name}
                        </p>
                        <p>
                            {user.surname}
                        </p>
                        <p>
                            {user.position}
                        </p>
                    </div>
                </Link>
            )}
        </div>
    )
}

export default UserList;