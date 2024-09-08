'use client';

import { NotificationContext, ThemeContext } from './context';

export default function Providers({ children }) {
    return (
        <ThemeContext.Provider value={{}}>
            <NotificationContext.Provider value={{}}>
                {children}
            </NotificationContext.Provider>
        </ThemeContext.Provider>
    );
}