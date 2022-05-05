import { useEffect, useState } from 'react';
import { collectionData, docData } from 'rxfire/firestore';
import { collection, DocumentData } from 'firebase/firestore';
import { db } from './firebase';
import { BOOKS_PATH, REVIEWS_PATH } from './fireRoutes';

const useCollectionWithCallback = (collectionId: string, callback: () => void) => {
  const [coll, setColl] = useState<DocumentData[] | undefined>();
  const collectionRef = collection(db, collectionId);
  useEffect(
    () => {

      const subscription = collectionData(collectionRef).subscribe((c: DocumentData[]) => {
        setColl(c);
        callback();
      });
      return () => { subscription.unsubscribe(); };
    },
    [collectionId]
  );
  return coll;
};

const useCollection = (collectionId: string) => useCollectionWithCallback(collectionId, () => {});

export const useBooks = useCollection(BOOKS_PATH);

export const useReviews = useCollection(REVIEWS_PATH);

export const useBooksWithCallback = (callback: () => void) => useCollectionWithCallback(BOOKS_PATH, callback);

export const useReviewsWithCallback = (callback: () => void) => useCollectionWithCallback(REVIEWS_PATH, callback);
