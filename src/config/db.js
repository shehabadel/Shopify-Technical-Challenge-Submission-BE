
const _connect = require('mongoose').connect;

const connect = () => {
    return _connect(
        process.env.DB_URL, 
        { useNewUrlParser: true },
        err=>{
            if(err) throw err;
            console.log('Connected to MongoDB!')
        }
    )
}
module.exports.connect = connect