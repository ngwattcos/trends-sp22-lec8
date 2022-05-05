import { User, UserCredential } from "firebase/auth";
import { collection, deleteDoc, doc, Firestore, runTransaction, setDoc } from "firebase/firestore";
import { FireBook, FireReview, FireReviewer } from "../types";
import { db } from "./firebase";
import { REVIEWS_PATH, BOOKS_PATH, REVIEWERS_PATH } from "./fireRoutes";

export const addReview = async (id: string, book: FireReview) => {
  // shh
  editReview(id, book);
};

export const editReview = async (id: string, update: Partial<FireReview>) => {
  await setDoc(doc(db, REVIEWS_PATH, id), update, { merge: true });
};

export const deleteReview = async (id: string) => {
  await deleteDoc(doc(db, REVIEWS_PATH, id));
};

export const addBook = async (id: string, book: FireBook) => {
  try {
    await runTransaction(db, async (transaction) => {
      const bookDocRef = doc(db, BOOKS_PATH, id);
      const bookDoc = await transaction.get(bookDocRef);

      if (bookDoc.exists()) {
        throw `Book ${book.title} by ${book.author} already exists!`;
      }

      transaction.update(bookDocRef, book);
    });
  } catch (e) {
    console.log("Transaction failed: ", e);
  }
};

export const getBookId = (book: FireBook) => {
  return `${book.title}::${book.author}`;
}
export const getReviewId = (review: FireReview) => {
  return `${review.title}::${review.author}::${review.reviewer}`;
}


export const userUpload = (user: User | null, db: Firestore) => {
  if (user != null) {
      const uid = user.uid;
      const email = user.email || 'Dummy Email';
      
      runTransaction(db, async (transaction) => {
          const userDocumentReference = doc(collection(db, REVIEWERS_PATH), uid);

          const userDocument = await transaction.get(userDocumentReference);
          if (!userDocument.exists()) {
              const fullUserDocument: FireReviewer = {
                email
              };
              transaction.set(userDocumentReference, fullUserDocument);
          }
          // eslint-disable-next-line no-console
      }).catch(() => console.error('Unable to upload user.'));
  }
};


