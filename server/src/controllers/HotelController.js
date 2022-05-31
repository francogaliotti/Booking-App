import Hotel from '../models/Hotel.js'

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        await newHotel.save()
        res.status(200).json(newHotel)
    } catch (err){
        next(err)
    }
}

export const updateHotel = async (req,res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
        res.status(200).json(updatedHotel)
    } catch (err){
        next(err)
    }
}

export const deleteHotel = async (req,res, next) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel Deleted")
    } catch (err){
        next(err)
    }
}

export const findOneHotel = async (req,res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (err){
        next(err)
    }
}

export const findAllHotels = async (req,res, next) => {
    try {
        const hotels = await Hotel.find()
        res.status(200).json(hotels)
    } catch (err){
        next(err)
    }
}



