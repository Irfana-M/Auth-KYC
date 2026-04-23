import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI!);
        console.log(`MOngoDB Connected: ${conn.connection.host}`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`❌ MongoDB Error: ${error.message}`);
        } else {
            console.error("❌ Unknown MongoDB Error");
        }
        process.exit(1);
    }
}

