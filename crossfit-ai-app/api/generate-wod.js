import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(

  process.env.GEMINI_API_KEY

);

 

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error:"Método no permitido",
        });
    }

  try {

    const model = genAI.getGenerativeModel({

      model: "gemini-2.5-flash",

    });

    const {
        wodType,
        duration,
        objective,
        level,
        peopleType,
        requiredElements,
        excludedElements,
    } = req.body;

 

    const result = await model.generateContent(

      `Genera un WOD de CrossFit utilizando estos datos:
      
      Tipo de WOD: ${wodType}
      Duración: ${duration}
      Objetivo: ${objective}
      Nivel: ${level}
      Número de personas: ${peopleType}

      Elementos obligatorios: ${requiredElements}
      Elementos excluidos: ${excludedElements}
      
        Devuélveme únicamente este formato:

        Nombre: (Nombre del WOD)
        Tipo: (Tipo de WOD)
        WOD: 
        (Lista de ejercicios)

        No expliques nada.
        No añadas estrategia.
        No añadas pacing.
        No añadas texto adicional
        No añadas líneas entre texto.

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