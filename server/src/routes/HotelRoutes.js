import express from 'express'
import {createHotel, updateHotel, deleteHotel, findOneHotel, findHotels, countByCity, countByType, getHotelRooms} from '../controllers/HotelController.js'
import { verifyAdmin } from '../utils/verifyToken.js'
const router = express.Router()

router.get('/', findHotels)
router.get('/find/:id', findOneHotel)
router.post("/", verifyAdmin, createHotel)
router.put('/:id', verifyAdmin, updateHotel)
router.delete('/:id', verifyAdmin, deleteHotel)
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms)


export default router