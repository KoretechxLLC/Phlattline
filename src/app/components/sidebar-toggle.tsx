"use client";
import { Button } from "@/app/components/button-sidebar";
import { useConfig } from "@/app/hooks/use-config";
import { useMediaQuery } from "@/app/hooks/use-media-query";
import { Icon } from "@/app/components/icon";
import { motion } from "framer-motion";

export function SidebarToggle() {
  const [config, setConfig] = useConfig();
  const collapsed = config.collapsed;
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  if (!isDesktop) return null;
  return (
    <Button
      onClick={() => setConfig({ ...config, collapsed: !collapsed })}
      className="rounded-md h-auto p-0 hover:bg-transparent hover:text-default-800 text-default-500 "
      variant="ghost"
      size="icon"
    >
      {collapsed ? (
        <motion.div
          key={collapsed ? "collapsed" : "expanded"}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Icon icon="heroicons:arrow-small-right-solid" className="h-6 w-6" />
        </motion.div>
      ) : (
        <motion.div
          key={collapsed ? "collapsed" : "expanded"}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Icon icon="heroicons:bars-3-bottom-left-solid" className="h-6 w-6" />
        </motion.div>
      )}
    </Button>
  );
}
