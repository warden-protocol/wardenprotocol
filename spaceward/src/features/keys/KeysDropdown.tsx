import { Icons } from "@/components/ui/icons-assets";
import { useKeyData } from "./Keys";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { KeyModel } from "@/hooks/query/types";

export const KeysDropdownItem = ({
	onClick,
	keyResponse,
	isActive,
}: {
	onClick: () => void;
	keyResponse: KeyModel;
	isActive: boolean;
}) => {
	const { avatar, name } = useKeyData({ ...keyResponse });

	return (
		<div
			onClick={onClick}
			className="cursor-pointer h-10 px-4 flex items-center gap-3"
			key={keyResponse.key.id}
		>
			<Avatar className="w-6 h-6 object-contain cursor-pointer">
				<AvatarImage
					src={avatar}
					className="w-6 h-6 object-contain cursor-pointer"
				/>
			</Avatar>
			<div className="max-w-[140px] overflow-hidden text-ellipsis">
				{name}
			</div>
			{isActive && (
				<Icons.check className="ml-auto invert dark:invert-0" />
			)}
		</div>
	);
};
