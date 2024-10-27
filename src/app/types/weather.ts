export interface Weather{
    name: string;
    weather: string;
    temperature: number;
    feelsLike: number;
    wind: number;
    humidity: number;
    dt: Date;
}

export interface WeatherState {
    weather: Weather[];
    loading: boolean;
    error: string;
}