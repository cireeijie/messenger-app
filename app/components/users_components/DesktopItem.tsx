'use client'

import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
    label: string;
    icon: any;
    href: string;
    onClick?: () => void;
    active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
    label,
    icon: Icon,
    href,
    onClick,
    active
}) => {
    const handleClick = () => {
        if(onClick) {
            return onClick();
        }
    }

    return (
        <li onClick={handleClick}>
            <Link 
                href={href}
                className={clsx(`
                    group
                    flex
                    items-center
                    gap-2
                    p-2
                    rounded-md
                    text-lg
                    hover:bg-white
                    hover:bg-opacity-90
                    hover:text-tufts-blue
                    ease-in-out
                    duration-300
                `,
                    active ? 'text-tufts-blue bg-white bg-opacity-90' : 'text-white'
                )}
            >
                <Icon />
                <span className="sr-only">{label}</span>
            </Link>
        </li>
    );
}
 
export default DesktopItem;