
import crypto from "crypto";
import { Configuration, OpenAIApi } from "openai"
import axios from "axios";
import sharp from "sharp";


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);


export default eventHandler(async(event) => {
    const prompts = getQuery(event).prompt as string;
   

    const response = await openai.createImage({
        prompt:prompts,
        n: 5,
        // size: "1024x1024",
        size: "512x512",
      });
        const tempFileName = crypto.randomBytes(16).toString("hex");
   
     const url =response.data.data[0].url as string
    //  console.log(response.data.data)
     const images = response.data.data

     const res = await Promise.all(images.map(async(i:any, index:number)=>{
      const item =  await axios.get(i.url, {
        responseType: "arraybuffer",
      })
      const response = item.data
      const buffer = Buffer.from(response)
    const bufIm =   await sharp(buffer)
      .resize(1000, 420)
      .toFile(`${tempFileName+index}.jpeg`, (_:any, info:any) => {    
        return info
       })
       .toBuffer()  
       const coverted = bufIm.toString('base64')
      return`data:image/jpeg;base64,${coverted}`
     }))

         const im = Buffer.from(
  (
    await axios.get(url, {
    responseType: "arraybuffer",
  })
).data,
"utf-8"
)

const r = await sharp(im)
  .resize(1000, 420)
  .toFile(`./static/${tempFileName}.jpeg`, (_:any, info:any) => {    
    return info
   })
   .toBuffer()

   const rBufferToBase64 = Buffer.from(r).toString('base64')

   return ({
        // data:`data:image/jpeg;base64,${rBufferToBase64}`,  
        raw:`data:image/jpeg;base64,${im}`,
        compressBuffer:r.toString(),
        data:res
     
    })
    })


