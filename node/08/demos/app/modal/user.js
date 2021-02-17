module.exports = app => {
  const mongoose = app.mongoose
  const UserSchema = new mongoose.Schema({
      mobile:{type:Number,unique:true,require:true},
      password:{type:String,require:true},
      realName:{type:String,require:true},
      avatar:{type:String,default:'https://dss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=1649880233,1998414638&fm=74&app=80&f=PNG&size=f121,121?sec=1880279984&t=598461585258cc5a11eefb188e9adb7f'},
      extra:{type:mongoose.Schema.Types.Mixed},
      createAt:{type:Date,default:Date.now}
  })
}