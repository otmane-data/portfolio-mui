import React from "react";
import { Box, useTheme } from "@mui/material";
import { keyframes } from "@mui/system";

const twinkle = keyframes`
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 0.2; transform: scale(0.8); }
`;

const move = keyframes`
  0% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-5px) translateX(3px); }
  100% { transform: translateY(0) translateX(0); }
`;

const starCount = 30;

function randomPosition() {
  return {
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${3 + Math.random() * 3}s`,
    size: 1 + Math.random() * 2
  };
}

export default function StarAnimation() {
  const theme = useTheme();
  const stars = React.useMemo(() => {
    return Array.from({ length: starCount }).map(() => randomPosition());
  }, []);

  const starColor = theme.palette.mode === "dark" ? "#ffffff" : "#999999";

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden"
      }}
    >
      {stars.map((star, index) => (
        <Box
          key={index}
          component="span"
          sx={{
            position: "absolute",
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            backgroundColor: starColor,
            opacity: 0.8,
            animation: `${twinkle} ${star.animationDuration} ease-in-out infinite, ${move} 6s ease-in-out infinite`,
            animationDelay: star.animationDelay
          }}
        />
      ))}
    </Box>
  );
}