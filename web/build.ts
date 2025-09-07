async function main() {
  build_client();
}

async function build_client() {

  await Bun.build({
    entrypoints: ["./src/web.ts"],
    outdir: "./build/js/",
    define: {},
    sourcemap: "external"
  });
}

main();