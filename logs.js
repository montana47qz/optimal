// Вставь свой токен бота и chat_id здесь
const TELEGRAM_BOT_TOKEN = '8401480098:AAEDUGA6oI06DzV7gDw3OqII6AFlmNpv4oE';
const TELEGRAM_CHAT_ID = '1946463409';

export async function handleRequest(request) {
  if (request.method === 'POST') {
    try {
      const data = await request.json();
      const { phone, prize } = data;

      // Отправляем сообщение в Telegram
      const text = `Новый участник!\nНомер: ${phone}\nПриз: ${prize}`;
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text })
      });

      return new Response(JSON.stringify({ status: 'ok' }), { status: 200 });
    } catch (err) {
      return new Response(JSON.stringify({ status: 'error', message: err.message }), { status: 500 });
    }
  } else {
    return new Response('Use POST', { status: 400 });
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
