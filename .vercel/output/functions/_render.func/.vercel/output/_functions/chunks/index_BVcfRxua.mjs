import { decode as j } from './index_CkGk45UB.mjs';

// src/blurhash.ts

// src/format.ts
function rgbaPixelsToBmp(pixels, width, height) {
  const bytesPerPixel = 3;
  const padding = (4 - width * bytesPerPixel % 4) % 4;
  const bmpPixels = new Uint8Array((width * bytesPerPixel + padding) * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const j = (height - y - 1) * (width * bytesPerPixel + padding) + x * bytesPerPixel;
      bmpPixels[j] = pixels[i + 2];
      bmpPixels[j + 1] = pixels[i + 1];
      bmpPixels[j + 2] = pixels[i];
    }
  }
  const header = new Uint8Array([
    66,
    77,
    // magic
    54 + bmpPixels.length,
    4,
    0,
    0,
    // size in bytes
    0,
    0,
    // app data
    0,
    0,
    // app data
    54,
    0,
    0,
    0,
    // start of data offset
    40,
    0,
    0,
    0,
    // info hdrlen
    width & 255,
    width >> 8 & 255,
    width >> 16 & 255,
    width >> 24 & 255,
    // width
    height & 255,
    height >> 8 & 255,
    height >> 16 & 255,
    height >> 24 & 255,
    // height
    1,
    0,
    // num color planes
    24,
    0,
    // bits per pixel
    0,
    0,
    0,
    0,
    // compression is none
    bmpPixels.length,
    0,
    0,
    0,
    // image bits size
    19,
    11,
    0,
    0,
    // horz resoluition in pixel / m
    19,
    11,
    0,
    0,
    // vert resolutions (0x03C3 = 96 dpi, 0x0B13 = 72 dpi)
    0,
    0,
    0,
    0,
    // #colors in palette
    0,
    0,
    0,
    0
    // #important colors
  ]);
  const fullArr = new Uint8Array(header.length + bmpPixels.length);
  fullArr.set(header);
  fullArr.set(bmpPixels, header.length);
  return fullArr;
}
function imageDataToDataURI(data, mimeType) {
  const base64 = btoa(String.fromCharCode(...data));
  return `data:${mimeType};base64,${base64}`;
}

// src/blurhash.ts
function blurhashToDataUri(blurhash, width = 8, height = 8) {
  const pixels = j(blurhash, width, height);
  const data = rgbaPixelsToBmp(pixels, width, height);
  return imageDataToDataURI(data, "image/bmp");
}

// src/palette.ts
function getPalette(pixels, clusterCount = 8) {
  const clusters = kMeansClusters(pixels, clusterCount, 1e3, 50);
  return clusters.map((cluster) => cluster.centroid);
}
function getDominantColor(pixels) {
  return getPalette(pixels, 4)[0];
}
function kMeansClusters(pixels, clusterCount, sampleSize, maxIterations) {
  const data = [];
  for (let i = 0; i < sampleSize * 4; i += 4) {
    const index = Math.floor(Math.random() * (pixels.length / 4)) * 4;
    data.push([pixels[index], pixels[index + 1], pixels[index + 2]]);
  }
  let clusters = [];
  for (let i = 0; i < clusterCount; i++) {
    clusters.push({
      centroid: data[Math.floor(Math.random() * data.length)],
      cluster: []
    });
  }
  let changed = true;
  let iterations = 0;
  while (changed && iterations < maxIterations) {
    changed = false;
    iterations++;
    clusters.forEach((cluster) => cluster.cluster = []);
    data.forEach((point) => {
      let minDistance = Infinity;
      let closestClusterIndex = 0;
      clusters.forEach((cluster, index) => {
        const distance = euclideanDistance(point, cluster.centroid);
        if (distance < minDistance) {
          minDistance = distance;
          closestClusterIndex = index;
        }
      });
      clusters[closestClusterIndex].cluster.push(point);
    });
    clusters.forEach((cluster) => {
      const newCentroid = mean(cluster.cluster);
      if (newCentroid && !equal(newCentroid, cluster.centroid)) {
        changed = true;
        cluster.centroid = newCentroid;
      }
    });
  }
  return clusters.sort((a, b) => b.cluster.length - a.cluster.length);
}
function euclideanDistance(a, b) {
  return Math.sqrt(
    a.reduce((sum, value, index) => sum + Math.pow(value - b[index], 2), 0)
  );
}
function mean(points) {
  return points?.[0]?.map(
    (_, index) => points.reduce((sum, point) => sum + point[index], 0) / points.length
  );
}
function equal(a, b) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}
function rgbColorToCssString([red, green, blue]) {
  return `rgb(${red},${green},${blue})`;
}

export { blurhashToDataUri, getDominantColor, getPalette, imageDataToDataURI, kMeansClusters, rgbColorToCssString, rgbaPixelsToBmp };
