const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", (req, res) => {
  const compliments = ["You have great gifts to offer the world",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
           "You're doin okay, even when you're cranky"
  ];
  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
});

app.get('/api/quote', (req, res) => {
  const quotes = ['Let your faith be stronger than your fear -Some Gif on the Internet',
    'Here you are, in this very breath, completely present. When distracting thoughts take you elsewhere, return immediately to the breath, with no blame. -Shinghe Roshi',
    'Unless you change and become like little children, you will never enter the kingdom of heaven. -Christ',
    'Some changes look negative on the surface but you will soon realize that space is being created in your life for something new to emerge -Eckhart Tolle',
    'Fundamentally take your seat -Jun Po Roshi'
  ]

  let randomIndex = Math.floor(Math.random() * quotes.length);
  let randomQuote = quotes[randomIndex]

  res.status(200).send(randomQuote);

});

//getAllBuddhas

const { getBuddhas } = require('./controller.js')
app.get('/api/buddhas', getBuddhas)

const { getOneBuddha } = require('./controller.js')
app.get('/api/buddhas', getOneBuddha)

// const { deleteBuddha } = require('./controller')
// app.delete('/api/buddhas/:id', deleteBuddha)

// const { createBuddha } = require('./controller')
// app.post('/api/buddhas', createBuddha)

// const { updateBuddha } = require('./controller.js')
// app.put('/api/buddhas/:id' , updateBuddha)






app.listen(4000, () => console.log("Server running on 4000"));
