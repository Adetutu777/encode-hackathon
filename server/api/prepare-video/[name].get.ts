import axios from "axios"



export default eventHandler(async(event) => {
  const API_TOKEN = process.env.LIVEPEER_API_KEY
    const name = event.context?.params?.name
    try {      
        const res = await axios({
          method: "POST",
          url: "https://livepeer.studio/api/asset/request-upload",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
          data: { name },
        });
    
        return {
          url: res?.data?.url,
          playBackId: res.data?.asset?.playbackId,
        };
      } catch (e) {
        console.log(e, "error from server")
      
        return e
      
      }
})