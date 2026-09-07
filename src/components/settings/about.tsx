import { Button } from "@/components/ui/button"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { DiscordIcon, GithubIcon, LinkSquare02Icon, SparklesIcon, StarsIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { openUrl } from "@tauri-apps/plugin-opener"
import { motion } from "motion/react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

export const VERSION = "0.0.1"

export const AboutPage = () => {
    const { t } = useTranslation(['settings', 'common']);
    const [checking, setChecking] = useState(false);
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const [hovered, setHovered] = useState(false);

    const visitReleasePage = () => {
        openUrl('https://github.com/mulaRahul/keyviz/releases');
    }

    const checkForUpdates = async () => {
        setChecking(true);
        try {
            const response = await fetch('https://api.github.com/repos/mulaRahul/keyviz/releases/latest')
            const data = await response.json()
            const latestVersion = data.tag_name.substring(1, 6);
            if (latestVersion !== VERSION) {
                setUpdateAvailable(true);
                toast.success(
                    t('common:toast.updateAvailable', { version: latestVersion }),
                    {
                        action: { label: t('common:toast.updateView'), onClick: visitReleasePage }
                    }
                );
            } else {
                toast.info(t('common:toast.latestVersion'));
            }
        } catch (error) {
            toast.error(t('common:toast.checkUpdateFailed'));
        }
        setChecking(false);
    }

    return <div>
        <div className="py-6 flex flex-col items-center bg-linear-to-b from-secondary to-background">
            <div className="relative w-24 h-24">
                <motion.img
                    animate={{
                        scale: hovered ? 0.8 : 1,
                        opacity: hovered ? 0 : 1,
                    }}
                    className="absolute top-0 left-0 w-full h-full"
                    src="./logo.svg"
                    alt="logo"
                />
                <motion.img
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{
                        scale: hovered ? 1 : 1.2,
                        opacity: hovered ? 1 : 0,
                        filter: hovered ? "" : ["hue-rotate(0deg)", "hue-rotate(360deg)"],
                        transition: {
                            delay: 0.1,
                            filter: {
                                repeat: Infinity,
                                duration: 4,
                                ease: "linear",
                            }
                        }
                    }}
                    className="absolute top-0 left-0 w-full h-full"
                    src="./logo-pro.svg"
                    alt="logo-pro"
                />
            </div>
            <h1 className="mt-4 mb-2 text-xl font-semibold">{
                hovered ? "Keyviz-UB Pro" : "Keyviz-UB"
            }</h1>
            <p className="text-center text-sm text-muted-foreground">
                v{VERSION} <br />
                © 2026 Rahul Mula
            </p>
        </div>

        <div className="mt-6 px-6 flex flex-col gap-4">
            <motion.div
                animate={{
                    scale: hovered ? 1.02 : 1,
                    borderColor: hovered ? ["#FFCA94", "#B3FF88", "#00FFF5", "#B367FF", "#FFCA94"] : "transparent",
                }}
                transition={{
                    borderColor: {
                        repeat: Infinity,
                        duration: 4,
                        ease: "linear",
                    }
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="peer border rounded-lg"
            >
                <Item
                    variant="muted"
                    className="hover:bg-muted"
                >
                    <ItemContent>
                        <ItemTitle>
                            <HugeiconsIcon icon={SparklesIcon} size="1em" /> {t('about.upgrade.title')}
                        </ItemTitle>
                        <ItemDescription>
                            {t('about.upgrade.description')}
                        </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                        <Button
                            variant={hovered ? "default" : "outline"}
                            onClick={() => openUrl('https://keyviz.org/pro')}
                        >
                            {t('about.upgrade.button')}
                        </Button>
                    </ItemActions>
                </Item>
            </motion.div>

            <Item variant="muted" className="transition-all peer-hover:blur-xs">
                <ItemContent>
                    <ItemTitle>
                        <HugeiconsIcon icon={StarsIcon} size="1em" /> {t('about.updates.title')}
                    </ItemTitle>
                </ItemContent>
                <ItemActions>
                    {
                        updateAvailable
                            ? <Button className="cursor-pointer" onClick={visitReleasePage}>{t('about.updates.available')}</Button>
                            : <Button variant="outline" onClick={checkForUpdates} disabled={checking}>{t('about.updates.check')}</Button>
                    }
                </ItemActions>
            </Item>

            <Item variant="muted" className="transition-all peer-hover:blur-xs">
                <ItemContent>
                    <ItemTitle>
                        <HugeiconsIcon icon={GithubIcon} size="1em" /> {t('about.opensource.title')}
                    </ItemTitle>
                    <ItemDescription className="max-w-100">
                        {t('about.opensource.description')}
                    </ItemDescription>
                </ItemContent>
                <ItemActions>
                    <Button variant="outline" size="icon" onClick={() => openUrl('https://github.com/mulaRahul/keyviz')}>
                        <HugeiconsIcon icon={LinkSquare02Icon} />
                    </Button>
                </ItemActions>
            </Item>

            <Item variant="muted" className="transition-all peer-hover:blur-xs">
                <ItemContent>
                    <ItemTitle>
                        <HugeiconsIcon icon={DiscordIcon} size="1em" /> {t('about.discord.title')}
                    </ItemTitle>
                    <ItemDescription className="max-w-100">
                        {t('about.discord.description')}
                    </ItemDescription>
                </ItemContent>
                <ItemActions>
                    <Button variant="outline" size="icon" onClick={() => openUrl('https://discord.gg/er9pddccyS')}>
                        <HugeiconsIcon icon={LinkSquare02Icon} />
                    </Button>
                </ItemActions>
            </Item>
        </div>
    </div>
}
