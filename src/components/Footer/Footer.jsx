import React, { Component } from 'react'
import './Footer.scss';

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="copyright">created by: <a href="mailto:z.conevski@yahoo.com"><strong>Zoran Conevski</strong></a></span>
            </footer>
        )
    }
}

export default Footer;
