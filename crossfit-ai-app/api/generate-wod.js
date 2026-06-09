import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
    try {
        const response = await client.responses.create({
            model: "gpt-4.1-mini",
            input: "Genera un WOD de Crossfit AMRAP de 20 minutos con nombre, ejercicios y explicación breve, por favor",
        });

        res.status(200).json({
            wod: response.output_text,
        });
    } catch (error) {
        res.status(500).json( {
            error: "Error generando el WOD",
            details: error.message,
        });
    }
}