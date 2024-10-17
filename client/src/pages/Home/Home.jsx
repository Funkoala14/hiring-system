import React, { useEffect, useState } from 'react';
import './Home.scss';
import { getUser } from '../../services/userServices';

function Home() {

    return (
        <div className='Home'>

            <h1>Welcome to MyApp</h1>
            <p>This is the home page.</p>
        </div>
    );
}

export default Home;
