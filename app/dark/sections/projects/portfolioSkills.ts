import type { PortfolioSkill } from './portfolioConstellation';

const languageSkills: PortfolioSkill[] = [
    { id: 'typescript', label: 'TypeScript' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'python', label: 'Python' },
    { id: 'cpp', label: 'C++' },
    { id: 'sql', label: 'SQL' },
];

const webSkills: PortfolioSkill[] = [
    { id: 'react', label: 'React' },
    { id: 'nextjs', label: 'Next.js' },
    { id: 'nodejs', label: 'Node.js' },
    { id: 'fastapi', label: 'FastAPI' },
    { id: 'mongodb', label: 'MongoDB' },
    { id: 'redis', label: 'Redis' },
    { id: 'rest-api', label: 'REST APIs' },
    { id: 'responsive-design', label: 'Responsive Design' },
];

const aiSkills: PortfolioSkill[] = [
    { id: 'machine-learning', label: 'Machine Learning' },
    { id: 'deep-learning', label: 'Deep Learning' },
    { id: 'tensorflow', label: 'TensorFlow' },
    { id: 'pytorch', label: 'PyTorch' },
    { id: 'opencv', label: 'OpenCV' },
    { id: 'tflite', label: 'TensorFlow Lite' },
    { id: 'computer-vision', label: 'Computer Vision' },
    { id: 'llm', label: 'LLM' },
    { id: 'langchain', label: 'LangChain' },
    { id: 'langgraph', label: 'LangGraph' },
    { id: 'agentic-ai', label: 'Agentic AI' },
    { id: 'gemini', label: 'Gemini' },
    { id: 'xgboost', label: 'XGBoost' },
    { id: 'lstm', label: 'LSTM' },
    { id: 'transfer-learning', label: 'Transfer Learning' },
    { id: 'ocr', label: 'OCR' },
    { id: 'recommender-systems', label: 'Recommender Systems' },
    { id: 'clustering', label: 'Clustering' },
];

const cloudAndSystemsSkills: PortfolioSkill[] = [
    { id: 'aws', label: 'AWS' },
    { id: 'aws-lambda', label: 'AWS Lambda' },
    { id: 'aws-bedrock', label: 'AWS Bedrock' },
    { id: 'azure-ml', label: 'Azure ML' },
    { id: 'docker', label: 'Docker' },
    { id: 'kafka', label: 'Kafka' },
    { id: 'github-actions', label: 'GitHub Actions' },
    { id: 'iot', label: 'IoT' },
    { id: 'multithreading', label: 'Multithreading' },
    { id: 'bpf', label: 'BPF' },
    { id: 'sap-s4hana', label: 'SAP S/4HANA' },
    { id: 'three-js', label: 'Three.js' },
    { id: '3d-reconstruction', label: '3D Reconstruction' },
    { id: 'gaussian-splatting', label: 'Gaussian Splatting' },
];

export const portfolioSkills: PortfolioSkill[] = [
    ...languageSkills,
    ...webSkills,
    ...aiSkills,
    ...cloudAndSystemsSkills,
];
