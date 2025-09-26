import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
	const { setTheme, theme } = useTheme();

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setTheme(theme === "light" ? "dark" : "light")}
			className={
				"h-16 w-16 rounded-none border-0 hover:bg-transparent flex items-center place-content-center group"
			}
		>
			<div className="m-2 w-12 h-12 rounded-full border-2 border-card overflow-clip p-3 flex items-center place-content-center group-hover:ring-2 ring-foreground">
				<Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
				<Moon className="hidden h-5 w-5 dark:block" />
				<span className="sr-only">Toggle theme</span>
			</div>
		</Button>
	);
}
