import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

import Button from './Button.jsx';
import { mapRoutes, RoutesEnum } from '../Routes.jsx';

const Nav = styled.nav`
    ${tw`block md:hidden flex justify-around px-2 py-3 bg-white shadow z-50`}
`;

export default function BottomBar() {
    const icons = mapRoutes([
        RoutesEnum.HOME,
        RoutesEnum.ME,
        RoutesEnum.SEARCH,
        RoutesEnum.CHAT,
    ]);

    return (
        <Nav>
            {icons.map(({ to, icon }) => (
                <Button flat key={icon} to={to} icon={icon} />
            ))}
        </Nav>
    );
}
