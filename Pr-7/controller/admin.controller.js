let adminModel = require('../model/admin.model')
let bcrypt = require('bcrypt')
let path = require('path')
let fs = require('fs')
exports.addAdminPage = (req,res)=>{
    res.render('admin/addAdmin')
}

exports.addAdmin= async(req,res)=>{
   try {
    let profileImage = ''
    if(req.file){
        profileImage = `/uploads/${req.file.filename}`
    } 
    let haspassword = await bcrypt.hash(req.body.password,10)

    let admin = await adminModel.create({
        ...req.body,
         password:haspassword,
        profileImage
    })

    console.log(admin)
    res.redirect('/admin/view-admin')
   } catch (error) {
    console.log(error)
    res.redirect('/')
   }
}


exports.viewAdminPage = async(req,res)=>{
    try {
        let admins = await adminModel.find()
        res.render('admin/viewAdmin',{admins})
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

exports.deleteAdmin = async(req,res)=>{
    try {
        let id = req.params.id
        let admin = await adminModel.findById(id)

        if(admin.profileImage !== ""){
            let imagepath = await path.join(__dirname,'..',admin.profileImage)
            await fs.unlinkSync(imagepath)
        }

        await adminModel.findByIdAndDelete(id)
        res.redirect('/admin/view-admin')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}


exports.editAdminPage =  async(req,res)=>{
    let id = req.params.id
    let admin = await adminModel.findById(id)
    res.render('admin/editAdmin',{admin})
}

exports.updateAdmin = async(req,res)=>{
    try {
        let id = req.params.id
        let admin = await adminModel.findById(id)
        let profileImage = admin.profileImage
        if(req.file){
            if(profileImage !==""){
                let imagepath = path.join(__dirname,'..',profileImage)
                await fs.unlinkSync(imagepath)
            }
            profileImage = `/uploads/${req.file.filename}`
        }

       await adminModel.findByIdAndUpdate(id,{...req.body,profileImage},{new:true})
       res.redirect('/admin/view-admin')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}