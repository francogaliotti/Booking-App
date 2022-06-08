import Hotel from '../models/Hotel.js'
import Room from '../models/Room.js'

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        await newHotel.save()
        res.status(200).json(newHotel)
    } catch (err) {
        next(err)
    }
}

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedHotel)
    } catch (err) {
        next(err)
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel Deleted")
    } catch (err) {
        next(err)
    }
}

export const findOneHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    }
}

export const findHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query
    try {
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min || 0, $lt: max || 9999 }
        }).limit(req.query.limit)
        res.status(200).json(hotels)
    } catch (err) {
        next(err)
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({ city: city })
            })
        )
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }

}

export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "Apartment" });
        const resortCount = await Hotel.countDocuments({ type: "Resort" });
        const villaCount = await Hotel.countDocuments({ type: "Villa" });
        const cabinCount = await Hotel.countDocuments({ type: "Cabin" });

        res.status(200).json([
            { type: "Hotel", count: hotelCount },
            { type: "Apartment", count: apartmentCount },
            { type: "Resort", count: resortCount },
            { type: "Villa", count: villaCount },
            { type: "Cabin", count: cabinCount },
        ]);
    } catch (err) {
        next(err);
    }
};

export const getHotelRooms = async (req,res,next) => {
    try{
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room=>{
            return Room.findById(room)
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}



