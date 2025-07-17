import logo from "@/assets/logo.png";
import logoDark from "@/assets/logo_dark.png";
import DarkMode from "@/DarkMode";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Menu } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess]);

  const isActiveLink = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/courses", label: "Courses" },
    { path: "/services", label: "Services" },
    { path: "/about", label: "About Us" },
    { path: "/faq", label: "FAQ" },
  ];

  return (
    <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full px-4">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img src={logo} alt="logo" className="h-10 w-auto dark:hidden" />
            <img src={logoDark} alt="logo-dark" className="h-11 w-auto hidden dark:block" />
          </Link>
        </div>

        <div className="flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-semibold hover:text-primary transition-colors duration-300 relative pb-1 ${isActiveLink(item.path)
                ? "text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[#3869EB] after:rounded-full"
                : ""
                }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.photoUrl || "https://github.com/shadcn.png"}
                      alt="user"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="/my-learning">My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/profile">Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="cursor-pointer"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/login")}
                className="bg-[#3869EB] hover:bg-[#3869EB]/90 cursor-pointer"
              >
                Signup
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <Link to="/">
          <img src={logo} alt="logo" className="h-10 w-auto dark:hidden" />
          <img src={logoDark} alt="logo-dark" className="h-11 w-auto hidden dark:block" />
        </Link>
        <MobileNavbar user={user} navItems={navItems} />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({ user, navItems }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutUser] = useLogoutUserMutation();

  const logoutHandler = async () => {
    await logoutUser();
  };

  const isActiveLink = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>
            <Link to="/">
              <img src={logo} alt="logo" className="h-8 w-auto dark:hidden" />
              <img src={logoDark} alt="logo-dark" className="h-9 w-auto hidden dark:block" />
            </Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2 mt-2" />
        <nav className="flex flex-col space-y-4 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-semibold transition-colors duration-300 ${isActiveLink(item.path)
                ? "text-[#3869EB] border-l-2 border-[#3869EB] pl-2"
                : "hover:text-[#3869EB]"
                }`}
            >
              {item.label}
            </Link>
          ))}
          {user && (
            <>
              <Link
                to="/my-learning"
                className={`font-semibold transition-colors duration-300 ${isActiveLink("/my-learning")
                  ? "text-[#3869EB] border-l-2 border-[#3869EB] pl-2"
                  : "hover:text-[#3869EB]"
                  }`}
              >
                My Learning
              </Link>
              <Link
                to="/profile"
                className={`font-semibold transition-colors duration-300 ${isActiveLink("/profile")
                  ? "text-[#3869EB] border-l-2 border-[#3869EB] pl-2"
                  : "hover:text-[#3869EB]"
                  }`}
              >
                Edit Profile
              </Link>
              <p
                onClick={logoutHandler}
                className="font-semibold cursor-pointer hover:text-[#3869EB] transition-colors duration-300"
              >
                Log out
              </p>
            </>
          )}
        </nav>

        {user?.role === "instructor" && (
          <SheetFooter className="mt-auto">
            <SheetClose asChild>
              <Button type="submit" onClick={() => navigate("/admin/dashboard")}>
                Dashboard
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
