const M = new Float32Array([
  1.049525092335538, -0.001031056188688, -47.53998288664623, -0.002986916173688,
  1.091447596196915, -36.593800542691326, -0.000002330078267,
  -0.000002193675746, 1
]);

const width = 1920;
const height = 1200;

export function transformCoordinates(x: number, y: number) {
  // Convert normalized coordinates (0-1) to absolute coordinates for transformation
  const absoluteX = x * width;
  const absoluteY = y * height;

  const point = [absoluteX, absoluteY, 1];

  const transformedX = M[0] * point[0] + M[1] * point[1] + M[2] * point[2];
  const transformedY = M[3] * point[0] + M[4] * point[1] + M[5] * point[2];
  const transformedW = M[6] * point[0] + M[7] * point[1] + M[8] * point[2];

  let newX = transformedX / transformedW;
  let newY = transformedY / transformedW;

  // Clamp to screen bounds
  newX = Math.min(Math.max(0, newX), width - 1);
  newY = Math.min(Math.max(0, newY), height - 1);

  // Normalize to 0-1 range for the landmark system
  const normalizedX = newX / width;
  const normalizedY = newY / height;

  // Invert the X axis
  const invertedX = 1 - normalizedX;

  return { x: invertedX, y: normalizedY };
}
