import { GoogleGenerativeAI } from "@google/generative-ai";

 

const genAI = new GoogleGenerativeAI(

  process.env.GEMINI_API_KEY

);

 

export default async function handler(req, res) {

  try {

    const model = genAI.getGenerativeModel({

      model: "gemini-1.5-flash",

    });

 

    const result = await model.generateContent(

      "Genera un WOD de CrossFit AMRAP de 20 minutos con nombre creativo, ejercicios y explicación breve."

    );

 

    const response = await result.response;

    const text = response.text();

 

    res.status(200).json({

      wod: text,

    });

  } catch (error) {

    res.status(500).json({

      error: "Error generando el WOD",

      details: error.message,

    });

  }

}