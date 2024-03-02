import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineHome } from 'react-icons/hi2';
import { HiCalendarDays } from 'react-icons/hi2';
import { HiHomeModern } from 'react-icons/hi2';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { HiWrenchScrewdriver } from 'react-icons/hi2';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding-top: 2rem;
`;

const StyleNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <NavList>
      <ul>
        <StyleNavLink to='/dashboard'>
          <HiOutlineHome />
          <span>Home</span>
        </StyleNavLink>
      </ul>
      <ul>
        <StyleNavLink to='/bookings'>
          <HiCalendarDays />
          <span>Bookings</span>
        </StyleNavLink>
      </ul>
      <ul>
        <StyleNavLink to='/cabins'>
          <HiHomeModern />
          <span>Cabins</span>
        </StyleNavLink>
      </ul>
      <ul>
        <StyleNavLink to='/users'>
          <HiMiniUserGroup />
          <span>Users</span>
        </StyleNavLink>
      </ul>
      <ul>
        <StyleNavLink to='/settings'>
          <HiWrenchScrewdriver />
          <span>Settings</span>
        </StyleNavLink>
      </ul>
    </NavList>
  );
}

export default MainNav;
