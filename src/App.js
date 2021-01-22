import React, { useState, Fragment } from 'react';
import TodoItem from './components/TodoItem';
import {
	Button,
	Container,
	Row,
	Col,
	Form,
	ListGroup,
	Alert,
} from 'react-bootstrap';

const App = () => {
	const [todoList, setTodoList] = useState([]);
	const [input, setInput] = useState('');
	const [errorMessage, setErrorMessage] = useState(''); //for showing error and success
	const [successMessage, setSuccessMessage] = useState('');
	const [filter, setFilter] = useState('all');

	const filterHandler = (e) => {
		setFilter(e.target.value);
	};

	//Mark as Done
	const markDone = (id) => {
		const newList = todoList.map((todo) => {
			if (todo.id === id) {
				todo.done = true;
			}
			return todo;
		});

		setTodoList(newList);
		setSuccessMessage('Marked as Done');
		setTimeout(() => setSuccessMessage(''), 3000);
		return;
	};

	//Delete todo handler
	const deleteTodo = (id) => {
		console.log('delete');
		const newList = todoList.filter((todo) => todo.id !== id);
		setTodoList(newList);
		setSuccessMessage('Deleted Successfully!');
		setTimeout(() => setSuccessMessage(''), 3000);
		return;
	};

	//Form submit handler
	const submitHandler = (e) => {
		e.preventDefault();

		//check if the input is empty
		if (input.trim() === '') {
			setErrorMessage('Task cannot be empty');
			setTimeout(() => setErrorMessage(''), 3000);
			return;
		}

		let newList = [];
		let newValue = {};
		newValue.text = input;
		newValue.done = false;
		newValue.id = Date.now();

		if (todoList.length === 0) {
			newList.push(newValue);
		} else {
			newList = [...todoList];
			newList.unshift(newValue);
		}
		setInput('');
		console.log(newList);
		setTodoList(newList);
	};

	return (
		<Container>
			<Row className='justify-content-md-center'>
				<h1>React ToDo app</h1>
			</Row>
			<hr />
			{errorMessage && (
				<Alert variant='danger'>
					<i className='fas fa-info-circle'></i> {errorMessage}
				</Alert>
			)}
			{successMessage && (
				<Alert variant='success'>
					<i className='fas fa-info-circle'></i> {successMessage}
				</Alert>
			)}
			<Row>
				<Col md={5}>
					<Form onSubmit={submitHandler}>
						<Form.Group>
							<Form.Control
								type='text'
								placeholder='Add tasks....'
								value={input}
								onChange={(e) => setInput(e.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Button type='submit' variant='primary' className='btn btn-block'>
								Add Task
							</Button>
						</Form.Group>
					</Form>
				</Col>
				<Col md={7}>
					<Row>
						<Form.Group>
							<Form.Control
								onChange={filterHandler}
								defaultValue='all'
								as='select'>
								<option value='all'>All Tasks</option>
								<option value='done'>Completed Tasks</option>
								<option value='not-done'>Uncomplete Tasks</option>
							</Form.Control>
						</Form.Group>
					</Row>
					{todoList.length === 0 ? (
						<p>No task added</p>
					) : (
						<ListGroup variant='flush'>
							{filter === 'all'
								? todoList.map((todo) => {
										return (
											<TodoItem
												todo={todo}
												key={todo.id}
												deleteTodo={deleteTodo}
												markDone={markDone}
											/>
										);
								  })
								: filter === 'done'
								? todoList.map((todo) => {
										if (todo.done === true) {
											return (
												<TodoItem
													todo={todo}
													key={todo.id}
													deleteTodo={deleteTodo}
													markDone={markDone}
												/>
											);
										}
										return <Fragment key={todo.id}></Fragment>;
								  })
								: todoList.map(function (todo) {
										if (todo.done === false) {
											return (
												<TodoItem
													todo={todo}
													key={todo.id}
													deleteTodo={deleteTodo}
													markDone={markDone}
												/>
											);
										}
										return <Fragment key={todo.id}></Fragment>;
								  })}
						</ListGroup>
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default App;
