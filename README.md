# twitch_soundboard
<p>Makes chat able to select and play a list of sounds on stream made by the Streamer.</p>

---
<h3>- How to use:</h3>
<p>Install NodeJS on your machine</p>

<p>Open <code>config_env.json</code> and add/edit the following attributes:</p>

- <b>cooldown:</b> Put in numbers how many seconds you want to cooldown the user after sending a sound request.
- <b>password:</b> Put your authbot token here.
- <b>username:</b> Put your bots name here.
- <b>channel:</b> Put your channel here.
- <b>debug:</b> <code>true</code> or <code>false</code>. For debug purposes. <b>Turning this on will make the !admin commands available to everyone.</b>

<p>After configuring, rename it to <code>config.json</code>, taking out the <code>_env.json</code> part.</p>

Now run <code>npm install</code> and <code>npm start</code> to run the bot.

<i>NOTE: Only the channel's streamer is able to use !admin commands.</i>

---
<h3>- Adding sounds:</h3>
<p>Leave .mp3 sounds in the /music folder. To play the sound, type <code>!sb "filename"</code> in chat.</p>

