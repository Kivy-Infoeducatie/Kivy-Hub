const M = new Float32Array([
  1.0675905314427587, -0.0036393647084754593, -61.25699153315188,
  0.0014837666654052516, 1.097510177539108, -44.70314564943713,
  3.0912634452906935e-6, -5.092366810614322e-6, 1.0
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

  return { x: 1 - (normalizedX - 0.182) * 1.61, y: (normalizedY - 0.08) * 1.61 };
}
