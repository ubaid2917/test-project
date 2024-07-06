const User = require("../model/userModel");
const Vehical = require("../model/vehicalModel");
const path = require('path');


async function loadLogin(req, res) {
  try {
    res.render("login.ejs");
  } catch (error) {
    console.log(error.message);
  }
}

// login 
async function login(req,res){
    try {  

        const {email, password} = req.body;

        // Validate the form
        if (!email ||!password) {
            return res.status(400).render( 'login.ejs',  {success: false,  msg: "Please enter all fields" });
        }else{
             if(email === "Amjad@desolint.com"){
                if(password === "12345abc"){

                }else{
                    return res.status(200).render( 'login.ejs',  {success: false,  msg: "Please enter all fields" });
                }
             }else{
                return res.status(200).render( 'login.ejs',  {success: false,  msg: "Invalid credientials" });
            }

            return res.status(200).redirect( '/vehical-info');
        }
        
    } catch (error) {
        console.log(error.message);
    }
} 



// vehical details  
async function loadVehicalInfo(req,res){
  try {
    res.render('vehical-info.ejs')
  } catch (error) {
    console.log(error.message);
  }
}


async function vehicalInfo(req, res) {
  try {
      const { carModel, price, phone, city, color, ownerName } = req.body;

      if (!carModel || !price || !phone || !city || !color || !ownerName) {
          return res.status(400).render('vehical-info', { success: false, msg: "All fields are required" });
      }

      if (carModel.length < 3) {
          return res.status(400).render('vehical-info', { success: false, msg: "Car model length must be greater than 3" });
      }

      if (phone.length !== 11) {
          return res.status(400).render('vehical-info', { success: false, msg: "Phone must be 11 digits" });
      }

      // Array to hold uploaded image URLs
      let imageUrls = [];

      // Check if files were uploaded
      if (req.files && req.files.length > 0) {
          req.files.forEach(file => {
              imageUrls.push(file.filename);
          });
      }

      const vehical = new Vehical({
          carModel,
          price,
          phone,
          city,
          color,
           ownerName,
          images: imageUrls
      });

      await vehical.save();

      return res.status(200).redirect('/showAllvehical');
  } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
  }
} 


async function showAllVehical(req,res){
  try{
 
    const vehicals = await Vehical.find({});

    res.status(200).render('showAllVehicals.ejs', {vehicals: vehicals});
  }catch(error){
    console.log(error.message);
  }
}



module.exports = {
  loadLogin,
  login,
  loadVehicalInfo,
  vehicalInfo,
  showAllVehical,
};
