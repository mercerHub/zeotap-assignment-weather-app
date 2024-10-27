import { Weather } from "@/app/types/weather";
import { axiosInstance } from "@/util/axiosInstance";
import { NextRequest, NextResponse } from "next/server";

interface CityDataInterface {
    name: string;
    weather: { description: string }[];
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
    };
    wind: {
        speed: number;
    };
    dt: number;
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { cities } = body;

    try {

        const responses = await Promise.all(
            cities.map((city: string) => 
                axiosInstance.get(`/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
            )
        );

        const data = responses.map(response => response.data);

        const prunedData: Weather[] = data.map((cityData: CityDataInterface) => {
            return {
                name: cityData.name,
                weather: cityData.weather[0].description,
                temperature: Math.round(cityData.main.temp - 273.15),
                feelsLike: Math.round(cityData.main.feels_like - 273.15),
                wind: cityData.wind.speed,
                humidity: cityData.main.humidity,
                dt: new Date(cityData.dt * 1000),
            }
        })
        
        return NextResponse.json(prunedData, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { message: 'Error fetching weather data', success: false },
            { status: 500 }
        );
    }
}
