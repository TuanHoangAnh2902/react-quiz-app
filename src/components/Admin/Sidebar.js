import 'react-pro-sidebar/dist/css/styles.css';
import {
	ProSidebar,
	Menu,
	MenuItem,
	SubMenu,
	SidebarHeader,
	SidebarFooter,
	SidebarContent,
} from 'react-pro-sidebar';
import { FaGem, FaGithub, FaReact } from 'react-icons/fa';
import { MdOutlineDashboardCustomize } from 'react-icons/md';

import sidebarBg from '~/assets/img/bg2.jpg';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar({ collapsed, toggled, handleToggleSidebar }) {
	const navigate = useNavigate();
	return (
		<>
			<ProSidebar
				image={sidebarBg}
				collapsed={collapsed}
				toggled={toggled}
				breakPoint='md'
				onToggle={handleToggleSidebar}>
				<SidebarHeader>
					<div
						style={{
							padding: '24px',
							textTransform: 'uppercase',
							fontWeight: 'bold',
							fontSize: 14,
							letterSpacing: '1px',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
						}}>
						<FaReact
							style={{ marginRight: 6 }}
							size={'2.5em'}
							color={'00bfff'}
						/>
						<span onClick={() => navigate('/')}>Mr.Tuan</span>
					</div>
				</SidebarHeader>

				<SidebarContent>
					<Menu iconShape='circle'>
						<MenuItem
							icon={<MdOutlineDashboardCustomize />}
							// suffix={<span className='badge red'>new</span>}
						>
							dashboard
							<Link to='/admins' />
						</MenuItem>
					</Menu>
					<Menu iconShape='circle'>
						<SubMenu
							icon={<FaGem />}
							title='Features'>
							<MenuItem>
								Quản lý Users
								<Link to='/admins/manage-user' />
							</MenuItem>
							<MenuItem>
								Quản lý bài Quiz
								<Link to='/admins/manage-quizzes' />
							</MenuItem>
							<MenuItem>
								Quản lý câu hỏi
								<Link to='/admins/manage-questions' />
							</MenuItem>
						</SubMenu>
					</Menu>
				</SidebarContent>

				<SidebarFooter style={{ textAlign: 'center' }}>
					<div
						className='sidebar-btn-wrapper'
						style={{
							padding: '20px 24px',
						}}>
						<a
							href='https://github.com/HoangAnhTuan2902'
							target='_blank'
							className='sidebar-btn'
							rel='noopener noreferrer'>
							<FaGithub />
							<span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
								viewSource
							</span>
						</a>
					</div>
				</SidebarFooter>
			</ProSidebar>
			;
		</>
	);
}

export default Sidebar;
