require('dotenv').config()
const { Client } = require('discord.js-selfbot-v13')
const http = require('http')

const client = new Client()

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`)

    const channel = await client.channels.fetch(process.env.BUMP_CHANNEL)
    
    async function bump() {
        await channel.sendSlash('302050872383242240', 'bump')
        console.count('Bumped!')
    }

    function loop() {
        // send bump message every 2-3 hours, to prevent detection.
        var randomNum = Math.round(Math.random() * (9000000 - 7200000 + 1)) + 7200000
        setTimeout(function () {
            bump()
            loop()
        }, randomNum)
    }
    
    bump()
    loop()
})

client.login(process.env.TOKEN)

// HTTP server code
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.end(`
    <html>
      <head>
        <title>Your Web View</title>
      </head>
      <body style="margin: 0; padding: 0;">
        <iframe width="100%" height="100%" src="https://billoxd.carrd.co/" frameborder="0" allowfullscreen></iframe>
      </body>
    </html>`)
})

server.listen(3000, () => {
  console.log('Server Online because of BilloXD✅!!')
})
