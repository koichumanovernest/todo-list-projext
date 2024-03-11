import { useState } from "react";
import {
	useCreateDeleteTodoMutation,
	useCreateTodoMutation,
	useGetTodosQuery,
	useEditTodoMutation,
} from "../redux/api/crud";
import scss from "./TodoList.module.scss";

const TodoList = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [firstName1, setFirstName1] = useState("");
	const [lastName1, setLastName1] = useState("");
	const [editingId, setEditingId] = useState<number | null>(null);
	const { data, isLoading } = useGetTodosQuery();
	const [createTodo] = useCreateTodoMutation();
	const [createDeleteTodo] = useCreateDeleteTodoMutation();
	const [editTodo] = useEditTodoMutation();

	const addTodo = async () => {
		await createTodo({ firstName, lastName });
		setFirstName("");
		setLastName("");
	};

	const handleEditTodo = (item: any) => {
		setFirstName(item.firstName1);
		setLastName(item.lastName1);
		setEditingId(item._id);
	};

	const handleUpdateTodo = async (_id: number) => {
		const newData = {
			firstName: firstName1,
			lastName: lastName1,
		};
		await editTodo({ _id, newData });
		setFirstName1("");
		setLastName1("");
		setEditingId(null);
	};

	const handleDeleteTodo = async (_id: number) => {
		await createDeleteTodo({ _id });
	};

	return (
		<div className={scss.container}>
			<input
				type="text"
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
			/>
			<input
				type="text"
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
			/>
			<button onClick={addTodo}>Add</button>

			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				<>
					{data?.map((item) => (
						<div key={item._id} className={scss.content}>
							{editingId === item._id ? (
								<>
									<input
										placeholder="rext"
										type="text"
										value={firstName1}
										onChange={(e) => setFirstName1(e.target.value)}
									/>
									<input
										placeholder="text"
										type="text"
										value={lastName1}
										onChange={(e) => setLastName1(e.target.value)}
									/>
									<button onClick={() => handleUpdateTodo(item._id!)}>
										Update
									</button>
									<button onClick={() => handleEditTodo(0)}>cancell</button>
								</>
							) : (
								<>
									<h1>{item.firstName}</h1>
									<h1>{item.lastName}</h1>
									<button
										onClick={() => {
											handleEditTodo(item);
											setEditingId(item._id!);
											setFirstName1(item.firstName)
											setLastName1(item.lastName)
										}}>
										Edit
									</button>
									<button onClick={() => handleDeleteTodo(item._id!)}>
										Delete
									</button>
								</>
							)}
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default TodoList;
