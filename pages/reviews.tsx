import { Container } from "@chakra-ui/react"
import ReviewsComponent from "../components/review/ReviewsComponent"
import Layout from "../components/layout/Layout"

const ReviewsPage = () => {
  return (
    <Layout title="Reviews">
      <ReviewsComponent />
    </Layout>
  )
}

export default ReviewsPage
