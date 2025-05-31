// ai-check.js — AI Fact Checker (Frontend-only, uses GPT API directly)

const form = document.getElementById('fact-check-form');
const textarea = form.querySelector('textarea');
const resultSection = document.getElementById('result-section');
const verdictCard = document.querySelector('.verdict-card');
const explanationCard = document.querySelector('.explanation-card p');
const sourcesCard = document.querySelector('.sources-card ul');
const checkAnotherButton = document.getElementById('check-another-button');

// 🔑 API Key (gunakan hanya untuk prototyping — GANTI DENGAN MILIKMU SENDIRI)
const OPENAI_API_KEY = "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"; // GANTI dengan milikmu

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const klaim = textarea.value.trim();
  if (!klaim) return alert("Tolong masukkan klaim yang ingin dicek.");

  const button = form.querySelector('button');
  button.innerText = "Memeriksa...";
  button.disabled = true;

  const prompt = `Klaim: "${klaim}"

Tolong verifikasi kebenaran klaim ini secara medis dan parenting. Jawablah dengan format berikut (dan hanya dalam format ini):

✅ Status Klaim: (Benar / Salah / Tidak Diketahui)  
🧠 Penjelasan: (jelaskan dengan bahasa sederhana)  
📚 Sumber: (sebutkan nama artikel dan link, atau tulis "Tidak ditemukan referensi yang disebutkan")`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
        max_tokens: 600
      })
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "Tidak ada jawaban.";

    // Parsing hasil
    const statusMatch = reply.match(/Status Klaim:\s*(.*)/i);
    const explanationMatch = reply.match(/Penjelasan:\s*([\s\S]*?)Sumber:/i);
    const sourceMatch = reply.match(/Sumber:\s*([\s\S]*)$/i);

    const status = statusMatch ? statusMatch[1].trim().toLowerCase() : "tidak diketahui";
    const explanation = explanationMatch ? explanationMatch[1].trim() : reply;
    const sources = sourceMatch ? sourceMatch[1].trim().split('\n').filter(Boolean) : [];

    // Tampilkan status
    verdictCard.className = 'verdict-card';
    if (status.includes("salah")) {
      verdictCard.classList.add('hoax');
      verdictCard.innerHTML = `<i class='bx bxs-x-circle'></i><h3>Klaim Terindikasi Hoax / Misinformasi</h3>`;
    } else if (status.includes("benar")) {
      verdictCard.classList.add('valid');
      verdictCard.innerHTML = `<i class='bx bxs-check-circle'></i><h3>Klaim Terverifikasi Benar</h3>`;
    } else {
      verdictCard.innerHTML = `<i class='bx bxs-help-circle'></i><h3>Status Klaim Tidak Diketahui</h3>`;
    }

    explanationCard.innerHTML = explanation;

    sourcesCard.innerHTML = sources.length > 0
      ? sources.map(src => `<li>${autolink(src)}</li>`).join('')
      : `<li>Tidak ditemukan referensi yang disebutkan.</li>`;

    resultSection.classList.remove('hidden');
    form.parentElement.classList.add('hidden');

  } catch (error) {
    console.error("Gagal memproses:", error);
    alert("Terjadi kesalahan. Silakan coba lagi.");
  } finally {
    button.innerText = "Cek Fakta Sekarang";
    button.disabled = false;
  }
});

checkAnotherButton.addEventListener('click', () => {
  resultSection.classList.add('hidden');
  form.parentElement.classList.remove('hidden');
  textarea.value = "";
});

function autolink(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, url => `<a href="${url}" target="_blank">${url}</a>`);
}
