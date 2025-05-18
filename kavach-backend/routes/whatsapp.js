const express = require('express');
const router = express.Router();
const handleIncomingMessage = require('../services/messageHandler');

router.post('/', async (req, res) => {
  const { Body, From } = req.body;

  console.log('📩 Incoming message:', Body);

  try {
    const twiml = await handleIncomingMessage(Body, From);

    console.log('🧾 Outgoing TwiML:', twiml);

    // Ensure the response type is correct
    res.set('Content-Type', 'application/xml');
    res.writeHead(200, { 'Content-Type': 'application/xml' });
    res.end(twiml);
  } catch (error) {
    console.error('❌ Error generating TwiML:', error);
    res.status(500).send('Error processing your request');
  }
});

module.exports = router;
