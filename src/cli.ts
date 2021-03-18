import cliui from "https://deno.land/x/cliui@v7.0.4-deno/deno.ts";
import { parse } from "https://deno.land/std@0.90.0/flags/mod.ts";
import { relative } from "https://deno.land/std@0.90.0/path/mod.ts";

export const ARGS = parse(Deno.args, {
  boolean: "help update-mod".split(" "),
  alias: {
    "h": "help",
  },
});

function die(exit: 0 | 1 = 0) {
  Deno.exit(exit);
}

function readFileSync(path: string): string {
  const contents = Deno.readFileSync(path);
  return new TextDecoder("utf-8").decode(contents);
}

function help() {
  const ui = cliui({ width: 80 });
  ui.div("Usage: nodash-cli [command] [options]");
  ui.div({
    text: "Commands:",
    padding: [2, 0, 1, 0],
  });
  ui.div({
    text: "--update-mod",
    width: 20,
    padding: [0, 4, 0, 4],
  }, {
    text:
      "Updates the `mod.ts` file by reading `**/*.ts` to determine what is exportable." +
      " The `@export` flag set before any `export function` will export that function.",
    width: 50,
    padding: [0, 4, 0, 4],
  });
  ui.div({
    text: "Options:",
    padding: [2, 0, 1, 0],
  });
  ui.div({
    text: "-h, --help",
    width: 20,
    padding: [0, 4, 0, 4],
  }, {
    text: "Print this help message. Did it help?",
    width: 60,
    padding: [0, 4, 0, 4],
  });
  ui.div();
  ui.div();

  console.log(ui.toString());
}

if (ARGS["h"]) {
  help();
  die();
}

ARGS["update-mod"] = true;
if (ARGS["update-mod"]) {
  const srcPath = [Deno.cwd(), "src"];
  const path = [Deno.cwd(), "src"];

  console.info("Look for `@exports` tags in:", path.join("/"));

  const modExports: Record<string, Record<string, string>> = {};
  const directories = Array.from(Deno.readDirSync(path.join("/"))).filter((
    entry,
  ) => entry.isDirectory);
  for (const entry of directories) {
    const moduleName = entry.name;
    modExports[moduleName] = modExports[entry.name] || {};
    path.push(moduleName);
    const tsFiles = Array.from(Deno.readDirSync(path.join("/")))
      .filter((entry) => entry.isFile && /^[^.]+\.ts$/.test(entry.name));
    for (const entry of tsFiles) {
      path.push(entry.name);
      console.info("\t...", path.join("/"));
      const contents = readFileSync(path.join("/"));
      const match =
        /\*\s+@export\s+[\s\S]*?(?=\n.*export function)\s*export\s+function\s+([^<(]+)/g
          .exec(contents);
      if (match) {
        modExports[moduleName][match[1] as string] = "./" +
          relative(srcPath.join("/"), path.join("/"));
      }
      path.pop();
    }
    path.pop();
  }

  const modLines = [];
  const modNames = Object.keys(modExports).sort();
  for (const modName of modNames) {
    modLines.push(`// ${modName} submodule`);
    for (const exportName of Object.keys(modExports[modName]).sort()) {
      modLines.push(
        `export { ${exportName} } from "${modExports[modName][exportName]}";`,
      );
    }
  }
  const modPath = `${path.join("/")}/mod.ts`;
  console.info("\n\tSaving mod file to:", modPath);
  Deno.writeTextFileSync(modPath, modLines.join("\n"));
  console.log("\nDone.\n");
  die();
}

help();
die(1);
