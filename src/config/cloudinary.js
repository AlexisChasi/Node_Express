const cloudinary = require('cloudinary').v2


cloudinary.config({ 
    // LLAMAR A LAS VARIABLES DEL ARCHIVO . ENV
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
});
// EXPORTACION DEL POR DEFAULT DEL METODO uploadImage
module.exports.uploadImage = async(filePath) => {
// SUBIR LA IMAGEN DE LA RUTA(FILEPATH)  EN LA CARPETA PORTAFOLIO
// DE CLOUDIMARY
    return await cloudinary.uploader.upload(filePath,{folder:'portafolio'})
}
// elimina las imagenes del clodinary cuando se elimina del portafolio
module.exports.deleteImage = async (publicId)=>{
    
    return await cloudinary.uploader.destroy(publicId)
}