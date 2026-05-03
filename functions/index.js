/* global require, exports */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

/**
 * Cloud Function: Returns a random Indian election fact
 * GET https://us-central1-electiq-ffd78.cloudfunctions.net/getElectionFact
 */
exports.getElectionFact = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const facts = [
      "India has 96.8 crore registered voters — the largest electorate in the world.",
      "Lok Sabha has 543 directly elected seats under Article 81 of the Constitution.",
      "ECI (Election Commission of India) was established on January 25, 1950.",
      "India first used Electronic Voting Machines (EVMs) in the 1982 Kerala Assembly election.",
      "VVPAT (Voter Verifiable Paper Audit Trail) was introduced in the 2013 Nagaland by-elections.",
      "The Model Code of Conduct kicks in the moment the election schedule is announced.",
      "India's first General Election was held in 1951-52 with about 17.3 crore voters.",
      "Over 10.5 lakh polling stations are set up across India for General Elections.",
    ];
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    res.json({ fact: randomFact });
  });
});

/**
 * Cloud Function: Saves a quiz result to Firestore
 * POST https://us-central1-electiq-ffd78.cloudfunctions.net/saveQuizResult
 * Body: { score: number, total: number }
 */
exports.saveQuizResult = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const { score, total } = req.body;
      if (typeof score !== 'number' || typeof total !== 'number') {
        return res.status(400).json({ error: 'Invalid score or total' });
      }
      await admin.firestore().collection('results').add({
        score,
        total,
        percentage: Math.round((score / total) * 100),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
});
