'use client';

import { AuthContext, NotificationContext, ThemeContext } from './context';

export default function Providers({ children }) {
    return (
        <ThemeContext.Provider value={{}}>
            <NotificationContext.Provider value={{}}>
                <AuthContext.Provider value={{}}>
                    {children}
                </AuthContext.Provider>
            </NotificationContext.Provider>
        </ThemeContext.Provider>
    );
}