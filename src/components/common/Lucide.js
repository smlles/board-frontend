import { createLucideIcon, icons } from 'lucide-react';

const Lucide = ({ name, color, size, ...props }) => {
  const Icon = icons[name];

  if (!Icon) {
    console.warn(`Icon with name "${name}" not found.`);
    return null;
  }

  return <Icon color={color} size={size} {...props} />;
};

export default Lucide;
