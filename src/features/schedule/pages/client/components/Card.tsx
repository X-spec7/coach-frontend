import { FC } from "react";
import DropdownMenuButton from "./DropdownMenuButton";

interface CardProps {
    icon: FC<{ width: string; height: string; color: string }>;
    bgColor: string;
    title: string;
    value: string;
    unit?: string;
    options?: { label: string; action: () => void }[];
}

const Card: FC<CardProps> = ({ icon: Icon, bgColor, title, value, unit, options = [] }) => {

    return (
        <div className="relative flex justify-between items-center gap-4 bg-white rounded-4xl p-4 w-full">
            <div className="flex justify-start items-center gap-4">
                <div className={`p-2.5 ${bgColor} rounded-xl flex justify-center items-center`}>
                    <Icon width="24" height="24" color="#000" />
                </div>
                <div className="flex flex-col items-start justify-center">
                    <p className="text-gray-20 text-xs">{title}</p>
                    <div className="flex gap-0.5 items-center">
                        <p className="text-black text-title-sm2 font-bold leading-normal">{value}</p>
                        {unit && <span className="text-gray-30 text-base font-medium">{unit}</span>}
                    </div>
                </div>
            </div>
            <DropdownMenuButton options={options} />
        </div>
    );
};

export default Card;
