import * as THREE from "three";

function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

export function createPavingTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();
  const random = seeded(41);
  ctx.fillStyle = "#a79b88";
  ctx.fillRect(0, 0, 512, 512);
  const size = 32;
  for (let y = 0; y < 16; y += 1) {
    for (let x = 0; x < 16; x += 1) {
      const v = Math.floor(random() * 22) - 11;
      ctx.fillStyle = `rgb(${166 + v}, ${154 + v}, ${136 + v})`;
      ctx.fillRect(x * size + 1, y * size + 1, size - 2, size - 2);
      ctx.strokeStyle = "rgba(72,62,51,.22)";
      ctx.strokeRect(x * size + 0.5, y * size + 0.5, size - 1, size - 1);
      if (random() > 0.68) {
        ctx.strokeStyle = "rgba(255,255,255,.08)";
        ctx.beginPath();
        ctx.moveTo(x * size + 4, y * size + 7 + random() * 16);
        ctx.lineTo(x * size + 26, y * size + 9 + random() * 14);
        ctx.stroke();
      }
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 22);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export function createBrickTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();
  const random = seeded(12);
  ctx.fillStyle = "#8d6648";
  ctx.fillRect(0, 0, 256, 256);
  for (let row = 0; row < 16; row += 1) {
    const offset = row % 2 ? -16 : 0;
    for (let col = 0; col < 10; col += 1) {
      const x = col * 32 + offset;
      const v = Math.floor(random() * 25) - 12;
      ctx.fillStyle = `rgb(${166 + v}, ${116 + v}, ${78 + v})`;
      ctx.fillRect(x + 1, row * 16 + 1, 30, 14);
      ctx.strokeStyle = "rgba(72,45,30,.3)";
      ctx.strokeRect(x + 0.5, row * 16 + 0.5, 31, 15);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createTileTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();
  ctx.fillStyle = "#176d78";
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = "#d9c487";
  ctx.lineWidth = 5;
  for (let x = 0; x <= 256; x += 64) {
    for (let y = 0; y <= 256; y += 64) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.PI / 4);
      ctx.strokeRect(-22, -22, 44, 44);
      ctx.strokeStyle = "#80b9b8";
      ctx.strokeRect(-12, -12, 24, 24);
      ctx.restore();
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
