const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken")
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"]
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: [true, "Please try different email"],
        match: [ //Regex
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Please provide a valid email"
        ]
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"] //rolün değerini enumla belirtiyoruz.
    },
    password: {
        type: String,
        minlength: [6, "Please provide a password with min length 6"],
        required: [true, "Please provide a password"],
        select: false //parolanın görünmemesi için
    },
    createdAt: { //Kullanıcı ne zaman kayıt oldu.
        type: Date,
        default: Date.now
    },
    title: {
        type: String
    },
    about: {
        type: String
    },
    place: {
        type: String
    },
    website: {
        type: String
    },
    profile_image: {
        type: String,
        default: "default.jpg"
    },
    blocked: {
        type: Boolean,
        default: false
    }
})
//UserSchema Methods 
UserSchema.methods.generateJwtFromUser = function(){
    //Önce payload oluşturulur. Payload bir objedir.
    const {JWT_SECRET_KEY, JWT_EXPIRE} = process.env;
    const payload = {
        id: this._id,
        name: this.name
        
    }

    const token = jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn : JWT_EXPIRE
    })
    return token

}

//Pre Hooks
UserSchema.pre("save", function (next) {
      //Parola Değişmemişse hashlenmiş kısmın tekrar çalışmaması kontrolü
      if(!this.isModified("password")) { //Parola değişmemişse
        next();
    }
  
    bcrypt.genSalt(10, (err, salt) =>{
        if(err) next(err)
        bcrypt.hash("B4c0/\/", salt, (err, hash) => {
           // Store hash in your password DB.
            if(err) next(err)
            this.password = hash;
            next();
        });
    });
})

module.exports = mongoose.model("User", UserSchema)
//users

//users.creat