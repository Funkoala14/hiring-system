import HeaderWithDrawer from '../components/Header/HeaderWithDrawer';
import { useState } from 'react';
import { logoutThunk } from '../store/auth/auth.thunk.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../store/auth/auth.selector.js';

export default function MainLayout({ children }) {
    const dispatch = useDispatch();

    const [auth, setAuth] = useState(useSelector(selectIsLoggedIn))
    const [badgeNum, setBadgeNum] = useState(1)

    const paths = {
        'profile': '/employee/my-profile',
        'visaStatus': '/employee/visa-status',
        'housing': '',
    }

    const handleLogout = () => {
        dispatch(logoutThunk());
    };


    return (
        <HeaderWithDrawer
            badgeNum={badgeNum}
            auth={auth}
            paths={paths}
            handleLogout={handleLogout}
            handleNotification={() => {
                console.log("handleNotification"); //Todo
            }}
        >
            {children}
        </HeaderWithDrawer>
    )
}