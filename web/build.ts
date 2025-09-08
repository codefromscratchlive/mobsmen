import fs from 'fs/promises';

async function main() {
  await build_client();
}

async function build_client() {
  const missionsDir = './src/missions';
  const missionFiles = (await fs.readdir(missionsDir, { withFileTypes: true }))
    .filter(dirent => dirent.isFile() && dirent.name.endsWith('.ts'))
    .map(dirent => `${missionsDir}/${dirent.name}`);

  await Bun.build({
    entrypoints: ["./src/web.ts", ...missionFiles],
    outdir: "./build/js/",
    define: {},
    sourcemap: "external"
  });
}

main();