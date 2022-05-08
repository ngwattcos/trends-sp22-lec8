import { useEffect, useState } from "react"
import { collectionData, docData } from "rxfire/firestore"
import { collection, DocumentData, onSnapshot, query } from "firebase/firestore"
import { db } from "./firebase"
import { BOOKS_PATH, REVIEWS_PATH } from "./fireRoutes"

const useCollectionWithCallback2 = (
  collectionId: string,
  callback: () => void
) => {
  const [coll, setColl] = useState<DocumentData[] | undefined>()
  const collectionRef = collection(db, collectionId)
  // trigger an effect whenever the collectionData observable publishes a new version of the data
  useEffect(() => {
    const subscription = collectionData(collectionRef).subscribe(
      (c: DocumentData[]) => {
        // in the effect, set the collection data. This triggers an update in any component using 'coll' (using this collection hook).
        setColl(c)
        callback()
      }
    )
    return () => {
      // run any any cleanup code
      subscription.unsubscribe()
    }
  }, [collectionId])
  return coll
}

const useCollectionWithCallback = (
  collectionId: string,
  callback: () => void
) => {
  const [coll, setColl] = useState<DocumentData[] | undefined>()
  const collectionRef = collection(db, collectionId)
  // Trigger an effect whenever the query returns a new snapshot
  useEffect(() => {
    const unsubscribe = onSnapshot(query(collectionRef), (querySnapshot) => {
      const docsInCollection: DocumentData[] = []

      querySnapshot.forEach((doc) => docsInCollection.push(doc.data()))
      // in the effect, set the collection data. This triggers an update in any component using 'coll' (using this collection hook).
      setColl(docsInCollection)
      callback()
    })
    return () => {
      // run any any cleanup code
      unsubscribe()
    }
  }, [collectionId])
  return coll
}

const useCollection = (collectionId: string) =>
  useCollectionWithCallback(collectionId, () => {})

export const useBooks = useCollection(BOOKS_PATH)

export const useReviews = useCollection(REVIEWS_PATH)

export const useBooksWithCallback = (callback: () => void) =>
  useCollectionWithCallback(BOOKS_PATH, callback)

export const useReviewsWithCallback = (callback: () => void) =>
  useCollectionWithCallback(REVIEWS_PATH, callback)
