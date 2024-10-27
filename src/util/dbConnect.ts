import mongoose from 'mongoose';

type connectionObject = {
    isConnected?: number;
}


const connection: connectionObject = {};

async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log('Using existing connection');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI ||"http://localhost:27017/zeotap-assignment-weather-app");

        connection.isConnected = db.connections[0].readyState;
        console.log('New connection');
    } catch (error) {
        console.log('DB Connection Error:', error);
        process.exit(1);
    }
}

export default dbConnect;