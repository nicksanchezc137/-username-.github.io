import React from "react";

import codepen from "../img/codepen.png";
import github from "../img/github.png";
import linkedin from "../img/linkedin.png";
import stackoverflow from  "../img/stack-overflow.png";

class Footer extends React.Component {
	render() {
		return (
			<div id="footer" className="container-fluid text-center py-5">
				<div className="container">
					<div className="row">
						<div className="col-12 col-sm-12 col-md-8 mx-auto">
							<a
								href="https://codepen.io/nderitu"
								target="_blank"
								rel="noopener noreferrer">
								<img className="img-fluid" src={codepen} alt=""/>
							</a>
							<a
								className="px-3"
								href="https://github.com/nicksanchezc137"
								target="_blank"
								rel="noopener noreferrer">
								<img src={github} alt=""/>
							</a>
							<a
								className="px-3"
								href="https://stackoverflow.com/users/5835343/nick-k"
								target="_blank"
								rel="noopener noreferrer">
								<img src={stackoverflow} alt=""/>
							</a>
							<a
								href="https://www.linkedin.com/in/nick-korage-a49855119/"
								target="_blank"
								rel="noopener noreferrer">
								<img src={linkedin} alt=""/>
							</a>
						</div>
					</div>
					<h5 className="pt-4">Nick Nderitu &copy; 2019</h5>
				</div>
			</div>
		);
	}
}

export default Footer;
