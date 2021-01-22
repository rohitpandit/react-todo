import React from 'react';
import { ListGroup, Col, Row } from 'react-bootstrap';

const TodoItem = ({ todo: { text, id, done }, deleteTodo, markDone }) => {
	const deleteHandler = () => {
		deleteTodo(id);
	};

	const markDoneHandler = () => {
		markDone(id);
	};
	return (
		<ListGroup.Item>
			<Row>
				<Col md={8}>{done ? <strike>{text}</strike> : text}</Col>{' '}
				<Col md={1}>
					{!done && (
						<i
							onClick={markDoneHandler}
							className='fas fa-check-circle'
							style={{ color: 'green' }}
						/>
					)}
				</Col>
				<Col md={1}>
					<i
						onClick={deleteHandler}
						className='fas fa-trash-alt float-right'
						style={{ color: 'red' }}
					/>
				</Col>
			</Row>
		</ListGroup.Item>
	);
};

export default TodoItem;
