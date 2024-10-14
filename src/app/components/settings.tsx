import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/sheet";
import { ScrollArea } from "@/app/components/scroll-area";
import { Icon } from "@/app/components/icon";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/tabs";
import EditWidget from "@/app/components/EditWidget";
import ColorSchema from "./color-schema";
import SetSkin from "./set-skin";
import MenuHidden from "./menu-hidden";
import SearchBarToggle from "./search-bar-toggle";
import TeamSwitcherToggle from "./team-switcher-toggle";
import SetContentWidth from "./set-content-width";
import SetLayout from "./set-layout";
import SetSidebar from "./set-sidebar";
import SidebarColor from "./sidebar-color";
import HeaderColor from "./header-color";
import SidebarBg from "./sidebar-bg";
import HeaderStyle from "./header-style";
import FooterStyle from "./footer-style";
import ResetConfig from "./reset-config";
import FullScreenToggle from "./full-screen";
import CopyCustomizer from "./copy-cutomizer";
import BuyButton from "./buy-button";

const ThemeCustomize = ({}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="relative focus:ring-none focus:outline-none md:h-8 md:w-8 md:bg-secondary  text-secondary-foreground    rounded-full  md:flex hidden flex-col items-center justify-center"
        >
          <Image
            src={`/assets/EditWidget.svg`}
            alt="Edit Widget"
            width={80}
            height={80}
            className="h-14 w-14 mt-3"
          />
        </button>
      </SheetTrigger>
      <SheetContent
        overlayClass=" bg-transparent "
        className="lg:w-3/4 w-full max-w-full md:max-w-sm px-6 pt-0 pb-6 dark:border-r dark:border-default-300"
      >
        <SheetHeader className=" text-start -mx-6 px-6 py-4 shadow-sm md:shadow-none">
          <SheetTitle className="flex justify-between items-start">
            <div className=" flex-1">
              <p className="text-default-700 font-medium text-base">
                Template Customizer
              </p>
              <p className="text-default-500 dark:text-default-600 font-normal text-xs">
                Customize and preview in real time
              </p>
            </div>
            <div className="flex-none flex gap-3">
              <CopyCustomizer />
              <ResetConfig />
            </div>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100%-120px)] -mx-6">
          <div className=" space-y-8 mt-3">
            <Tabs defaultValue="style" className=" w-full">
              <TabsList className="w-full border border-solid border-default-200 dark:border-default-300 rounded-none p-0 divide-x gap-0 ">
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-default-200 dark:data-[state=active]:bg-secondary  data-[state=active]:text-default-900 shadow-none py-3  dark:text-secondary-foreground"
                  value="style"
                >
                  Theme Style
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-default-200 dark:data-[state=active]:bg-secondary data-[state=active]:text-default-900 shadow-none py-3 dark:text-secondary-foreground"
                  value="color"
                >
                  Theme Color
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="style"
                className="p-6 divide-y divide-default-300"
              >
                <div className="space-y-6 pb-6">
                  <ColorSchema />
                  <SetSkin />
                </div>
                <div className="space-y-6 -mx-6 p-6">
                  <SetLayout />
                  <SetSidebar />
                  <div className="space-y-3">
                    <MenuHidden />
                    <SearchBarToggle />
                    <TeamSwitcherToggle />
                  </div>
                  <SetContentWidth />
                </div>
                <HeaderStyle />
                <FooterStyle />
                <div className="!border-t-0 -mx-6 p-6 pb-0">
                  <FullScreenToggle />
                </div>
              </TabsContent>
              <TabsContent
                value="color"
                className="p-6  divide-y divide-default-300 "
              >
                <SidebarColor />
                <HeaderColor />
                <SidebarBg />
                <div className="!border-t-0 -mx-6 px-6">
                  <FullScreenToggle />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
        <SheetFooter className="lg:py-4 lg:gap-3 gap-2 flex justify-between    ">
          <BuyButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ThemeCustomize;
