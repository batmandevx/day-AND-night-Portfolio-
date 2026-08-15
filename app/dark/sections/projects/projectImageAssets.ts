import responsiveManifest from '../../../../public/dark/projects/responsive/manifest.json';
import type { ResponsiveImageSource } from '../../utils/assetLoaders';

export const PROJECT_PREVIEW_IMAGE_SIZES = '(max-width: 767px) 0px, clamp(220px, 22vw, 320px)';
export const PROJECT_DETAILS_IMAGE_SIZES =
    '(max-width: 767px) calc(100vw - 4.5rem), min(calc(42vw - 2rem), 44rem)';

interface ProjectImageSet {
    preview: ResponsiveImageSource;
    details: ResponsiveImageSource;
}

interface ManifestVariant {
    filename: string;
    width: number;
}

interface ManifestEntry {
    id: string;
    width: number;
    height: number;
    previewVariants: ManifestVariant[];
    detailVariants: ManifestVariant[];
    detailOriginal?: ManifestVariant;
}

// Screenshot URLs are resolved by filename convention against public/dark/projects
// using the responsive-image manifest (public/dark/projects/responsive/manifest.json).
// Projects without a manifest entry simply have no screenshots — the preview card
// and details panel hide the figure in that case. To add screenshots for a project,
// place `<id>-<width>.webp` preview variants and `<id>-detail-<width>.png` detail
// variants under public/dark/projects/responsive/ and add a manifest entry keyed
// by the project id.
const RESPONSIVE_BASE_URL = '/dark/projects/responsive';
const ORIGINAL_BASE_URL = '/dark/projects';

const createResponsiveImage = (
    candidates: Array<{ source: string; width: number }>,
    width: number,
    height: number,
): ResponsiveImageSource => {
    const fallback = candidates.find((candidate) => candidate.width === 768) ?? candidates.at(-1);
    if (!fallback) {
        throw new Error('Responsive image has no candidates');
    }

    return {
        src: fallback.source,
        srcset: candidates
            .map(({ source, width: candidateWidth }) => `${source} ${candidateWidth}w`)
            .join(', '),
        width,
        height,
    };
};

const toCandidates = (variants: ManifestVariant[]): Array<{ source: string; width: number }> =>
    variants.map((variant) => ({
        source: `${RESPONSIVE_BASE_URL}/${variant.filename}`,
        width: variant.width,
    }));

const responsiveProjectImages = Object.fromEntries(
    (responsiveManifest as ManifestEntry[]).map((entry) => {
        const preview = createResponsiveImage(
            toCandidates(entry.previewVariants),
            entry.width,
            entry.height,
        );

        const detailCandidates = toCandidates(entry.detailVariants);
        if (entry.detailOriginal) {
            detailCandidates.push(...toCandidates([entry.detailOriginal]));
        } else {
            detailCandidates.push({
                source: `${ORIGINAL_BASE_URL}/${entry.id}.png`,
                width: entry.width,
            });
        }

        return [
            entry.id,
            {
                preview,
                details: createResponsiveImage(detailCandidates, entry.width, entry.height),
            } satisfies ProjectImageSet,
        ];
    }),
) as Record<string, ProjectImageSet>;

export const projectImagesById: Record<string, ProjectImageSet> = responsiveProjectImages;
