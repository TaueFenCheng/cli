export function img2base64(imgSrc: string) {
  let img = new Image();
  img.src = imgSrc;
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  let base64Url = canvas.toDataURL("image/jpeg");
  return base64Url;
}
