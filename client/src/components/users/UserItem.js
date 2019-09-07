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
        <div className="card md-4">
            <img src={avatar} alt='' className='round-img' />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{email}</p>
            </div>
            <div className="card-footer">
                <Link to={`/#`} className='btn btn-primary'>
                    View User
                </Link>
            </div>
        </div>
        


















        // <div className='user bg-light'>
            // <img src={avatar} alt='' className='round-img' />
        //     <div>
        //         <h2>{name}</h2>
        //         <h4>{email}</h4>
                // <Link to={`/#`} className='btn btn-primary'>
                //     View User
                // </Link>
        //     </div>
        // </div>
    );
};

UserItem.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserItem;