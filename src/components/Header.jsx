import Logo from "./Logo";
import SearchInput from "./SearchInput";
import RecipeActions from "./RecipeActions";

function Header() {
  return (
    <header
      className="flex flex-wrap items-center justify-between gap-6 bg-[#f9f5f3] px-6 py-4"
      role="banner"
    >
      <Logo />
      <SearchInput />
      <RecipeActions />
    </header>
  );
}

export default Header;
