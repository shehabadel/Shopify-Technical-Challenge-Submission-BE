
const _connect = require('mongoose').connect;

const connect = () => {
    return _connect(
        "mongodb://localhost:27017/STCIBE", 
        { useNewUrlParser: true },
        err=>{
            if(err) throw err;
            console.log('Connected to MongoDB!')
        }
    )
}
module.exports.connect = connect