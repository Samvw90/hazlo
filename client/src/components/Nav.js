import { NavWrapper, NavLinksList } from '../styles';

function Nav() {
    return (
        <NavWrapper>
            <h1>This is a Nav Bar</h1>
            <NavLinksList>
                <li>
                    <a href="#">Nav link</a>
                </li>
                <li>
                    <a href="#">Nav link 2</a>
                </li>
            </NavLinksList>
        </NavWrapper>
    );
}

export { Nav };
