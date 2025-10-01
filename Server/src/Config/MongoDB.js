const mongoose = require('mongoose')


async function main(){
   console.log('init mongo')
   await mongoose.connect(process.env.DB_KEY)
   console.log('done mongo')
}

module.exports = main