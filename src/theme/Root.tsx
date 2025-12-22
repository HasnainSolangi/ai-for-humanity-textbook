import React from 'react';
import ChatWidget from '../components/ChatWidget';
import { AuthProvider } from '../contexts/AuthContext';

// Example of a custom Root component interacting with the Docusaurus lifecycle
export default function Root({ children }) {
    return (
        <AuthProvider>
            <>
                {children}
                <ChatWidget />
            </>
        </AuthProvider>
    );
}
