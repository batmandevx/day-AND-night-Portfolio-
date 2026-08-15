import { type PortfolioProject } from './portfolioConstellation';
import { preloadImage } from '../../utils/assetLoaders';
import { portfolioSkills } from './portfolioSkills';
import {
    PROJECT_DETAILS_IMAGE_SIZES,
    PROJECT_PREVIEW_IMAGE_SIZES,
    projectImagesById,
} from './projectImageAssets';

const withProjectScreenshots = (projects: PortfolioProject[]): PortfolioProject[] =>
    projects.map((project) => ({
        ...project,
        screenshot: projectImagesById[project.id]?.preview,
        detailsScreenshot: projectImagesById[project.id]?.details,
        skills: project.skills.map(
            (skill) =>
                portfolioSkills[portfolioSkills.findIndex((s) => s.id === skill)]?.label ?? skill,
        ),
    }));

const getAdjacentProjects = (
    project: PortfolioProject,
    projects: PortfolioProject[],
): PortfolioProject[] => {
    const index = projects.findIndex((candidate) => candidate.id === project.id);
    if (index < 0 || projects.length < 2) {
        return [];
    }

    return [
        projects[(index - 1 + projects.length) % projects.length],
        projects[(index + 1) % projects.length],
    ];
};

export const preloadAdjacentProjectScreenshots = (project: PortfolioProject): void => {
    const constellationProjects = portfolioProjects.filter(
        (candidate) => candidate.constellation.id === project.constellation.id,
    );
    const adjacentProjects = new Set([
        ...getAdjacentProjects(project, portfolioProjects),
        ...getAdjacentProjects(project, constellationProjects),
    ]);

    adjacentProjects.forEach((candidate) => {
        if (candidate.screenshot) {
            preloadImage(candidate.screenshot, PROJECT_PREVIEW_IMAGE_SIZES);
        }
    });
};

export const preloadAdjacentProjectDetails = async (project: PortfolioProject): Promise<void> => {
    const adjacentScreenshots = getAdjacentProjects(project, portfolioProjects).flatMap(
        (candidate) => (candidate.detailsScreenshot ? [candidate.detailsScreenshot] : []),
    );

    await Promise.allSettled(
        adjacentScreenshots.map((source) => preloadImage(source, PROJECT_DETAILS_IMAGE_SIZES)),
    );
};

// Rendered as the "Web" constellation cluster.
const webProjects: PortfolioProject[] = [
    {
        id: 'adaptxfit',
        title: 'AdaptXFit',
        label: 'AdaptXFit',
        description:
            'An AI-powered adaptive fitness platform that personalizes workouts and nutrition guidance in real time. Live at https://adaptxfit.netlify.app',
        period: '2025',
        role: 'Lead Engineer',
        skills: ['react', 'nodejs', 'agentic-ai', 'mongodb', 'rest-api'],
        domain: 'AI Fitness / SaaS',
        owner: 'Live — https://adaptxfit.netlify.app',
        constellation: {
            id: 'front-end',
            position: [-1.02, 0.82, -0.18],
            links: ['sustainlabs'],
        },
    },
    {
        id: 'sustainlabs',
        title: 'SustainLabs',
        label: 'SustainLabs',
        description:
            'A sustainability intelligence platform for tracking and reducing environmental footprint through data-driven ESG insights. Live at https://sustainlabs.netlify.app',
        period: '2025',
        role: 'Product Developer',
        skills: ['react', 'typescript', 'nodejs', 'responsive-design'],
        domain: 'GreenTech / Sustainability Intelligence',
        owner: 'Live — https://sustainlabs.netlify.app',
        constellation: {
            id: 'front-end',
            position: [-0.42, -0.16, 0.02],
            links: ['gyangrow'],
        },
    },
    {
        id: 'gyangrow',
        title: 'GyanGrow',
        label: 'GyanGrow',
        description:
            'A gamified financial-literacy platform serving 50k+ users with 100+ AI-personalized quests and over ₹2Cr of virtual savings tracked. Live at https://gyan-grow.vercel.app/',
        period: '2025',
        role: 'Full Stack Developer',
        skills: ['react', 'nodejs', 'tensorflow', 'mongodb', 'machine-learning'],
        domain: 'FinTech / EdTech',
        owner: 'Live — https://gyan-grow.vercel.app/',
        constellation: {
            id: 'front-end',
            position: [0.52, 0.45, -0.1],
            links: ['vitgroww'],
        },
    },
    {
        id: 'vitgroww',
        title: 'VITGROWW',
        label: 'VITGROWW',
        description:
            'The ultimate campus operating system for VIT students — AI-powered academics, smart scheduling, and a career hub, built for students by students.',
        period: '2025',
        role: 'Full Stack Developer',
        skills: ['react', 'nextjs', 'nodejs', 'mongodb', 'responsive-design'],
        domain: 'EdTech / Campus OS',
        owner: 'https://github.com/batmandevx/VITGROWW',
        constellation: {
            id: 'front-end',
            position: [1.1, -0.25, 0.08],
            links: [],
        },
    },
];

// Rendered as the "AI / ML" constellation cluster.
const aiMlProjects: PortfolioProject[] = [
    {
        id: 'neurodrive',
        title: 'NeuroDrive',
        label: 'NeuroDrive',
        description:
            'An agentic self-healing EV ecosystem that cut simulated fleet downtime by 65%. Awarded 2nd place at Tata InnoVent 2026 among 2,822 teams and 10,247 innovators.',
        period: '2026',
        role: 'AI Engineer',
        skills: ['python', 'agentic-ai', 'aws', 'iot', 'llm'],
        domain: 'Automotive / Agentic AI',
        owner: 'Tata InnoVent 2026 — 2nd Place',
        constellation: {
            id: 'full-stack',
            position: [0.153, 0.3, 0.12],
            links: ['crisproots'],
        },
    },
    {
        id: 'crisproots',
        title: 'CrispRoots',
        label: 'CrispRoots',
        description:
            'An AI-powered digital twin for smart agriculture — crop disease detection, soil analysis, and yield prediction. Won ₹2L at the Annam AI hackathon at IIT Ropar plus ₹1L in seed funding.',
        period: '2025',
        role: 'ML Engineer',
        skills: ['machine-learning', 'computer-vision', 'iot', 'react', 'tensorflow'],
        domain: 'AgroTech / Computer Vision',
        owner: 'https://github.com/batmandevx/CrispRoots',
        constellation: {
            id: 'full-stack',
            position: [0.814, 1.292, -0.06],
            links: ['echomedai'],
            labelOffset: [0, -0.18],
        },
    },
    {
        id: 'echomedai',
        title: 'Echo-Med-AI',
        label: 'Echo-Med-AI',
        description:
            'A mobile medical-diagnostics CNN achieving 94% accuracy across 6 diseases, quantized with TensorFlow Lite for a 75% smaller on-device footprint.',
        period: '2025',
        role: 'ML Engineer',
        skills: ['tensorflow', 'opencv', 'tflite', 'deep-learning', 'python'],
        domain: 'HealthTech / On-Device ML',
        owner: 'https://github.com/batmandevx/EcoMedAi-',
        constellation: {
            id: 'full-stack',
            position: [0.383, -0.714, -0.08],
            links: ['auratwin'],
            labelOffset: [0, 0.12],
        },
    },
    {
        id: 'auratwin',
        title: 'AuraTwin',
        label: 'AuraTwin',
        description:
            'AI infrastructure-safety platform combining Gaussian Splatting 3D reconstruction with Amazon Bedrock risk analysis. Entry for the AWS 10K AIdeas competition.',
        period: '2026',
        role: 'AI Engineer',
        skills: ['aws-bedrock', '3d-reconstruction', 'gaussian-splatting', 'python', 'aws'],
        domain: 'Infrastructure Safety / 3D Vision',
        owner: 'https://github.com/batmandevx/AuraTwin',
        constellation: {
            id: 'full-stack',
            position: [-1.009, 0.088, 0.1],
            links: ['intellitrace'],
        },
    },
    {
        id: 'intellitrace',
        title: 'IntelliTrace',
        label: 'IntelliTrace',
        description:
            'AI-powered invoice fraud detection built for the IntelliTrace Hackathon (Indian Bank). Flags anomalous invoices with ML-driven risk scoring.',
        period: '2026',
        role: 'AI Engineer',
        skills: ['python', 'machine-learning', 'fastapi', 'rest-api', 'mongodb'],
        domain: 'FinTech / Fraud Detection',
        owner: 'Live — https://intellitrace-hackathon.vercel.app/',
        constellation: {
            id: 'full-stack',
            position: [-1.55, 0.62, 0.02],
            links: ['lola'],
        },
    },
    {
        id: 'lola',
        title: 'LOLA',
        label: 'LOLA',
        description:
            'A voice-to-voice AI agent with deep telecom knowledge — natural spoken conversations powered by speech recognition and LLMs.',
        period: '2025',
        role: 'AI Engineer',
        skills: ['python', 'llm', 'fastapi', 'rest-api', 'machine-learning'],
        domain: 'Voice AI / Telecom',
        owner: 'https://github.com/batmandevx/LOLA',
        constellation: {
            id: 'full-stack',
            position: [-0.25, 1.15, -0.12],
            links: [],
        },
    },
];

// Rendered as the "Systems" constellation cluster.
const systemsProjects: PortfolioProject[] = [
    {
        id: 'packet-analyzer',
        title: 'Packet Analyzer',
        label: 'Packet Analyzer',
        description:
            'A multithreaded deep packet inspection engine with SNI/TLS extraction, BPF capture, and per-flow state tracking.',
        period: '2025',
        role: 'Systems Developer',
        skills: ['cpp', 'python', 'multithreading', 'bpf'],
        domain: 'Systems / Network Security',
        owner: 'https://github.com/batmandevx/Packet_analyzer',
        constellation: {
            id: 'back-end',
            position: [0, 0.35, 0],
            links: ['treasure'],
        },
    },
    {
        id: 'treasure',
        title: 'Treasure',
        label: 'Treasure',
        description: 'A collaborative team hackathon project.',
        period: '2025',
        role: 'Contributor',
        skills: ['react', 'nodejs'],
        domain: 'Hackathon Project',
        owner: 'https://github.com/Shivam2005Goel/Treasure',
        constellation: {
            id: 'back-end',
            position: [0.7, 0.6, -0.05],
            links: [],
        },
    },
];

const constellationScrollOrder = {
    'front-end': 0,
    'full-stack': 1,
    'back-end': 2,
} satisfies Record<PortfolioProject['constellation']['id'], number>;

const compareProjectScrollOrder = (a: PortfolioProject, b: PortfolioProject): number =>
    constellationScrollOrder[a.constellation.id] - constellationScrollOrder[b.constellation.id] ||
    a.constellation.position[0] - b.constellation.position[0] ||
    a.constellation.position[1] - b.constellation.position[1];

const portfolioProjectsWithoutScreenshots: PortfolioProject[] = [
    ...webProjects,
    ...aiMlProjects,
    ...systemsProjects,
].sort(compareProjectScrollOrder);

export const portfolioProjects: PortfolioProject[] = withProjectScreenshots(
    portfolioProjectsWithoutScreenshots,
);
