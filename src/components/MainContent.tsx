import dynamic from 'next/dynamic';
import { memo } from 'react';

// Componentes estáticos (pequeños/frecuentemente usados)
import Hero from "@/components/hero";
import About from "@/components/about";

// Carga diferida de componentes más pesados
const Experience = dynamic(() => import('@/components/experience'), {
    loading: () => <div className="min-h-[300px] flex items-center justify-center">Cargando experiencia...</div>
});

const Skills = dynamic(() => import('@/components/skills'), {
    loading: () => <div className="min-h-[300px] flex items-center justify-center">Cargando habilidades...</div>
});

const Projects = dynamic(() => import('@/components/projects'), {
    loading: () => <div className="min-h-[400px] flex items-center justify-center">Cargando proyectos...</div>
});

const ProfileWithImage = dynamic(() => import('@/components/ProfileWithImage'), {
    loading: () => <div className="min-h-[200px] flex items-center justify-center">Cargando perfil...</div>
});

const CardRedes = dynamic(() => import('@/components/cardredes'), {
    loading: () => <div className="min-h-[150px] flex items-center justify-center">Cargando redes...</div>,
    ssr: false // No necesario para SSR si es interactivo
});

// Componente memoizado para evitar re-renders innecesarios
import { ReactNode } from 'react';

const MainContentContainer = memo(({ children }: { children: ReactNode }) => (
    <div className="my-0 mx-auto md:max-w-[80%] lg:max-w-[70%] max-w-[90%] p-5">
        {children}
    </div>
));
MainContentContainer.displayName = 'MainContentContainer';

export default function MainContent() {
    return (
        <main>
            <Hero />
            <MainContentContainer>
                <ProfileWithImage />
                <About />
                <Experience />
                <Skills />
                <Projects />
                <CardRedes />
            </MainContentContainer>
        </main>
    );
}