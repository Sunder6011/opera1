const Pool = require("pg").Pool

const pool = new Pool({
    user : process.env.user,
    host :'localhost',
    database:"IDP",
    password: process.env.password,
    port:5432
})

const createemployee = (req,res)=>{
    const {name , email} = req.body;

    pool.query(
        "INSERT INTO employees (name, email) VALUES ($1,$2) RETURNING *",
        [name, email],
        (err,result)=>{
            if(err){
                console.log(err)
                throw err
            }

            res.status(200).json({
                msg : "data save sucessfully",
                data: result.rows[0],
            });
        }
    )
}

const getalldata = (req, res) =>{
    pool.query("select * from indicator_data_mgms",(err,result)=>{
        if(err){
            console.log(err)
            throw err
        }

        res.json({
            data: result.rows
        });

        console.log(data)
    })
}

module.exports ={
    createemployee,getalldata
}