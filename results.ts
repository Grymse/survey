import { questions } from './src/components/survey/surveySetup';

import admin from 'firebase-admin';
import serviceAccount from "./cert.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
// Get all documents from 'responses' collection

const requiredIDs = questions.filter(question => question.required).map(question => question.id);

async function getAll() {
    const docs = (await db.collection('responses').get()).docs.map(doc => doc.data());
    const responses = docs.map(doc => doc.responses).filter(responses => responses !== undefined && typeof responses === 'object');
    const validResponses = responses.filter(response => requiredIDs.every(id => response.hasOwnProperty(id)));
    const noMinors = validResponses.filter(r => r["1"] !== "Under 18");
    
    console.log("ALL:",responses.length, "FULL:", validResponses.length, "<=18:", noMinors.length);
} 



getAll();