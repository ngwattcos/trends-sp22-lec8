import { Heading, Spinner, VStack } from "@chakra-ui/react"
import { useBooks, useReviews } from "../../util/firehooks"
import { SearchReviewBar } from "./SearchReviewBar"

const ReviewHeading = () => (
  <Heading
    as="h2"
    w="fit-content"
    bgGradient="linear(to-r, cyan.300, purple.400)"
    bgClip="text"
    lineHeight={1.15}
  >
    Reviews
  </Heading>
)

const ReviewsComponent = () => {
  
  const books = useBooks;
  const reviews = useReviews;

  return <>
    <SearchReviewBar></SearchReviewBar>
    </>;
}

export default ReviewsComponent
