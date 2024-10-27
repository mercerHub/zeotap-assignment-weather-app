'use client'
import React, { useEffect, useState } from 'react';
import useWeatherRefresh from '../hooks/useWeatherRefresh';
import { useAppSelector } from '../../lib/hooks';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const WeatherComponent = ({ cities, children }: { cities: string[], children: React.ReactNode }) => {
    const [refreshInterval, setRefreshInterval] = useState(5);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const savedInterval = localStorage.getItem('RefreshInterval');
        if (savedInterval) {
            setRefreshInterval(Number(savedInterval));
        }
    }, []);

    const handleSaveInterval = () => {
        localStorage.setItem('RefreshInterval', refreshInterval.toString());
        setIsDialogOpen(false);
    };

    useWeatherRefresh(cities);
    const params = useParams();
    const { cityId } = params;

    const weather = useAppSelector((state) => state.weatherReducer.weather);
    const loading = useAppSelector((state) => state.weatherReducer.loading);
    const error = useAppSelector((state) => state.weatherReducer.error);

    return (
        <>
            <div className="absolute inset-0 bg-sky-400 blur-xl pointer-events-none"></div>

            <div className='h-screen w-screen flex items-center justify-center relative z-10'>
                <div className='flex w-[60%] h-[80%] items-center justify-center rounded-xl'>
                    <div className='bg-white/30 backdrop-blur-2xl shadow-lg rounded-xl rounded-r-none w-4/6 h-full p-8 flex flex-col justify-center items-center text-gray-200'>
                        {children}
                    </div>

                    <div className='w-2/6 backdrop-blur-md bg-white/30 h-full rounded-r-xl border-l-2 border-gray-200 flex flex-col p-6'>
                        <div className='absolute top-4 right-4 cursor-pointer' onClick={() => setIsDialogOpen(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </div>

                        <div className='flex flex-col gap-4 items-center justify-center h-full'>
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                <div className='w-full h-full flex flex-col gap-4 items-center justify-center'>
                                    <h2 className="text-3xl font-semibold mb-4">Locations</h2>
                                    {weather?.map((city, index) => (
                                        <Link 
                                            href={`/weather/${index}`}
                                            key={city.name}
                                            className={`${Number(cityId) === index ? 'border-l-2 border-gray-300':''} flex flex-col gap-2 px-2`}
                                        >
                                            <div className='text-xl font-semibold'>{city.name}</div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                            {error && <div className="text-red-500">{error}</div>}
                        </div>
                    </div>
                </div>
            </div>

            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800 flex flex-col items-center">
                        <h3 className="text-2xl font-bold mb-4">Set Refresh Interval</h3>
                        <input 
                            type="number" 
                            className="bg-gray-200 text-gray-800 rounded-md p-2 w-20 text-center mb-4" 
                            value={refreshInterval} 
                            onChange={(e) => setRefreshInterval(Number(e.target.value))}
                        />
                        <button 
                            onClick={handleSaveInterval} 
                            className="bg-blue-500 text-white p-2 rounded-md w-full mt-2"
                        >
                            Save
                        </button>
                        <button 
                            onClick={() => setIsDialogOpen(false)} 
                            className="text-red-500 mt-2"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default WeatherComponent;
