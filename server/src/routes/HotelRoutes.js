import express from 'express'
import {createHotel, updateHotel, deleteHotel, findOneHotel, findAllHotels} from '../controllers/HotelController.js'
const router = express.Router()

router.get('/', findAllHotels)
router.get('/:id', findOneHotel)
router.post("/", createHotel)
router.put('/:id', updateHotel)
router.delete('/:id', deleteHotel)


export default router