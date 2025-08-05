export const requireRole = (role) => {
    return (req,res,next) => {
        if(req.user?.role !== role){
            return res.status(403).json({message: "You don't have access to this route."});
        }
        next();
    }
};