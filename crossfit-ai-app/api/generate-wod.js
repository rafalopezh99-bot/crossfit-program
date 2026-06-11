import { GoogleGenerativeAI } from "@google/generative-ai";

 

const genAI = new GoogleGenerativeAI(

  process.env.GEMINI_API_KEY

);

 

export default async function handler(req, res) {

  try {

    const model = genAI.getGenerativeModel({

      model: "gemini-2.5-flash",

    });

 

    const result = await model.generateContent(

      `Genera un WOD de CrossFit. 
      
        Devuélveme únicamente este formato:

        Nombre: (Nombre del WOD)

        Tipo: (Tipo de WOD)

        WOD: 

        (Lista de ejercicios)

        No expliques nada.
        No añadas estrategia.
        No añadas pacing.
        No añadas escalados.
        No añadas texto adicional

        Usa formato limmpio y corto.    
      `
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