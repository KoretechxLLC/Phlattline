"use client";
import { useConfig } from "@/app/hooks/use-config";
import { Label } from "@/app/components/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/radio-group";
import { navBarType } from "@/app/lib/type";
const HeaderStyle = () => {
  const [config, setConfig] = useConfig();

  const { navbar } = config;

  return (
    <div className="-mx-6 p-6">
      <div className="text-sm font-medium mb-3">Navbar Type</div>
      <RadioGroup
        defaultValue={navbar}
        className="flex flex-wrap items-center gap-3"
        onValueChange={(value) => {
          setConfig({ ...config, navbar: value as navBarType });
        }}
      >
        {["floating", "sticky", "hidden", "default"].map((value, index) => {
          return (
            <div className="flex items-center space-x-2" key={index}>
              <RadioGroupItem
                value={value}
                id={`header-style-${value}`}
                disabled={
                  config.layout === "horizontal" && value === "floating"
                }
              />
              <Label className="capitalize" htmlFor={`header-style-${value}`}>
                {value}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default HeaderStyle;
