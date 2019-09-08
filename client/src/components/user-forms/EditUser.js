import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { updateUserById } from '../../actions/user';
import PropTypes from 'prop-types';

const EditUser = ({ setAlert, updateUserById, auth, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const { name, email, password, password2 } = formData;
   
   
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
        updateUserById(formData, auth.user._id, history);
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit</h1>
      <p className='lead'>
        <i className='fa fa-user' /> Edit Your Account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Edit' />
        <Link className='btn btn-light my-1' to='/users'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditUser.propTypes = {
  setAlert: PropTypes.func.isRequired,
  updateUserById: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { setAlert, updateUserById }
)(withRouter(EditUser));
