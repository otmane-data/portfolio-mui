import { Box } from "@mui/material";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Education from "./components/Education";
import Projects from "./components/projects";
import SkillsAndCerts from "./components/SkillsAndCerts";
import Footer from "./components/Footer";
import  {Contact}  from "./components/Contact";
import StarAnimation from "./components/StarAnimation";


export default function App() {
  return (
      <Box
        sx={{
          minHeight: "100vh",
          pt: { xs: 8, md: 10 },
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? "linear-gradient(180deg, rgba(2,6,23,1) 0%, rgba(3,7,18,1) 100%)"
              : "linear-gradient(180deg, #fafcff 0%, #ffffff 100%)"
        }}
      >
        <Header />
        <Hero />
        {/* 1) Education */}
        <Education />
        {/* 2) Featured Projects - Professional Experience */}
        <Projects />
        {/* 3) Certifications & Skills (including Languages) */}
        <SkillsAndCerts />
        <Contact />

        <Footer />

        {/* Floating chat */}
        <StarAnimation />
        
      </Box>
  );
}
