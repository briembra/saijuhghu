const mineflayer = require('mineflayer');
const http = require('http');
const readline = require('readline');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'donutsmp.net',
    port: 25565,
    auth: 'microsoft',
    username: 'jouw-email@outlook.com',
    version: '1.21.4'
  });

  bot.on('login', () => {
    console.log('✅ Bot ingelogd op donutsmp.net!');
  });

  bot.on('kicked', (reason, loggedIn) => {
    console.log(`⛔ Gekickt: ${reason}`);
    setTimeout(createBot, 30000);
  });

  bot.on('end', () => {
    console.log('❌ Verbinding verbroken, probeer opnieuw...');
    setTimeout(createBot, 30000);
  });

  bot.on('error', err => {
    console.error('⚠️ Fout:', err);
  });

  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Bot is online!');
  }).listen(3000);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', input => {
    if (bot.chat) {
      bot.chat(input);
    }
  });
}

createBot();
