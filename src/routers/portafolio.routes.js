
const{Router} = require('express')

const router = Router()
const {isAuthenticated} = require('../helpers/validate-auth')

const { renderAllPortafolios,
        renderPortafolio,
        renderPortafolioForm,
        createNewPortafolio,
        renderEditPortafolioForm,
        updatePortafolio,
        deletePortafolio
    } = require('../controllers/portafolio.controllers.js')
// CREAR RUTAS Y LLAMAR A MIS METODOS DEL CONTROLADOR
router.get('/portafolio/add',isAuthenticated, renderPortafolioForm)
router.post('/portafolio/add',isAuthenticated, createNewPortafolio)

router.get('/portafolios', isAuthenticated,renderAllPortafolios)
router.get('/portafolio/:id',isAuthenticated, renderPortafolio)

router.get('/portafolio/edit/:id',isAuthenticated, renderEditPortafolioForm)
router.put('/portafolio/edit/:id', isAuthenticated,updatePortafolio)

router.delete('/portafolio/delete/:id', isAuthenticated,deletePortafolio)
// EXPORTAR MI ROUTER 
module.exports = router