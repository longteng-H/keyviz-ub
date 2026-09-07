import { useState } from "react";

import { AboutPage, AppearanceSettings, GeneralSettings, KeycapSettings, MouseSettings } from "@/components/settings";
import { VERSION } from "@/components/settings/about";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SidebarItem } from "@/components/ui/sidebar-item";
import { ComputerIcon, InformationSquareIcon, KeyboardIcon, Mouse09Icon, Settings03Icon } from "@hugeicons/core-free-icons";
import { useTranslation } from "react-i18next";

const Settings = () => {
    const { t } = useTranslation('common');
    const [activeTab, setActiveTab] = useState('general');

    const sideBar = [
        { key: "general", icon: Settings03Icon },
        { key: "appearance", icon: ComputerIcon },
        { key: "keycap", icon: KeyboardIcon },
        { key: "mouse", icon: Mouse09Icon },
    ];

    return (
        <div className="flex w-screen h-screen overflow-hidden border-t bg-background">
            <div className="w-44 p-2 flex flex-col gap-y-1 rounded-xl">
                <div className="flex items-center m-2 mb-2 gap-x-2">
                    <img src="./logo.svg" alt="logo" className="w-8 h-8" />
                    <div className="flex flex-col gap-y-0.5">
                        <h1 className="text-sm font-semibold">Keyviz-UB</h1>
                        <p className="text-xs text-gray-400">v{VERSION}</p>
                    </div>
                </div>
                {
                    sideBar.map((item) => (
                        <a key={item.key} onClick={() => setActiveTab(item.key)} className="cursor-pointer">
                            <SidebarItem item={{ title: t(`sidebar.${item.key}`), icon: item.icon }} isActive={activeTab === item.key} />
                        </a>
                    ))
                }
                <div className="mt-auto flex flex-col gap-2">
                    <a key="about" onClick={() => setActiveTab("about")} className="cursor-pointer">
                        <SidebarItem item={{ title: t('sidebar.about'), icon: InformationSquareIcon }} isActive={activeTab === "about"} />
                    </a>
                    <div className="flex gap-2 items-center justify-center">
                        <LanguageToggle />
                        <ThemeModeToggle />
                    </div>
                </div>
            </div>
            <Separator orientation="vertical" />
            <ScrollArea className="flex-1 relative">
                {activeTab === "general" && <GeneralSettings />}
                {activeTab === "appearance" && <AppearanceSettings />}
                {activeTab === "keycap" && <KeycapSettings />}
                {activeTab === "mouse" && <MouseSettings />}
                {activeTab === "about" && <AboutPage />}
            </ScrollArea>
        </div>
    );
}

export default Settings;
