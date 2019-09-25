import React from 'react';
import Button from './Button.jsx';
import { mapRoutes, RoutesEnum } from '../Routes.jsx';

export default function BottomBar() {
    const icons = mapRoutes([
        RoutesEnum.HOME,
        RoutesEnum.ME,
        RoutesEnum.SEARCH,
        RoutesEnum.CHAT,
    ]);

    return (
        <nav className="block md:hidden flex justify-around fixed inset-x-0 bottom-0 px-2 py-3 bg-white shadow">
            {icons.map(({ to, icon }) => (
                <Button flat key={icon} to={to} icon={icon} />
            ))}
        </nav>
    );
}
