import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export const NavMenu = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);   
    var auth = localStorage.getItem('authenticated');

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        if (auth !== null) {
            setAuthenticated(auth);
        }
    }, [localStorage.getItem('authenticated')]);

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 navbar-style" container light>
                <NavbarBrand className="text-white" tag={Link} to="/">Marca ai</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
                        {authenticated && (
                            <>
                            <NavItem>
                                <NavLink tag={Link} className="text-white" to="/home">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-white" to="/perfil">Perfil</NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink tag={Link} className="text-white" to="/logout">Logout</NavLink>
                                </NavItem>
                            </>
                        )}
                    </ul>
                </Collapse>
            </Navbar>
        </header>
    );
};
