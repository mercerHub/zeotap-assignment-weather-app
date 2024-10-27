'use client'

import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../lib/hooks';
import { fetchWeather } from '../../lib/features/weather/weatherSlice';

const DEFAULT_REFRESH_INTERVAL = 5; // 5 minutes

const useWeatherRefresh = (cities: string[]) => {
    const dispatch = useAppDispatch();
    const [refreshInterval, setRefreshInterval] = useState(() => {
        // Initialize from localStorage inside useState initializer
        const savedInterval = localStorage.getItem('RefreshInterval');
        return savedInterval ? Number(savedInterval) : DEFAULT_REFRESH_INTERVAL;
    });

    // Effect to handle localStorage changes
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'RefreshInterval' && e.newValue) {
                setRefreshInterval(Number(e.newValue));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    useEffect(() => {
        const fetchWeatherData = () => {
            dispatch(fetchWeather(cities));
        };

        fetchWeatherData();

        const intervalInMs = refreshInterval * 60 * 1000;
        
        const intervalId = setInterval(fetchWeatherData, intervalInMs);

        return () => clearInterval(intervalId);
    }, [dispatch, cities, refreshInterval]);
};

export default useWeatherRefresh;