
import { Home, Search, Code, Users, Layout } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

const navigationItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Explore", path: "/explore", icon: Search },
  { name: "Code", path: "/code/1", icon: Code },
  { name: "Community", path: "/community", icon: Users },
  { name: "Dashboard", path: "/dashboard", icon: Layout },
];

export const Navigation = () => {
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t md:top-0 md:bottom-auto">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center space-x-8">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = 
              router.pathname === item.path || 
              (item.path !== "/" && router.pathname.startsWith(item.path));
            
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
