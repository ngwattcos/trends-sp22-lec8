import { FireReview } from "../types";

export const sortByRating = (reviews: FireReview[]) => [...reviews].sort((reviewA, reviewB) => reviewA.rating - reviewB.rating)

export const filterByTitle = (reviews: FireReview[], title: string) => reviews.filter(review => review.title === title);

export const filterByAuthor = (reviews: FireReview[], author: string) => reviews.filter(review => review.author === author);

export const filterByReviewer = (reviews: FireReview[], reviewer: string) => reviews.filter(review => review.reviewer === reviewer);

export const filterByBook = (reviews: FireReview[], title: string, author: string) => reviews.filter(review => review.title === title && review.author === author);

export const getAvgRatingForBook = (reviews: FireReview[], title: string, author: string) => {
  const filteredList = filterByBook(reviews, title, author);
  return filteredList
    .reduce((prevSum, review) => prevSum + review.rating, 0) / filteredList.length;
}

export const paginateReviews = (reviews: FireReview[], resultsPerPage: number, page: number) => {
  const lastPage = Math.ceil((reviews.length + 1) / page);
  const pageSanitized = Math.min(Math.max(0, page), lastPage);

  return reviews.filter((value, i) => i > pageSanitized * resultsPerPage && i < Math.min(pageSanitized + 1, lastPage));

}