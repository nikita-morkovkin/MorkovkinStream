import HeaderMenu from './HeaderMenu';
import Logo from './Logo';
import SearchInput from './SearchInput';

const Header = () => {
  return (
    <header className='flex h-hull pb-2 pt-2 items-center gap-x-4 border-b border-border bg-card h-[65px]'>
      <Logo />
      <SearchInput />
      <HeaderMenu />
    </header>
  );
};

export default Header;
