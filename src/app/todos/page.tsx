import TodoList from "./components/TodoList";
import { Todo } from "../types/Todo";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const todos: Todo[] = [
  {
    _id: "1",
    txt: "Buy groceries",
    isDone: false,
    description: "Milk, Bread, Eggs, Butter",
  },
  {
    _id: "2",
    txt: "Read a book",
    isDone: false,
    description: 'Finish reading "The Great Gatsby"',
  },
  {
    _id: "3",
    txt: "Write blog post",
    isDone: false,
    description: "Write about React hooks",
  },
  {
    _id: "4",
    txt: "Workout",
    isDone: false,
    description: "30 minutes of cardio",
  },
  {
    _id: "5",
    txt: "Call mom",
    isDone: false,
    description: "",
  },
  {
    _id: "6",
    txt: "Clean the house",
    isDone: false,
    description: "Vacuum and dust all rooms",
  },
  {
    _id: "7",
    txt: "Prepare presentation",
    isDone: false,
    description: "Create slides for Monday meeting",
  },
  {
    _id: "8",
    txt: "Fix the leaky faucet",
    isDone: false,
    description: "",
  },
  {
    _id: "9",
    txt: "Plan weekend trip",
    isDone: false,
    description: "Decide on destination and book hotel",
  },
  {
    _id: "10",
    txt: "Study TypeScript",
    isDone: false,
    description: "Complete the TypeScript tutorial on official website",
  },
];

export default function Home() {
  const { data, error, isLoading } = useSWR("/api/data", fetcher);
  const syncData: Todo[] = todos;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Todos</h1>
      <TodoList data={syncData} />
    </main>
  );
}
