import crypto from 'crypto';

type GravityType = 'ce';
type ExtensionType = 'jpeg' | 'png';
type ResizingType = 'fill-down' | 'fill';

type ArgsType = {
  imgUrl?: string;
  width?: number;
  height?: number;
  gravity?: GravityType;
  extension?: ExtensionType;
  resizingType?: ResizingType;
  retina?: boolean;
};

const getImgProxyUrl = () => {
  const imgProxyURl = process.env.NEXT_PUBLIC_IMG_PROXY_URL;

  if (!imgProxyURl) throw new Error('Unknown environment: imgProxyURl');

  return imgProxyURl;
};

const imgProxy = ({
  imgUrl,
  width = 100,
  height = 100,
  gravity = 'ce',
  resizingType = 'fill',
  extension = 'jpeg',
  retina = false,
}: ArgsType) => {
  if (!imgUrl) {
    return '';
  }

  const KEY = process.env.NEXT_PUBLIC_IMG_PROXY_KEY ?? '';
  const SALT = process.env.NEXT_PUBLIC_IMG_PROXY_SALT ?? '';

  const urlSafeBase64 = (input: Buffer | string) => (typeof input === 'string' ? Buffer.from(input) : input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const hexDecode = (hex: string) => Uint8Array.from(Buffer.from(hex, 'hex'));

  const sign = (salt: string, target: string, secret: string) => {
    const hmac = crypto.createHmac('sha256', hexDecode(secret));
    hmac.update(hexDecode(salt));
    hmac.update(target);

    return urlSafeBase64(hmac.digest());
  };

  const url = imgUrl;
  const enlarge = 0;
  const dpr = retina ? 2 : 1;
  const encodedUrl = urlSafeBase64(url);
  const path = `/rs:${resizingType}:${width}:${height}:${enlarge}/g:${gravity}/dpr:${dpr}/${encodedUrl}.${extension}`;
  const signature = sign(SALT, path, KEY);

  return new URL(`${signature}${path}`, getImgProxyUrl()).toString();
};

export default imgProxy;
