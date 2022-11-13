import { uuid } from '$lib/utils/uuid';
import { getPalette } from 'colorthief';
import * as fs from 'node:fs/promises';
import * as os from 'node:os';
import * as path from 'node:path';
import sharp from 'sharp';

const downloadImageAndConvertToJpeg = async (
  imageUrl: string
): Promise<string> => {
  const outputFilePath = path.join(os.tmpdir(), `${uuid()}.jpg`);
  const imageBuffer = await fetch(imageUrl).then((response) =>
    response.arrayBuffer()
  );
  await sharp(Buffer.from(imageBuffer)).toFile(outputFilePath);
  return outputFilePath;
};

const colorArrayToString = (color: [number, number, number]): string => {
  return `#${color.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
};

const cache = new Map<string, string>();

export const getDominantColor = async (imgUrl: string): Promise<string> => {
  const cached = cache.get(imgUrl);
  if (cached) return cached;

  const imageFilePath = await downloadImageAndConvertToJpeg(imgUrl);
  try {
    const [dominantColor] = await getPalette(imageFilePath, 2, 2);
    if (!dominantColor) throw new Error('No dominant color found');
    const color = colorArrayToString(dominantColor);

    cache.set(imgUrl, color);
    return color;
  } finally {
    fs.unlink(imageFilePath);
  }
};
