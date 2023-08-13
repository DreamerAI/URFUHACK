import iconsConfig from "../../../assets/IconsConfig";

type IconProps = {
    iconName: string;
    width?: string;
    height?: string;
};

export const Icon = ({ iconName, width, height }: IconProps) => {
    const iconPath = iconsConfig[iconName];

    if (!iconPath) {
        console.log(`Иконки под именем ${iconName} не существует`);
        return null;
    }
    return <img src={iconPath} alt={iconName} width={width} height={height} />;
};
