const { MessagingResponse } = require('twilio').twiml;
const { saveSubscription, saveClaim, getLatestClaim } = require('./airtableService'); // Assuming getLatestClaim is in airtableService
const sessions = new Map();

// ✅ Seasonal Message Function
function getSeasonalMessage(month) {
  const summer = [3, 4, 5]; // Apr, May, Jun
  const monsoon = [6, 7, 8]; // Jul, Aug, Sep
  const winter = [11, 0, 1]; // Dec, Jan, Feb

  if (summer.includes(month)) {
    return {
      season: 'Summer',
      message: `🌞 It's peak summer right now — cases of sunstroke and fainting are on the rise.\nLong exposure can cause heatstroke or dehydration.\nStay protected, wear light clothes, and hydrate often.`,
      topup_price: '₹5/day'
    };
  } else if (monsoon.includes(month)) {
    return {
      season: 'Monsoon',
      message: `🌧️ Monsoon brings high infection risk and slippery roads.\nHospitals see a spike in dengue, waterborne illnesses, and fracture cases.\nBe cautious and carry rain protection.`,
      topup_price: '₹5/day'
    };
  } else if (winter.includes(month)) {
    return {
      season: 'Winter',
      message: `❄️ Winter months hit hard — low immunity, flu outbreaks, and joint pain are common.\nElderly and kids are especially at risk.\nKeep warm and take necessary care.`,
      topup_price: '₹3/day'
    };
  }

  return null;
}

// ✅ Initialize Session
function initSession(phone) {
  sessions.set(phone, {
    step: 'INIT',
    data: {},
  });
}

// ✅ Main Message Handler
async function handleIncomingMessage(body, from) {
  const message = body.trim().toLowerCase();
  const twiml = new MessagingResponse();

  if (!sessions.has(from)) {
    initSession(from);
  }

  const session = sessions.get(from);
  const data = session.data;

  // ✅ Welcome Message and Plan Options
  if (message === 'hi' || message === 'plans') {
    initSession(from);
    const newSession = sessions.get(from);
    newSession.step = 'WAITING_FOR_PLAN';
    twiml.message(
      `🛡️ *Welcome to KAVACH!*\n\n` +
      `Here are our *insurance plans*:\n\n` +
      `◻️ *KAVACH SILVER* – ₹5/day\n` +
      `• ₹15,000 accident coverage\n` +
      `• Pause option\n` +
      `• Referral bonuses\n` +
      `• Weather alerts\n` +
      `👉 Type "Subscribe Silver" to enroll.\n\n` +
      `🟨 *KAVACH GOLD* – ₹10/day\n` +
      `• Everything in Silver, plus:\n` +
      `  – ₹30K accident + ₹15K hospitalization\n` +
      `  – Faster claims\n` +
      `  – Loyalty rewards\n` +
      `  – Emergency cash-out\n` +
      `👉 Type "Subscribe Gold" to enroll.\n\n` +
      `🔷 *KAVACH PLATINUM* – ₹25/day\n` +
      `• Everything in Gold, plus:\n` +
      `  – ₹1L accident + ₹50K hospitalization + OPD\n` +
      `  – Wallet access\n` +
      `  – Clinic discounts\n` +
      `  – Annual check-up\n` +
      `👉 Type "Subscribe Platinum" to enroll.`
    );
    return twiml.toString();
  }

  // ✅ Pause Subscription
  if (message === 'pause') {
    sessions.delete(from);
    twiml.message('⏸️ Your subscription is now paused. Type "hi" to restart anytime.');
    return twiml.toString();
  }

  // ✅ Initiate Claim Process
  if (message === 'help claim') {
    session.step = 'CLAIM_REASON';
    twiml.message('📝 Please describe what happened.');
    return twiml.toString();
  }

  // ✅ Check Claim Status
  if (message === 'check claim' || message === 'claim status') {
    try {
      const latestClaim = await getLatestClaim(from);
      if (!latestClaim) {
        twiml.message('🔍 No claims found. You haven\'t filed any claims yet.');
      } else {
        //  Display Claim Status
        let claimStatusMessage = `🔍 *Latest Claim Status:*\n` +
          `📂 *Claim ID:* ${latestClaim.id}\n` +
          `📝 *Reason:* ${latestClaim.reason}\n` +
          `📅 *Date:* ${latestClaim.date}\n` +
          `💰 *Amount:* ₹${latestClaim.amount}\n` +
          `📊 *Status:* ${latestClaim.status}`;

        // Add fraud score and prediction if available
        if (latestClaim.fraud_score && latestClaim.fraud_score !== 'N/A') {
          claimStatusMessage += `\n🔍 *Fraud Score:* ${latestClaim.fraud_score}`;
        }
        if (latestClaim.prediction && latestClaim.prediction !== 'N/A') {
          claimStatusMessage += `\n💡 *Prediction:* ${latestClaim.prediction}`;
        }

        twiml.message(claimStatusMessage);
      }
    } catch (error) {
      console.error('❌ Error checking claim status:', error);
      twiml.message('❌ Unable to retrieve your claim status. Please try again later.');
    }
    return twiml.toString();
  }

  // ✅ Enhanced Help Section
  if (message === 'help') {
    const helpMessage =
      `🆘 *KAVACH Help & Support*\n\n` +
      `🔍 *General Commands:*\n` +
      `• Type "Hi" to enroll/start using KAVACH.\n` +
      `• Type "Plans" to view available insurance plans.\n` +
      `• Type "Pause" to temporarily pause your subscription.\n` +
      `• Type "Check Claim" to view your latest claim status.\n` +
      `• Type "Help Claim" to start the claim process.\n` +
      `• Type "Renew" to extend your subscription.\n` +
      `• Type "Cancel" to end your subscription.\n\n` +
      `📑 *How to File a Claim:*\n` +
      `1. Type "Help Claim" to start.\n` +
      `2. Follow the prompts to enter details like reason, date, and amount.\n` +
      `3. Confirm your claim and receive a claim ID.\n` +
      `4. Use "Check Claim" to monitor status.\n\n` +
      `❓ *Troubleshooting:*\n` +
      `• If your claim status does not update, wait a few minutes and try again.\n` +
      `• If your subscription details are incorrect, type "Update Info".\n\n` +
      `📞 *Need More Help?*\n` +
      `Contact KAVACH support at support@kavach.com or call +91 12345 67890.\n` +
      `We’re here to assist you!`;
    twiml.message(helpMessage);
    return twiml.toString();
  }

  // ✅ Handle Unrecognized Input
  if (session.step === 'INIT' && message !== 'hi' && message !== 'help') {
    twiml.message('⚠️ Unrecognized input. To start using KAVACH, type "Hi". If you need assistance, type "Help".');
    return twiml.toString();
  }

  // ✅ Main Session Handling
  switch (session.step) {
    // Subscription Plan Selection
    case 'WAITING_FOR_PLAN':
      if (message.includes('subscribe')) {
        if (message.includes('silver')) {
          data.selected_plan = 'Silver';
          data.plan_price = '₹5/day';
          data.plan_coverage = '₹15,000 accident coverage\nPause option, referral bonuses, weather alerts.';
        } else if (message.includes('gold')) {
          data.selected_plan = 'Gold';
          data.plan_price = '₹10/day';
          data.plan_coverage = '₹30K accident + ₹15K hospitalization\nFaster claims, loyalty rewards, emergency cash-out.';
        } else if (message.includes('platinum')) {
          data.selected_plan = 'Platinum';
          data.plan_price = '₹25/day';
          data.plan_coverage = '₹1L accident + ₹50K hospitalization + OPD\nWallet access, clinic discounts, annual check-up.';
        } else {
          twiml.message('❌ Invalid plan. Please type "Subscribe Silver", "Subscribe Gold", or "Subscribe Platinum".');
          return twiml.toString();
        }

        session.step = 'WAITING_FOR_NAME';
        twiml.message('Great choice! What’s your full name?');
        return twiml.toString();
      }
      break;

    // Collect User Information for Subscription
    case 'WAITING_FOR_NAME':
      data.user_name = body;
      session.step = 'WAITING_FOR_AGE';
      twiml.message('Thanks! What’s your age?');
      return twiml.toString();

    case 'WAITING_FOR_AGE':
      data.user_age = body;
      session.step = 'WAITING_FOR_CITY';
      twiml.message('Which city are you based in?');
      return twiml.toString();

    case 'WAITING_FOR_CITY':
      data.user_city = body;
      session.step = 'WAITING_FOR_AADHAAR';
      twiml.message('Please enter your Aadhaar number or type "Skip"');
      return twiml.toString();

    // Handle Aadhaar and Seasonal Top-Up
    case 'WAITING_FOR_AADHAAR':
      data.user_aadhaar = message === 'skip' ? 'Not Provided' : body;
      const currentMonth = new Date().getMonth();
      const season = getSeasonalMessage(currentMonth);

      if (season) {
        data.season = season;
        session.step = 'WAITING_FOR_TOPUP_CONSENT';
        twiml.message(`${season.message}\nWould you like to add a seasonal top-up for ${season.topup_price}?\nReply with "Yes top-up" or "No"`);
        return twiml.toString();
      }

      session.step = 'CONFIRMED';
      saveSubscription({ phone: from, ...data });
      twiml.message(`✅ You're now subscribed to KAVACH ${data.selected_plan}!`);
      return twiml.toString();

    case 'WAITING_FOR_TOPUP_CONSENT':
      if (message.includes('yes') && data.season) {
        data.plan_price += ` + ${data.season.topup_price} (seasonal)`;
        twiml.message(`✅ Got it. Seasonal top-up added for ${data.season.season}.\n`);
      } else {
        twiml.message(`👍 No worries. Proceeding without seasonal top-up.`);
      }

      session.step = 'CONFIRMED';
      saveSubscription({
        phone: from,
        name: data.user_name,
        age: data.user_age,
        city: data.user_city,
        aadhaar: data.user_aadhaar,
        plan: data.selected_plan,
        premium: data.plan_price,
        coverage: data.plan_coverage,
      });

      // ✅ Display full subscription details after confirmation
      twiml.message(
        `✅ You're now subscribed to *KAVACH ${data.selected_plan}*!\n\n` +
        `👤 *Name:* ${data.user_name}\n` +
        `🎂 *Age:* ${data.user_age}\n` +
        `🏙️ *City:* ${data.user_city}\n` +
        `🆔 *Aadhaar:* ${data.user_aadhaar}\n` +
        `💰 *Premium:* ${data.plan_price}\n` +
        `📋 *Coverage:* ${data.plan_coverage}\n` +
        `${data.season ? `🌟 *Seasonal Top-Up:* ${data.season.season} - ${data.season.topup_price}` : ''}\n` +
        `\nThank you for choosing KAVACH! Stay protected.`
      );
      return twiml.toString();


    // ✅ Claim Handling
    case 'CLAIM_REASON':
      data.claim_reason = body;
      session.step = 'CLAIM_DATE';
      twiml.message('📅 When did the incident occur? (e.g.,YYYY-MM-DD)');
      return twiml.toString();

    case 'CLAIM_DATE':
      const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(body);
      if (!isValidDate) {
        twiml.message('⚠️ Please enter the date in<\ctrl3348>-MM-DD format.');
        return twiml.toString();
      }
      data.claim_date = body;
      session.step = 'CLAIM_AMOUNT';
      twiml.message('💰 How much are you claiming? (Enter just the amount in ₹)');
      return twiml.toString();

    case 'CLAIM_AMOUNT':
      const amount = parseFloat(body.replace(/[^\d.]/g, ''));
      if (isNaN(amount) || amount <= 0) {
        twiml.message('⚠️ Please enter a valid numeric claim amount.');
        return twiml.toString();
      }
      data.claim_amount = amount;

      try {
        //  CRUCIAL CHANGE:  Only pass the essential claim data.
        const claimId = await saveClaim({
          phone: from,
          reason: data.claim_reason,
          date: data.claim_date,
          amount: data.claim_amount,
          status: 'Pending', //  You'll likely have a default status
        });

        if (claimId) {
          twiml.message(
            `✅ Claim submitted successfully!\n` +
            `📂 *Claim ID:* ${claimId}\n` +
            `📝 *Reason:* ${data.claim_reason}\n` +
            `📅 *Date:* ${data.claim_date}\n` +
            `💰 *Amount:* ₹${data.claim_amount}\n` +
            `📊 *Status:* Pending\n` +
            `\nYour claim is under review. We'll update you soon!`
          );
          sessions.delete(from); // End the claim session
        } else {
          twiml.message('❌ Error saving your claim. Please try again later.');
        }
      } catch (error) {
        console.error('❌ Error processing claim:', error); // Log the full error
        twiml.message('❌ Something went wrong while processing your claim. Please try again.');
      }
      return twiml.toString();


    default:
      twiml.message('⚠️ Something went wrong. Please type "Hi" to restart.');
      return twiml.toString();
  }

  return twiml.toString();
}

module.exports = handleIncomingMessage;