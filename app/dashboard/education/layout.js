"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";

export default function EducationNav({ children }) {

  //this will track the users url path
  const pathname = usePathname(); //get the current pathname

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">

                    <Link href="/dashboard/education">Education</Link>
                    </TabsTrigger>
                <TabsTrigger value="active">
                <Link href="/dashboard/education/flashcards">Flashcards</Link>
                </TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Archived
                </TabsTrigger>
              </TabsList>
            </div>

            {/*-------The below div is where the education content gets renderd---------*/}
            {children}
          </Tabs>
        </main>
      </div>
    </div>
  );
}
