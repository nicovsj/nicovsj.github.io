import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const OWNER = 'nicovsj';
const REPO = 'cv';
const ASSET_NAME = 'cv.pdf';
const OUTPUT_PATH = path.resolve('public', ASSET_NAME);
const META_PATH = path.resolve('src/data/cv-meta.json');

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function writeMeta(publishedAt) {
  await mkdir(path.dirname(META_PATH), { recursive: true });
  await writeFile(
    META_PATH,
    `${JSON.stringify({ publishedAt }, null, 2)}\n`
  );
}

async function syncCv() {
  const latestReleaseUrl = `https://api.github.com/repos/${OWNER}/${REPO}/releases/latest`;

  try {
    const releaseResponse = await fetch(latestReleaseUrl, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'nicovsj.github.io-cv-sync',
      },
    });

    if (!releaseResponse.ok) {
      throw new Error(
        `Failed to fetch latest release: ${releaseResponse.status} ${releaseResponse.statusText}`
      );
    }

    const release = await releaseResponse.json();
    const asset = release.assets?.find((item) => item.name === ASSET_NAME);

    if (!asset?.browser_download_url) {
      throw new Error(`Could not find "${ASSET_NAME}" in latest release assets`);
    }

    const assetResponse = await fetch(asset.browser_download_url, {
      headers: {
        Accept: 'application/octet-stream',
        'User-Agent': 'nicovsj.github.io-cv-sync',
      },
    });

    if (!assetResponse.ok) {
      throw new Error(
        `Failed to download ${ASSET_NAME}: ${assetResponse.status} ${assetResponse.statusText}`
      );
    }

    const bytes = new Uint8Array(await assetResponse.arrayBuffer());
    await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, bytes);

    const publishedAt = new Date(release.published_at).toISOString().slice(0, 10);
    await writeMeta(publishedAt);

    console.log(`Synced ${ASSET_NAME} -> ${OUTPUT_PATH}`);
    console.log(`Updated CV metadata -> ${META_PATH}`);
  } catch (error) {
    const hasLocalFallback = await fileExists(OUTPUT_PATH);
    if (hasLocalFallback) {
      console.warn(
        `Could not sync latest CV (${error.message}). Using existing ${OUTPUT_PATH}.`
      );
      return;
    }

    console.error(`CV sync failed and no local fallback exists: ${error.message}`);
    process.exitCode = 1;
  }
}

await syncCv();
