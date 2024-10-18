import React, { useEffect, useState } from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';


function Home() {

    return (
        <div className='Home'>

            <h1>Welcome to MyApp</h1>
            <p>This is the home page.</p>
            <Link to="/contact">
                <button>Go to Send Registration Link</button>
            </Link>
        </div>
    );
}

export default Home;
