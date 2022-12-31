

import userDb from "../../model/user"

export default eventHandler(async(event) => {   
    const address = event.context.params.address as string;
   try {
    const user = await userDb.findOne({address})

    if(user){
        return ({
            statusCode: 200,
            data:user,
            message:"User already exists"
        })
    }
    const newUser = new userDb({address, isPending:true})
    const savedUser = await newUser.save()
    
    return ({
        statusCode: 200,
        data:savedUser,
        message:"User created"
    })
   }
   catch(err){
            return ({
                statusCode: 500,
                error:err,
                message:"something went wrong"
            })
        }
})
