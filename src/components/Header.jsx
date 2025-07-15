import Logo from "./Logo";
import SearchInput from "./SearchInput";
import RecipeActions from "./RecipeActions";

function Header() {
  return (
    <header className="flex items-center justify-between gap-6 bg-[#f9f5f3] px-8">
      <Logo />
      <SearchInput />
      <RecipeActions />
    </header>
  );
}

export default Header;
