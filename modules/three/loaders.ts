import { BufferGeometryLoader } from "three";

const loadFileAsync = async (
    src: string,
    responseType?: string
): Promise<JSON> => {
    const data: Response = await fetch(src);
    // return responseType ? await data[responseType]() : data;
    return data.json();
};

const setBufferGeometryLoader = (obj: any) => {
    return new BufferGeometryLoader(obj.manager);
};

export { loadFileAsync, setBufferGeometryLoader };
