import Menu from "../models/Menu.js"

export const getAllMenus = async (req,res) => {
    const {itemName, minPrice, maxPrice} = req.query;

    const query = {};

    if (itemName) query.itemName = new RegExp(itemName,'i');
    if (minPrice) query.price = {...query.price, $gte:parseFloat(minPrice)};
    if (maxPrice) query.price = {...query.price, $lte:parseFloat(maxPrice)};

    const data = await Menu.find(query).populate('restaurant');
    res.json({
        message: 'Menus Fetched Successfully',
        data
    });
};

export const createMenu = async (req,res) => {
    const menu = new Menu(req.body);
    const saved = await menu.save();
    res.status(201).json({
        message: 'Menu Created Successfully',
        data:saved
    });
};

export const getMenu = async (req,res) => {
    const menu = await Menu.findById(req.params.id).populate('restaurant');
    if (!menu) return res.status(404).json( {message: 'Menu Not Found'} );
    res.json({
        message: 'Menu Fetched Successfully',
        data:menu
    })
};

export const updateMenu = async (req,res) => {
    const updated = await Menu.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.json({
        message: 'Menu Updated Successfully',
        data:updated
    })
};

export const deleteMenu = async (req,res) => {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Menu Deleted Successfully' })
}