require('dotenv').config()
const { Client } = require('discord.js-selfbot-v13')
const http = require('http')

const client = new Client()

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`)

    // Set streaming status
    client.user.setPresence({
        activities: [{
            name: 'BilloXD', // Custom stream title
            type: 'STREAMING',
            url: 'https://twitch.tv/billoxd' // Replace with your stream URL
        }],
        status: 'online'
    })

    // Fetch the channel where commands will be sent
    const channel = await client.channels.fetch(process.env.BUMP_CHANNEL)
    
    // ==========================================
    // 1. DISBOARD BUMP COMMAND
    // ==========================================
    async function bump() {
        try {
            await channel.sendSlash('302050872383242240', 'bump')
            console.count('Bumped!')
        } catch (error) {
            console.error('Error bumping:', error.message)
        }
    }

    function bumpLoop() {
        // Send bump message every 2 to 2.5 hours
        var randomNum = Math.round(Math.random() * (9000000 - 7200000 + 1)) + 7200000
        setTimeout(function () {
            bump()
            bumpLoop()
        }, randomNum)
    }
    
    // Start the bump cycle
    bump()
    bumpLoop()

    // ==========================================
    // 2. SECOND CUSTOM COMMAND
    // ==========================================
    async function customCommand() {
        try {
            // IMPORTANT: Replace 'TARGET_BOT_ID' and 'command_name'
            await channel.sendSlash('1222548162741538938', 'bump')
            console.count('Custom command executed!')
        } catch (error) {
            console.error('Error executing custom command:', error.message)
        }
    }

    function customLoop() {
        // Set your random timer based on the new command's cooldown.
        // Currently set to: Every 1 to 1.5 hours (3600000 to 5400000 ms)
        var randomNum2 = Math.round(Math.random() * (5400000 - 3600000 + 1)) + 3600000
        setTimeout(function () {
            customCommand()
            customLoop()
        }, randomNum2)
    }
    
    // Start the custom command cycle
    customCommand()
    customLoop()
})

client.login(process.env.TOKEN)

// ==========================================
// 3. HTTP SERVER (KEEP ALIVE)
// ==========================================
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
