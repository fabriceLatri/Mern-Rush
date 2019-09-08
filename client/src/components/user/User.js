import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import { getUserById } from '../../actions/user';

const User = ({
    getUserById,
    user: { user, loading },
    auth,
    match
}) => {
    useEffect(() => {
        getUserById(match.params.id);
    }, [getUserById, match.params.id]);
    return (
        <Fragment>
            {user === null || loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <Link to= '/users' className='btn btn-light'>
                        Back To Users
                    </Link>
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === match.params.id && (
                        <Link to='/edit-user' className='btn btn-dark'>
                            Edit Profile
                        </Link>
                    )}
                    <div className='profile-grid my-1'>
                        <UserItem user={user}/>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

User.propTypes = {
    getUserById: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    user: state.user,
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { getUserById }
  )(User);
