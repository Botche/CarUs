import React from 'react';

import Navigation from '../navigation';

function Header(props) {
    return (
        <header>
            <Navigation navigationType="header" />
        </header>
    );
}

export default Header;