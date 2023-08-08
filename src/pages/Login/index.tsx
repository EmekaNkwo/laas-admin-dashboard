/* eslint-disable react-hooks/exhaustive-deps */
import { FormEventHandler, ReactElement, useEffect, useState } from 'react';
import { useLoginMutation } from '../../services/Api/api';
import { useNavigate } from 'react-router-dom';
import { FilledButton } from '@/shared/UIs/CustomButton';
import { notification, Spin } from 'antd';
import { InputField, PassowrdField } from '@/shared/UIs/InputField';

const Login = (): ReactElement => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [login, { isLoading, isSuccess, error, data }] = useLoginMutation();
	const navigate = useNavigate();

	const submitForm: FormEventHandler = async (e) => {
		e.preventDefault();

		try {
			await login({ email, password }).unwrap();

		} catch (err) {
			console.error(err);
		}
	};
	useEffect(() => {
		if (isSuccess) {
			notification.success({
				message: "Login Successfully",
				duration: 3,
				placement: "topRight",
			});
			setEmail('');
			setPassword('');
			if (data?.data?.twoFactorEnabled) {
				sessionStorage.setItem('email', email);
				navigate('/2fa')
			} else {
				sessionStorage.setItem('authToken', data?.data?.token);
				navigate('/dashboard');
			}
		}
	}, [isSuccess, navigate]);

	useEffect(() => {
		if (error) {
			const errorMesg = (error as any)?.data?.error;
			notification.error({
				message: errorMesg,
				duration: 3,
				placement: "topRight",
			});
		}
	}, [error]);

	useEffect(() => {
		sessionStorage.clear()
	}, [])

	return (
		<>
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
				<form onSubmit={submitForm} className='flex flex-col w-full justify-center gap-3'>
					<InputField className='w-[350px]' name='email' type='email' title='Email' inputValue={email} onChange={(e) => setEmail(e.target.value)} />
					<PassowrdField className='w-[350px]' name='password' title='Password' inputValue={password} onChange={(e) => setPassword(e.target.value)} />
					{
						isLoading ? (
							<Spin />) : (
							<FilledButton className='w-full bg-mainColor  text-white' title={isLoading ? "Loading..." : "Login"} />

						)
					}
				</form>
			</div>
		</>
	);
};

export default Login;
