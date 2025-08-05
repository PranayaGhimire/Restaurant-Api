import Restaurant from "../models/Restaurant.js"

export const getAllRestaurants = async (req,res) => {
    const { name, location, limit = 10, page = 1 } = req.query;

    const query = {};

    if (name) query.name = new RegExp(name, "i");
    if (location) query.location = new RegExp(location,"i");

    const skip = (page-1)*limit;

    const total = await Restaurant.countDocuments(query);
    const data = await Restaurant.find(query)
        .limit(Number (limit))
        .skip(Number (skip));
    res.json({
        total,
        page:Number(page),
        limit:Number(limit),
        pages: Math.ceil(total/limit),
        message: 'Restaurants Fetched Successfully',
        data
    });
};

export const createRestaurant = async (req,res) => {
    const {name,location} = req.body;
    const image = req.file.path

    const restaurant = new Restaurant({
        name,
        location,
        image
    });
    const saved = await restaurant.save();
    res.status(201).json({
        message: 'Restaurant Created Successfully',
        data:saved
    });
};

export const getRestaurant = async (req,res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    if(!restaurant)
        return res.status(404).json({ message: 'Restaurant Not Found' });
    res.json({
        message: 'Restaurant Fetched Successfully',
        data:restaurant
    });
};

export const updateRestaurant = async (req,res) => {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json({
        message: 'Restaurant Updated Successfully',
        data:restaurant
    })
};

export const deleteRestaurant = async (req,res) => {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({
        message: 'Restaurant Deleted Successfully'
    });
};
