import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserItem = ({
    user: {
        _id,
        name,
        avatar,
        email,
    }
}) => {
    return (
    <div className='PostItem'>
        <br/>
        <div className='post bg-light'>
            <img src={avatar} alt='' className='round-img' />
            <div>
                <h2>{name}</h2>
                <h4>{email}</h4>
                <Link to={`/user/${_id}`} className='btn btn-primary'>
                    View User
                </Link>
            </div>
        </div>
    </div>
    );
};

UserItem.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserItem;