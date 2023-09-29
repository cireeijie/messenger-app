import clsx from "clsx";

interface DividerProps {
    width?: number;
    stroke: number;
    color?: string;
    fullWidth?: boolean;
}

const Divider: React.FC<DividerProps> = ({
    width,
    stroke,
    color,
    fullWidth
}) => {
    return (
        <div 
            className={clsx(`h-[${stroke}px] bg-pale`,
                fullWidth ? 'w-full' : `w-[${width}]px`,
                !color ? 'bg-pale' : `bg-[${color}]`
            )}
        >
        </div>
    )
}

export default Divider;