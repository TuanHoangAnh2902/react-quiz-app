import ReactPaginate from 'react-paginate';

function TableUserPaginate(props) {
	const {
		pageCount,
		listUsers,
		handleClickBtnUpdate,
		handleClickBtnView,
		handleCLickDeleteUser,
		fetchListUserWidthPaginate,
		currentPage,
		setCurrentPage,
	} = props;

	// Invoke when user click to request another page.
	const handlePageClick = (event) => {
		fetchListUserWidthPaginate(+event.selected + 1);
		setCurrentPage(+event.selected + 1);
	};

	return (
		<>
			<table className='table table-hover table-bordered'>
				<thead>
					<tr>
						<th scope='col'>ID</th>
						<th scope='col'>Username</th>
						<th scope='col'>Email</th>
						<th scope='col'>Role</th>
						<th>action</th>
					</tr>
				</thead>
				<tbody>
					{listUsers &&
						listUsers.length > 0 &&
						listUsers.map((item, index) => {
							return (
								<tr key={`table-user-${index}`}>
									<td>{item.id}</td>
									<td>{item.username}</td>
									<td>{item.email}</td>
									<td>{item.role}</td>
									<td>
										<button
											className='btn btn-secondary'
											onClick={() => handleClickBtnView(item)}>
											view
										</button>
										<button
											className='btn btn-warning mx-3'
											onClick={() => handleClickBtnUpdate(item)}>
											update
										</button>
										<button
											className='btn btn-danger'
											onClick={() => handleCLickDeleteUser(item)}>
											delete
										</button>
									</td>
								</tr>
							);
						})}
					{listUsers && listUsers.length === 0 && (
						<tr>
							<td colSpan={5}>Not found data</td>
						</tr>
					)}
				</tbody>
			</table>
			<div className='user-pagination'>
				<ReactPaginate
					nextLabel='Next >'
					onPageChange={handlePageClick}
					pageRangeDisplayed={3}
					marginPagesDisplayed={2}
					pageCount={pageCount}
					previousLabel='< Prev'
					pageClassName='page-item'
					pageLinkClassName='page-link'
					previousClassName='page-item'
					previousLinkClassName='page-link'
					nextClassName='page-item'
					nextLinkClassName='page-link'
					breakLabel='...'
					breakClassName='page-item'
					breakLinkClassName='page-link'
					containerClassName='pagination'
					activeClassName='active'
					renderOnZeroPageCount={null}
					forcePage={currentPage - 1}
				/>
			</div>
		</>
	);
}

export default TableUserPaginate;
