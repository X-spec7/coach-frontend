import { FC, useState } from "react";
import { ClickOutside } from "@/shared/components";
import { ThreeDotsVerticalSvg } from "@/shared/components/Svg";
import Menu from "./Menu";

interface MenuOption {
    label: string;
    action: () => void;
}

interface DropdownMenuProps {
    options: MenuOption[];
}

const DropdownMenuButton: FC<DropdownMenuProps> = ({ options }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <ClickOutside onClick={() => setIsOpen(false)}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="focus:outline-none relative"
                aria-label="menu"
            >
                <ThreeDotsVerticalSvg width="24" height="24" color="#000" />
            </button>
            {isOpen && options.length > 0 && (
                <Menu options={options} closeMenu={() => setIsOpen(false)} />
            )}
        </ClickOutside>
    );
};

export default DropdownMenuButton;
