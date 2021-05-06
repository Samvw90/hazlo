import styled from 'styled-components';

export const NavWrapper = styled.nav`
    display: flex;
    justify-content: space-around;
    width: 100%;
    background-color: blue;
    & > h1 {
        color: white;
    }
`;

export const NavLinksList = styled.ul`
    width: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > li {
        list-style: none;
        color: white;
        cursor: pointer;
        & > a {
            color: white;
            text-decoration: none;
        }
    }
    > li:hover {
        & > a {
            color: red;
            text-decoration: none;
        }
    }
`;
