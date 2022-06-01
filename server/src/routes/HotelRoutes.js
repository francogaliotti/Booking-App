import express from 'express'
import {createHotel, updateHotel, deleteHotel, findOneHotel, findAllHotels} from '../controllers/HotelController.js'
import { verifyAdmin } from '../utils/verifyToken.js'
const router = express.Router()

router.get('/', findAllHotels)
router.get('/:id', findOneHotel)
router.post("/", verifyAdmin, createHotel)
router.put('/:id', verifyAdmin, updateHotel)
router.delete('/:id', verifyAdmin, deleteHotel)


export default router