

exports.allAccess= (req,res)=>{
    res.status(200).send("Public Area")
}

exports.learnerBoard= (req,res)=>{
    res.status(200).send("User Content")
}

exports.adminBoard= (req,res)=>{
    res.status(200).send("Admin Content")
}

exports.instructorBoard= (req,res)=>{
    res.status(200).send("Instructor Content")
}

