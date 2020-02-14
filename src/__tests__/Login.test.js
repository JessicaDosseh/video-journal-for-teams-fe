import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { render, fireEvent, wait } from '@testing-library/react';
import axios from 'axios';

// Redux
import { Provider } from "react-redux";
import { store } from "../redux/store";

// Components
import Login from "../pages/Login";

describe("Login form tests", () => {
	let mock;
	beforeEach(() => {
		mock = jest.spyOn(axios, 'post');
	});

	afterEach(() => {
		mock.mockRestore();
	});

	const { getByPlaceholderText, getByText, getByTestId } = render(
		<Provider store={store}>
			<Router>
				<Login />
			</Router>
		</Provider>
	);

	const fillForm = (username, password) => {

		fireEvent.change(getByPlaceholderText("username or email"), {
			target: {value: username},
		})
		fireEvent.change(getByPlaceholderText(/password/i), {
			target: {value: password},
		})
	}

	it("renders form correctly", () => {
	
		expect(getByPlaceholderText("username or email")).toBeInTheDocument();
		expect(getByPlaceholderText("password")).toBeInTheDocument();
		expect(getByText("Register an account instead")).toBeInTheDocument();
		expect(getByText("Log In").closest('button')).toBeInTheDocument();
	})

	it("will call login endpoint if username and password are filled", async () => {
		render(
			<Provider store={store}>
				<Router>
					<Login />
				</Router>
			</Provider>
		);

		fillForm("TestUser", "12345678")

		const user = {
			username: getByPlaceholderText("username or email").value,
			password: getByPlaceholderText("password").value,
		}

		const result = { data: { user: user, token: '12345' }}

		mock.mockResolvedValue(result);
		fireEvent.submit(getByTestId("login-form"))
		await wait(() => expect(mock).toHaveBeenCalledWith('/auth/login/username', user));
	});

	it("will call login endpoint if email and password are filled", async () => {
		render(
			<Provider store={store}>
				<Router>
					<Login />
				</Router>
			</Provider>
		);

		fillForm("test@user.com", "12345678")

		const user = {
			email: getByPlaceholderText("username or email").value,
			password: getByPlaceholderText("password").value,
		}

		const result = { data: { user: user, token: '12345' }}

		mock.mockResolvedValue(result);
		fireEvent.submit(getByTestId("login-form"))
		await wait(() => expect(mock).toHaveBeenCalledWith('/auth/login/email', user));

	});

	// it("won't register if passwords don't match", async () => {
	// 	const { getByTestId } = render(
	// 		<Provider store={store}>
	// 			<Router>
	// 				<Register />
	// 			</Router>
	// 		</Provider>
	// 	);
		
	// 	fillForm("Test", "User", "TestUser", "test@user.com", "12345678", "12345679")

	// 	fireEvent.submit(getByTestId("register-form"))
	// 	await wait(() => expect(mock).not.toHaveBeenCalled());

	// });
})