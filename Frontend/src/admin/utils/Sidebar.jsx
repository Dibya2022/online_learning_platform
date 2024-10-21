import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, BookOpen, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  { name: "Home", href: "/admin/dashboard", icon: Home },
  { name: "Course", href: "/admin/course", icon: BookOpen },
  { name: "Add Course", href: "/admin/add-course", icon: BookOpen },
  { name: "User", href: "/admin/users", icon: User },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={cn(
          "absolute md:relative inset-y-0 left-0 z-40 flex w-64 flex-col bg-background transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
              <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
              <path d="M12 3v6" />
            </svg>
            <span className="sr-only md:not-sr-only">Dashboard</span>
          </Link>
        </div>

        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </ScrollArea>

        <div className="mt-auto border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={() => navigate(`/account`)}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      {/* <div className="flex-1 ml-64"> */}
      <Button
        className="absolute top-4 left-4 md:hidden h-6 w-6 rounded-full bg-primary text-primary-foreground"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "×" : "☰"}
      </Button>
      {/* Rest of the main content goes here */}
      {/* </div> */}
    </div>
  );
};

export default Sidebar;
