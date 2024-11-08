import { app } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

class FirebaseDB {
  async save(responses: Map<number,string>): Promise<void> {
    await setDoc(this.getResponsesRef(), {
      responses: Object.fromEntries(responses),
    });
  }

  private getResponsesRef() {
    const responsesCollection = collection(getFirestore(app), "responses");
    
    const auth = getAuth(app);
    if (!auth.currentUser) {
      throw new Error("User not logged in");
    }

    const userId = auth.currentUser.uid;
    return doc(responsesCollection, userId);
  }

  async load(): Promise<Map<number,string>> {
    const docSnapshot = await getDoc(this.getResponsesRef());

    if (!docSnapshot.exists()) {
      throw new Error("Responses not found");
    }

    const map = new Map(docSnapshot.data()?.responses);

    // Run through all entries in the map. In case the key is not a number, delete it.
    for (const [key, value] of map.entries()) {
      console.log(key, value);
      if (typeof key !== "number" || typeof value !== "string") {
        map.delete(key);
      }
    }

    return map as Map<number,string>;
  }

  async delete(): Promise<void> {
    return deleteDoc(this.getResponsesRef());
  }
}

const db = new FirebaseDB();
export { db };