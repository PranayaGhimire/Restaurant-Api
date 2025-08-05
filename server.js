import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import connectMongo from "./config/db.js";

dotenv.config();
console.log(process.env.JWT_SECRET);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth',authRoutes);
app.use('/api/restaurants',restaurantRoutes);
app.use('/api/menus',menuRoutes);

const PORT = process.env.PORT || 4000;
connectMongo()
    .then(() => {
        app.listen(PORT,() => {
            console.log(`Server running on port ${PORT}`);
        });
    })
 

