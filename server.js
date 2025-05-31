const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Untuk serve file HTML/JS

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/cek-fakta', async (req, res) => {
  try {
    const { claim } = req.body;

    const prompt = `Klaim: "${claim}"\n\nTolong verifikasi kebenaran klaim ini secara medis dan parenting. Jawablah dengan format berikut:\n\n✅ Status Klaim: (Benar / Salah / Tidak Diketahui)\n🧠 Penjelasan:\n📚 Sumber:`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 500
    });

    const reply = completion.choices[0].message.content;
    res.json({ hasil: reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal memproses permintaan.' });
  }
});

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
