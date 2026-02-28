// @ts-nocheck
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { RxHamburgerMenu } from "react-icons/rx";
import Genres from "./Genres/Genres";
import { Link } from "react-router-dom";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
          <RxHamburgerMenu className="w-7 h-7 text-white" />
        </button>
      </SheetTrigger>
      <SheetContent className="w-fit">
        <div className="flex flex-col pr-10 py-8 gap-y-6">
          <Genres />
          <Link to={`/movies`} className="text-white hover:text-pink-500 transition-colors">
            <div className="text-base font-medium">Movies</div>
          </Link>
          <Link to={`/tvshows`} className="text-white hover:text-pink-500 transition-colors">
            <div className="text-base font-medium">TvShows</div>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
