import Link from 'next/link';
import React from 'react';

const NavBar = () => {
	return (
		<div>
			<div className="navbar bg-primary text-base-300">
				<div className="flex-1">
					<Link href="/" className="btn btn-ghost text-xl">
						kittenz
					</Link>
				</div>
				<div className="flex-none">
					<input
						type="checkbox"
						value="cyberpunk"
						className="toggle theme-controller"
					/>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
