
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { description } = await request.json();
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (!OPENAI_API_KEY) {
    return NextResponse.json({ error: 'Missing OpenAI API Key' }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Sei un esperto zoologo immaginario. Scrivi una breve descrizione scientifica di un animale basato sulla descrizione dell\'utente, usando linguaggio tecnico ma semplice. Massimo 100 parole.'
          },
          {
            role: 'user',
            content: description,
          }
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content;

    return NextResponse.json({ description: aiMessage });
  } catch (error) {
    console.error('Errore nella generazione della descrizione:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
