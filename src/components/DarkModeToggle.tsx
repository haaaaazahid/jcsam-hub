import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-muted transition-colors"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <FiSun className="w-5 h-5 text-orange" />
      ) : (
        <FiMoon className="w-5 h-5 text-foreground" />
      )}
    </motion.button>
  );
};

export default DarkModeToggle;
