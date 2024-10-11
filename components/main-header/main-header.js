import Link from 'next/link';
import logoImg from '@/assets/logo.png';
import classes from './main-header.module.css';
import Image from 'next/image';
import MainHeaderBg from '@/components/main-header/main-header-bg';
import NavLink from './nav-link';

export default function MainHeader() {
  return (
    <>
      <MainHeaderBg />
      <header className={classes.header}>
        <Link
          className={classes.logo}
          href='/'
        >
          <Image
            src={logoImg}
            alt='a plate with food on it'
            priority
          />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <NavLink href='meals'>Browse Meals</NavLink>
          <NavLink href='/community'>Foodies Community</NavLink>
        </nav>
      </header>
    </>
  );
}
