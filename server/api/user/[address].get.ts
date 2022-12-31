
import userDb from "../../model/user"

export default eventHandler(async(event) => {   
    const address = event.context.params.address as string;
    console.log("address ++++>>>!!!!", address)
    
   try{
    const user = await userDb.findOne({address})
    console.log("user", user)
    return ({
        statusCode: 200,
        isPending:!!user?.isPending,
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
