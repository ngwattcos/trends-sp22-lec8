export type Task = {
  text: string
  checked: boolean
}

export type TaskWithId = Task & {
  id: string
}

export type FireBook = {
  title: string,
  author: string
}

export type FireReview = {
  rating: number,
  title: string,
  author: string,
  reviewer: string
}

export type FireReviewer = {
  email: string
}

