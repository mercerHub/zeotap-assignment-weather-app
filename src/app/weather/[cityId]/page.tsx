'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { useAppSelector } from '@/lib/hooks'

function Page() {
    const { cityId } = useParams()
    const weather = useAppSelector((state) => state.weatherReducer.weather)
    const loading = useAppSelector((state) => state.weatherReducer.loading)

    const cityWeather = weather ? weather[Number(cityId)] : null

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                cityWeather && (
                    <div className='text-xl text-gray-800 flex flex-col gap-4 w-full h-full items-center justify-center'>
                        <h1 className='text-5xl font-bold'>City : {cityWeather.name}</h1>
                        <h2 className='text-3xl font-semibold'>Weather : <span className='font-semibold text-xl'>{cityWeather.weather}</span></h2>
                        <h2 className='text-3xl font-semibold'>Temperature : <span className='font-bold text-xl'>{cityWeather.temperature}°C</span></h2>
                        <h3 className='text-2xl font-semibold'>Feels Like : <span className='font-semibold text-xl'>{cityWeather.feelsLike}</span></h3>
                        <h3 className='text-2xl font-semibold'>Humidity : <span className='font-semibold text-xl'>{cityWeather.humidity}%</span></h3>
                        <h3 className='text-2xl font-semibold'>Wind Speed : <span className='font-semibold text-xl'>{cityWeather.wind} m/s</span></h3>
                    </div>
                )
            )}
        </>
    )
}

export default Page
