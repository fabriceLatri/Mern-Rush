import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import { getUsers } from '../../actions/user';

const Users = ({ getUsers, user: { users, loading } }) => {
    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <div className="container">
                        <h1 className='large text-primary'>Users</h1>
                        <p className='lead'>
                            <i className='fa fa-connectdevelop' />Browse and connect with users
                        </p>
                        <div className='users'>
                            {users.length > 0 ? (
                                users.map(user => (
                                    <UserItem key={user._id} user={user} />
                                ))
                            ) : (
                                <h4>No users found...</h4>
                            )}
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

Users.propTypes = {
    getUsers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(
    mapStateToProps,
    { getUsers }
)(Users);