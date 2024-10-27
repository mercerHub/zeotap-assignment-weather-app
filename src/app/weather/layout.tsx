import React from 'react';
import WeatherComponent from '../components/weatherComponent';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const cities = ['Delhi','Mumbai','Bangalore','Chennai','Kolkata']
    return (
        <div className="layout">
           <WeatherComponent cities={cities}>
                {children}
            </WeatherComponent>
        </div>
    );
};

export default Layout;