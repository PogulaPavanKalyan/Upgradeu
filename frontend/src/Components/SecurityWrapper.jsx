import React, { useState, useEffect } from 'react';

/**
 * SecurityWrapper provides protection against screenshots and screen recording
 * by blurring content when the window loses focus and disabling common capture triggers.
 */
const SecurityWrapper = ({ children }) => {
    const [isBlurred, setIsBlurred] = useState(false);

    // TEMPORARILY DISABLED for development/debugging
    const protectionActive = false;

    useEffect(() => {
        // PROTECTION BYPASSED - ENTIRE BLOCK REMOVED FOR DEBUGGING
    }, [protectionActive]);

    if (!protectionActive) {
        return <>{children}</>;
    }

    return (
        <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: isBlurred ? '#000' : 'transparent' }}>
            {protectionActive && isBlurred && (
                <div className="security-blackout">
                    <div className="blackout-content">
                        <h1>NO SCREENSHOTS ALLOWED</h1>
                        <p>Security System Active</p>
                    </div>
                </div>
            )}
            <div className={protectionActive && isBlurred ? 'security-hidden' : ''}>
                {children}
            </div>
        </div>
    );
};

export default SecurityWrapper;
