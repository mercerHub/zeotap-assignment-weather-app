'use client'
import { useAppSelector } from '@/lib/hooks';




function Page() {
   const loading = useAppSelector((state) => state.weatherReducer.loading);
   if(loading){
       return <div>Loading...</div>
   }

    return (
        null
    )
}

export default Page
