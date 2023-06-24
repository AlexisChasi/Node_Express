// Exportando una funcion isAutthenticated
// req, res,next
module.exports.isAuthenticated = (req,res,next)=>{
    // validacion del isAuthenticated
    if(req.isAuthenticated()){
        // continue con las demas ruta 
        return next()
    }
    // redireccionar al login
    res.redirect('/user/login')
}
