
import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);


export default eventHandler(async(event) => {
    const prompts = getQuery(event).prompt as string;

    const response = await openai.createImage({
        prompt:prompts,
        n: 1,
        size: "512x512",
      });
 
    return ({
        data: response.data.data[0].url
    })
    })