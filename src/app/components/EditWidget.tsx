import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/sheet";
import { ScrollArea } from "@/app/components/scroll-area";
import SetContentWidth from "./set-content-width";
import SetSidebar from "./set-sidebar";

interface EditWidgetProps {
  widgets: { id: string; name: string; isVisible: boolean }[]; // List of widgets
  onToggleWidget: (id: string) => void; // Handler for toggling visibility
}

const EditWidget = ({ widgets, onToggleWidget }: EditWidgetProps) => {
  return (
    <Sheet>
      {/* Trigger Button */}
      <SheetTrigger asChild>
        <button
          type="button"
          className="relative mx-1 focus:ring-none focus:outline-none h-10 w-10 md:h-10 md:w-10 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center"
        >
          <Image
            src={`/assets/EditWidget.svg`}
            alt="Edit Widget"
            width={100}
            height={100}
            className="h-10 w-10 mt-2"
          />
        </button>
      </SheetTrigger>

      {/* Sheet Content */}
      <SheetContent
        overlayClass="bg-transparent"
        className="lg:w-3/4 w-full bg-black max-w-full md:max-w-sm px-6 pt-0 pb-6 dark:border-r dark:border-default-300"
      >
        {/* Header */}
        <SheetHeader className="text-start -mx-6 px-6 py-4 shadow-sm">
          <SheetTitle className="flex justify-between items-start">
            <div className="flex-1">
              <p className="text-default-700 font-medium text-base">
                Widget Customizer
              </p>
              <p className="text-default-500 font-normal text-xs">
                Enable or disable widgets for this page.
              </p>
            </div>
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable Widget List */}
        <ScrollArea className="h-[calc(100%-120px)] -mx-6 px-6">
          <div>
            <SetSidebar />
          </div>
          <ul className="space-y-4">
            {widgets.map((widget) => (
              <li
                key={widget.id}
                className="flex justify-between items-center text-white"
              >
                {/* Widget Name */}
                <span className="font-medium">{widget.name}</span>

                {/* Checkbox */}
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={widget.isVisible}
                    onChange={() => onToggleWidget(widget.id)}
                    className="form-checkbox h-5 w-5 rounded text-blue-500 focus:ring-2 focus:ring-blue-400"
                  />
                </label>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default EditWidget;
