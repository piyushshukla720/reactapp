import React,{ Component } from 'react';
class Header extends Component {
    render(){
        return (
            <header className="fixed-top">
<div className="navbar navbar-expand-sm navbar-dark bg-warning">
<div className="container"><span className="navbar-brand d-flex shadow">
N
</span>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mynav"><span className="navbar-toggler-icon" /></button>
<div className="collapse navbar-collapse" id="mynav">
<nav className="navbar-nav">
{!(this.props.isLoggedIn) && <a href="/" className="nav-item nav-link">Home</a>}
{!(this.props.isLoggedIn) && <a href="login" className="nav-item nav-link">Login</a>}
{(this.props.isLoggedIn) && <a href="/" className="nav-item nav-link">Logout</a> }
<a href="/register" className="nav-item nav-link">Sell</a>
</nav>
</div>
</div>
</div>
</header>
        );
    }
}
export default Header;
