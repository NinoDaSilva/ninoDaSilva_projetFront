import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const { projectId, dataset } = useSanity().client.config();

export default () => {
    const getImage = (source: SanityImageSource) =>
        projectId && dataset
            ? imageUrlBuilder({ projectId, dataset }).image(source)
            : null;
    return { getImage };
}