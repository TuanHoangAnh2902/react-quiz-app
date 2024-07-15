import { NavDropdown } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import { NavLink, useNavigate } from 'react-router-dom';

import './Header.scss';

const Header = () => {
	const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
	const account = useSelector((state) => state.user.account);

	const navigate = useNavigate();

	const handleLogin = () => {
		navigate('/login');
	};

	return (
		<Navbar
			expand='lg'
			className='bg-body-tertiary'>
			<Container>
				<NavLink
					className='navbar-brand'
					to='/'>
					Hoàng Ngọc Anh Tuấn
				</NavLink>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<NavLink
							className='nav-link'
							to='/'>
							Home
						</NavLink>
						<NavLink
							className='nav-link'
							to='/users'>
							Users
						</NavLink>
						<NavLink
							className='nav-link'
							to='/admins'>
							Admin
						</NavLink>
					</Nav>
					<Nav>
						{isAuthenticated === false ? (
							<>
								<button
									className='btn-login'
									onClick={() => handleLogin()}>
									log in
								</button>
								<button
									className='btn-signup'
									onClick={() => {
										navigate('/register');
									}}>
									Sign up
								</button>
							</>
						) : (
							<NavDropdown
								title='Setting'
								id='basic-nav-dropdown'>
								<NavDropdown.Item>Log out</NavDropdown.Item>
								<NavDropdown.Item>profile</NavDropdown.Item>
							</NavDropdown>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
