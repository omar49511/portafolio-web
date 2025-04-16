// components/MainContent.jsx
import Hero from "@/components/hero";
import About from "@/components/about";
import Experience from "@/components/experience";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import ProfileWithImage from "@/components/ProfileWithImage";
import CardRedes from "@/components/cardredes";

export default function MainContent() {
    return (
        <main>
            <Hero />
            <div className="my-0 mx-auto md:max-w-[80%] lg:max-w-[70%] max-w-[90%] p-5">
                <ProfileWithImage />
                <About />
                <Experience />
                <Skills />
                <Projects />
                <CardRedes />
            </div>
        </main>
    );
}
