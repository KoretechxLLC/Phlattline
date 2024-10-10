import LayoutProvider from "@/app/providers/layout.provider";
import LayoutContentProvider from "@/app/providers/content.provider";
import Sidebar from "@/app/components/SideBar";
import Header from "@/app/components/Header";
const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <LayoutProvider>
      <Sidebar />
      <Header HeadingText="Hey Jack" HeadingDesc="What will you Learn today?" />
      <LayoutContentProvider>{children}</LayoutContentProvider>
    </LayoutProvider>
  );
};

export default layout;
