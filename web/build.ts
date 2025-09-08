import fs from 'fs/promises';

async function main() {
  await build_client();
}

async function build_client() {
  const missions_dir = './src/missions';
  const mission_files = (await fs.readdir(missions_dir, { withFileTypes: true }))
    .filter(dirent => dirent.isFile() && dirent.name.endsWith('.ts'))
    .map(dirent => `${missions_dir}/${dirent.name}`);

  await Bun.build({
    entrypoints: ["./src/web.ts", ...mission_files],
    outdir: "./build/js/",
    define: {},
    sourcemap: "external",
  });
}

main();