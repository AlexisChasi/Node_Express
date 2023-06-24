
// INSTANCIA EL MODELO
const Portfolio = require('../models/Portfolio')
const { uploadImage ,deleteImage} = require('../config/cloudinary')

const fs = require('fs-extra')

const renderAllPortafolios = async (req, res) => {
    const portfolios = await Portfolio.find({ user: req.user._id }).lean()
    res.render("portafolio/allPortfolios", { portfolios })
}


const renderPortafolio = (req, res) => {
    res.send('Mostrar el detalle de un portafolio')
}
// PRESENTAR EL FORMULARIO
const renderPortafolioForm = (req, res) => {
    res.render('portafolio/newFormPortafolio')
}
// CAPTURAR LOS DATOS DEL FORMULARIO PARA ALMACENAR EN LA BDD
const createNewPortafolio = async (req, res) => {
    // DESESTRUCTURAR
    const { title, category, description } = req.body
    //CREAR UNA NUEVA INSTANCIA
    const newPortfolio = new Portfolio({ title, category, description })
    // ALA INSTANCIA DEL DOCMENTO newPortfolio LE AGREGO AHORA EL USUARIO
    //REQ.USER.ID VIENE DE LA SESION
    newPortfolio.user = req.user._id
    // VALIDACION DE LA IMAGEN
    if (!(req.files?.image)) return res.send("Se requiere una imagen")

    // LA INVOCACION DEL METODO

    const imageUpload = await uploadImage(req.files.image.tempFilePath)
    newPortfolio.image = {
        public_id: imageUpload.public_id,
        secure_url: imageUpload.secure_url
    }
    await fs.unlink(req.files.image.tempFilePath)
    // EJECUTAR EL METODO SAVE()
    await newPortfolio.save()
    res.redirect('/portafolios')
}

const renderEditPortafolioForm = async (req, res) => {
    // a partir del modelo llamara al metodo findById
    const portfolio = await Portfolio.findById(req.params.id).lean()
    // con la variable portfolio pontar en la vista del formulario
    res.render('portafolio/editPortfolio', { portfolio })
}


const updatePortafolio = async(req,res)=>{
    //verificar el id del portafolio 
    const portfolio = await Portfolio.findById(req.params.id).lean()
    // si es TRUE continuar con la edicion y si es false enviar a la ruta portafolios
    if(portfolio._id != req.params.id) return res.redirect('/portafolios')
    
    if(req.files?.image) {
        if(!(req.files?.image)) return res.send("Se requiere una imagen")
        await deleteImage(portfolio.image.public_id)
        const imageUpload = await uploadImage(req.files.image.tempFilePath)
        const data ={
            title:req.body.title || portfolio.name,
            category: req.body.category || portfolio.category,
            description:req.body.description || portfolio.description,
            image : {
            public_id:imageUpload.public_id,
            secure_url:imageUpload.secure_url
            }
        }
        await fs.unlink(req.files.image.tempFilePath)
        await Portfolio.findByIdAndUpdate(req.params.id,data)
    }
    else{
        const {title,category,description}= req.body
        await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    }
    res.redirect('/portafolios')
}

const deletePortafolio = async (req, res) => {
    // a partir del modelo usar el metodo findByIdAndDelete
    const portafolio = await Portfolio.findByIdAndDelete(req.params.id)
    // invocar al metodo y pasar el id
    await deleteImage(portafolio.image.public_id)
    // hacer redirect
    res.redirect('/portafolios')
}


module.exports = {
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}