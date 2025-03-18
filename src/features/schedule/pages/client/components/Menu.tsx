import { FC } from "react";

interface MenuProps {
    options: { label: string; action: () => void }[];
    closeMenu: () => void;
}

const Menu: FC<MenuProps> = ({ options, closeMenu }) => {
    return (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-9999">
            <ul className="p-3">
                {options.map((option, index) => (
                    <li
                        key={index}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                            option.action();
                            closeMenu();
                        }}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Menu;
