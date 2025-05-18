const Airtable = require('airtable');
require('dotenv').config();

const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(process.env.AIRTABLE_BASE_ID);

async function saveSubscription(data) {
  try {
    await base('Subscriptions').create([
      {
        fields: {
          Phone: data.phone,
          Name: data.name,
          Age: parseInt(data.age),
          City: data.city,
          Aadhaar: data.aadhaar,
          Plan: data.plan,
          Premium: data.premium,
          Coverage: data.coverage,
        },
      },
    ]);
    console.log('✅ Subscription saved to Airtable.');
  } catch (error) {
    console.error('❌ Error saving subscription:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

async function saveClaim({ phone, reason, date, amount, status }) {
  try {
    // Generate a unique Claim ID
    const claimId = `CLM-${Date.now()}`;
    const fields = {
      "Claim ID": claimId,
      Phone: phone,
      Reason: reason,
      Date: date,
      "Claim Amount": amount,
      Status: status,
    };


    await base('Claims').create([
      {
        fields: fields,
      },
    ]);
    console.log(`✅ Claim saved to Airtable with ID: ${claimId}`);
    return claimId;  // Return the claim ID for further use
  } catch (error) {
    console.error('❌ Error saving claim:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
}

async function getLatestClaim(phone) {
  try {
    const records = await base('Claims')
      .select({
        filterByFormula: `{Phone} = '${phone}'`,
        sort: [{ field: 'Created At', direction: 'desc' }],
        maxRecords: 1,
      })
      .firstPage();

    if (records.length === 0) return null;

    const claim = records[0].fields;
    return {
      id: claim['Claim ID'],
      reason: claim.Reason,
      date: claim.Date,
      amount: claim['Claim Amount'],
      status: claim.Status,
      fraud_score: claim['Fraud Score'] || 'N/A', // Keep default
      prediction: claim.Prediction || 'N/A',    // Keep default
    };
  } catch (error) {
    console.error('❌ Error fetching latest claim:', error);
    return null;
  }
}

module.exports = { saveSubscription, saveClaim, getLatestClaim };