import { DeleteIcon } from "@chakra-ui/icons"
import {
  Button,
  Checkbox,
  Container,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react"
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore"
import { TaskWithId } from "../../types"
import { db } from "../../util/firebase"
import TaskItem from "./TaskItem"

type Props = {
  readonly tasks: TaskWithId[]
}

const TaskList = ({ tasks }: Props) => {
  return (
    <VStack>
      {tasks.length ? (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <Text>The list is looking kinda empty 👀</Text>
      )}
    </VStack>
  )
}

export default TaskList
