import React from 'react';
import { Link } from 'react-router-dom';
import  { connect } from 'react-redux';

import { auth } from '../../db/firebase.utils';

import './header.style.scss';

const Header = ({currentUser}) => (
    <div className='header'>
        <div className='options'>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ? (
                <div className='option' onClick={ () => auth.signOut()}>
                    SIGN OUT
                </div>
                ) : (
                <Link className='option' to='/signin'>
                    SIGN IN
                </Link>
            )}
        </div>
        
    </div>
);

const mapStateToProps = ({user: { currentUser }, cart: { hidden }}) => ({
    currentUser,
    hidden
})

export default connect(mapStateToProps)(Header);