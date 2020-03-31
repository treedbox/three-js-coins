const materialHex: number[] = [
    0x009688,
    0x00bcd4,
    0x03a9f4,
    0x2196f3,
    0x3f51b5,
    0x4caf50,
    0x607d8b,
    0x673ab7,
    0x795548,
    0x8bc34a,
    0x9c27b0,
    0x9e9e9e,
    0xcddc39,
    0xe91e63,
    0xf44336,
    0xff5722,
    0xff9800,
    0xffc107,
    0xffeb3b
];

const random = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const randomColor = (arr: number[] = materialHex): number =>
    arr[random(0, arr.length - 1)];

const setEmissive = (e: any, hexcolor: number): void => {
    if (e.object.material.emissive) {
        e.object.material.emissive.set(hexcolor);
    }
    e.object.material.transparent = true;
};

export { materialHex, randomColor, setEmissive };
