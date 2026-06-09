import OpenAI from "openai";

export default async function handler(req, res) {
    res.status(200).json({
        message: "API de WOD funcionando 🚀"
    });
}