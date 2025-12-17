import React from 'react';
import ChatWidget from '../components/ChatWidget';

// Example of a custom Root component interacting with the Docusaurus lifecycle
export default function Root({ children }) {
    return (
        <>
            {children}
            <ChatWidget />
        </>
    );
}
