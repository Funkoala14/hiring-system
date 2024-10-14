import React, { useEffect, useState } from 'react';
import './Home.scss';
import { getUser } from '../../services/userServices';

function Home() {
    const [user, setUser] = useState();

    const fetchData = async () => {
        const data = await getUser();
        setUser(data);
        console.log(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='Home'>
            {user && <h1>{user.name}</h1>}
            <h1>Welcome to MyApp</h1>
            <p>This is the home page.</p>
        </div>
    );
}

export default Home;
