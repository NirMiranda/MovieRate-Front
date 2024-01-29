// Logo.tsx
import React from 'react';
import './Logo.css';

interface LogoProps {
    text?: string; // Prop to allow changing the text
}

function Logo({ text = 'MoView' }: LogoProps) {
    return (
        <div className="logo-wrap">
            <svg
                version="1.1"
                id="Слой_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 855 150"
                style={{ enableBackground: 'new 0 0 855 150' }}
                xmlSpace="preserve"
            >
                <text transform="matrix(1 0 0 1 0 125.5508)" className="st0 st1 st2">
                    {text}
                </text>
            </svg>
        </div>
    );
}

export default Logo;
