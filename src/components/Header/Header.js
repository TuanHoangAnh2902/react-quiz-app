import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';

import './Header.scss';

const Header = () => {
	const navigate = useNavigate();

	const handleLogin = () => {
		navigate('/login');
	};

	return (
		<Navbar
			expand='lg'
			className='bg-body-tertiary'>
			<Container>
				{/* <Navbar.Brand href='/'>Hoàng Ngọc Anh Tuấn</Navbar.Brand> */}
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
						<button
							className='btn-login'
							onClick={() => handleLogin()}>
							log in
						</button>
						<button className='btn-signup'>Sign up</button>
						{/* <NavDropdown
							title='Setting'
							id='basic-nav-dropdown'>
							<NavDropdown.Item>Log in</NavDropdown.Item>
							<NavDropdown.Item>Log out</NavDropdown.Item>
							<NavDropdown.Item>Profile</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item>Separated link</NavDropdown.Item>
						</NavDropdown> */}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
