import { useState } from "react";
import { FireReview } from "../../types";

type Props =  {

}
export const SearchReviewBar = () => {
  const [title, setTitle] = useState<string>();
  const [author, setAuthor] = useState<string>();
  const [review, setReview] = useState<string>();

  const [reviews, setReviews] = useState<FireReview[]>([]);

  const searchByTitle = () => {};
  const searchByAuthor = () => {};
  const getRatingForBook = () => {};
  return <></>
}