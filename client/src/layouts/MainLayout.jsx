import HeaderWithDrawer from '../components/Header/HeaderWithDrawer';

import { useState } from 'react';

export default function MainLayout({ children }) {
    const [auth, setAuth] = useState(false)
    const [badgeNum, setBadgeNum] = useState(1)

    const paths = {
        'profile': '/employee/my-profile',
        'visaStatus': '',
        'housing': '',
    }

    return (
        <HeaderWithDrawer
            badgeNum={badgeNum}
            auth={auth}
            paths={paths}
            handleLogout={() => {
                console.log("HandleLogout"); //Todo
            }}
            handleNotification={() => {
                console.log("handleNotification"); //Todo
            }}
        >
            {children}
        </HeaderWithDrawer>
    )
}