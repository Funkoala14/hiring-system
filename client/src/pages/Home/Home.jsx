import React, { useEffect, useState } from 'react';
import './Home.scss';
import { getUser } from '../../services/userServices';
import { Link } from 'react-router-dom';


function Home() {
    const [user, setUser] = useState();

    // const fetchData = async () => {
    //     const data = await getUser();
    //     setUser(data);
    //     console.log(data);
    // };

    // useEffect(() => {
    //     fetchData();
    // }, []);

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
