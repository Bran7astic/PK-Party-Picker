import express from 'express'
import GiftsController from '../controllers/pkmnControllers.js'
// import controller for custom items


const router = express.Router()

// define routes to get, create, edit, and delete items
router.get('/', GiftsController.getAllPkmn)

router.get('/:id', GiftsController.getPkmnById)

router.post('/', GiftsController.addPkmn)

router.patch('/:id', GiftsController.updatePkmn)

router.delete('/:id', GiftsController.deletePkmnById)

router.delete('/', GiftsController.clearPkmn)

export default router