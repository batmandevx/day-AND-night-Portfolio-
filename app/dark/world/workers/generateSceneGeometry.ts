import type { ResponsiveConfig } from '../../app/responsiveConfig';
import type {
    SceneGeometryData,
    SceneGeometryRequest,
    SceneGeometryWorkerResponse,
} from './sceneGeometryTypes';
const createSceneGeometryWorker = (): Worker =>
    new Worker(new URL('./sceneGeometry.worker.ts', import.meta.url), { type: 'module' });

export const generateSceneGeometry = (
    cloudPositions: Float32Array,
    particleCounts: ResponsiveConfig['particles'],
    onAssetsReady?: () => void,
): Promise<SceneGeometryData> =>
    new Promise((resolve, reject) => {
        const worker = createSceneGeometryWorker();
        const workerCloudPositions = cloudPositions.slice();
        const request: SceneGeometryRequest = {
            cloudPositions: workerCloudPositions,
            floatingTextCount: particleCounts.floatingText,
            ellipsisCount: particleCounts.ellipsis,
        };

        worker.onmessage = (event: MessageEvent<SceneGeometryWorkerResponse>) => {
            if (event.data.ok && 'phase' in event.data) {
                onAssetsReady?.();
                return;
            }

            worker.terminate();
            if (event.data.ok && 'data' in event.data) {
                resolve(event.data.data);
                return;
            }
            reject(new Error(event.data.error));
        };
        worker.onerror = (event) => {
            worker.terminate();
            reject(new Error(event.message || 'Scene geometry worker failed'));
        };
        worker.postMessage(request, [workerCloudPositions.buffer]);
    });
