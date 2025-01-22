const bcrypt = require("bcrypt");
const createUser = require("../models/userModel");

const registerUser = (req, res)=>{
    const {username, email, password} = req.body;

    // validate input
    if(!username || !email || !password){
        return res.status(400).json({error: "All field are required"});
    }

    //hash the password

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hashedPassword)=>{
        if(err){
            console.log("Error hashing password:", err);
            return res.status(500).json({error: "Intenal server error"});
        }
    })

    //save user in database

    createUser(username, email, hashedPassword, (err, result)=>{
        if(err){
            console.log("Error inserting user", err);
            return res.status(500).json({error: "Database error"});
        }
        return res.status(201).json({message: "User registered successfully"})
    })
}

module.exports = {registerUser}