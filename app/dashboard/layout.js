"use client"
import Link from "next/link";
import Image from "next/image";
import clsx from 'clsx'
import { useRouter, usePathname } from 'next/navigation';
import { useAuthContext } from '../context/AuthContext';
import React, { useEffect, useState } from 'react';
import '../styles/dashboard.css';

import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  GraduationCap,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

const navItems = {
  Attorney: [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/education", icon: GraduationCap, label: "Education" },
    { href: "/dashboard/crm", icon: Package, label: "CRM", badge: 6 },
    { href: "/dashboard/inbox", icon: Package, label: "Inbox" },
    { href: "/dashboard/clients", icon: Users, label: "Clients" },
    { href: "/dashboard/analytics", icon: LineChart, label: "Analytics" },
    { href: "/dashboard/filemanager", icon: Package, label: "File Manager" },
  ],
  Realtor: [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/crm", icon: Package, label: "CRM", badge: 6 },
    { href: "/dashboard/inbox", icon: Package, label: "Inbox" },
    { href: "/dashboard/clients", icon: Users, label: "Clients" },
    { href: "/dashboard/filemanager", icon: Package, label: "File Manager" },
  ],
  Homeowner: [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/education", icon: GraduationCap, label: "Education" },
    { href: "/dashboard/inbox", icon: Package, label: "Inbox" },
    { href: "/dashboard/filemanager", icon: Package, label: "File Manager" },
  ],
  Investor: [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/marketplace", icon: GraduationCap, label: "Marketplace" },
    { href: "/dashboard/crm", icon: Package, label: "CRM", badge: 6 },
    { href: "/dashboard/inbox", icon: Package, label: "Inbox" },
    { href: "/dashboard/propertylistings", icon: Package, label: "Property Listings" },
    { href: "/dashboard/filemanager", icon: Package, label: "File Manager" },
  ],
};

export default function DashNav({ children }) {


  const authContext = useAuthContext();
  console.log('Full AuthContext in Dashboard:', authContext);
  const { user, loading, logout } = authContext || {};
  console.log('user in Dashboard:', user);
  console.log('loading in Dashboard:', loading);


  const router = useRouter();
  //this will track the users url path
  const pathname = usePathname(); //get the current pathname
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (user) {
        setIsAuthorized(true);
      } else {
        router.push('/account/login');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="page-loading">Loading...</div>; // Or a more sophisticated loading component
  }

  if (!isAuthorized) {
    return null; // Or a more appropriate placeholder
  }
  
  const userType = user?.role; 
  // Get the appropriate navigation items based on user type
  const currentNavItems = navItems[userType] || [];

  // Function to render navigation links
  const renderNavLinks = (items) => {
    if (!items || items.length === 0) {
      return <div>No navigation items available</div>;
    }
    return items.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        className={clsx(
          'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground',
          {
            'text-primary bg-muted': pathname === item.href,
          },
        )}
      >
        <item.icon className="h-4 w-4" />
        {item.label}
        {item.badge && (
          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            {item.badge}
          </Badge>
        )}
      </Link>
    ));
  };

  return (
   
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
       {/*--------------Below is the default side navigation for the whole dashboard----------*/}

       {/*-----------This code inside this div below is the one displayed renderd on larger screens------*/}
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">

            {/*-----------logo link--------------*/}
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image
                src="/favicon.png" // Path to your logo image
                alt="Your Company Logo"
                width={50} // Set the width of the logo
                height={50} // Set the height of the logo
              />
              <span className="">MyForeclosure</span>
            </Link>


            {/*-----------Notifications bell Icon--------------*/}
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>

          {/*-----------links for the dashboard are renderd inside this div-------------*/}
          {/* Navigation links */}
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {renderNavLinks(currentNavItems)}
            </nav>
          </div>

          {/*below code can be utilized to prompt users to upgrade their membership if need be*/}
          {/* <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>


      {/*-----------The code below renders the exact navigation above but for smaller screens-------------------*/}
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Image
                    src="/favicon.png" // Path to your logo image
                    alt="Your Company Logo"
                    width={50} // Set the width of the logo
                    height={50} // Set the height of the logo
                  />
                  <span className="sr-only">MyForeclosure</span>
                </Link>
                 {renderNavLinks(currentNavItems)}
              </nav>
              {/* <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div> */}
            </SheetContent>
          </Sheet>


{/*--------------------Search Icon could be replaced to allow us to showcase any important messages that we would like our users to know ---------------------*/}
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>


          {/*--------------------profile image icon along with the drop down menu when clicked---------------------*/}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/*-------The below div is where the dahsboard content gets renderd---------*/}
        {children}
      </div>
    </div>
  );
}
