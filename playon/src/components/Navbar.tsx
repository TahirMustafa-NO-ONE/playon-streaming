// @ts-nocheck
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useContext, useState, useEffect } from "react";
import { Input } from "./ui/input";
import { SearchResultContext } from "@/contexts/searchResult.context";
import Genres from "./Genres/Genres";
import MobileNav from "./MobileNav";
import { Search } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { searchText, setSearchText } = useContext(SearchResultContext);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    navigate(`/search/${e.target.value}`);

    if (e.target.value.length === 0) {
      navigate("/movies");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search/${searchText}`);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-lg shadow-lg"
          : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-5 md:px-10 py-4">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="CineVerse"
            className="h-9 md:h-12 transition-transform group-hover:scale-105"
          />
        </div>

        {/* Center Links - Desktop */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          <Link
            to="/"
            className="nav-link text-white hover:text-pink-500 transition-all relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/movies"
            className="nav-link text-white hover:text-pink-500 transition-all relative group"
          >
            Movies
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/tvshows"
            className="nav-link text-white hover:text-pink-500 transition-all relative group"
          >
            TV Shows
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Genres />
        </div>

        {/* Right Side - Search and Mobile Menu */}
        <div className="flex gap-3 md:gap-4 items-center">
          <form onSubmit={handleSubmit} className="relative">
            <Input
              placeholder="Search movies..."
              className="border-gray-600 bg-white/10 backdrop-blur-md rounded-full pl-10 pr-4 py-2 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all md:w-64 w-40"
              value={searchText}
              onChange={handleChange}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </form>

          <div className="block md:hidden ml-1">
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
