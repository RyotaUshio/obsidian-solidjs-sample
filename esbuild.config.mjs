import esbuild from "esbuild";
import process from "process";
import builtins from "builtin-modules";
import fs from "fs/promises";
import { solidPlugin } from 'esbuild-plugin-solid';

const banner = `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`;

const prod = (process.argv[2] === "production");
// https://github.com/amoutonbrady/esbuild-plugin-solid?tab=readme-ov-file#important-note-about-environment-configuration
const nodeEnv = prod ? 'production' : 'development';

const tsContext = await esbuild.context({
	banner: {
		js: banner,
		css: banner,
	},
	entryPoints: ["src/main.ts"],
	bundle: true,
	external: [
		"obsidian",
		"electron",
		"@capacitor/app",
		"@capacitor/core",
		"@capacitor/device",
		"@codemirror/autocomplete",
		"@codemirror/collab",
		"@codemirror/commands",
		"@codemirror/language",
		"@codemirror/lint",
		"@codemirror/search",
		"@codemirror/state",
		"@codemirror/view",
		"@lezer/common",
		"@lezer/highlight",
		"@lezer/lr",
		"pdfjs-dist",
		...builtins],
	format: "cjs",
	target: "es2018",
	logLevel: "info",
	sourcemap: prod ? false : "inline",
	treeShaking: true,
	outfile: "main.js",
	minify: prod,
	metafile: prod,
	plugins: [
		solidPlugin({
			// https://docs.solidjs.com/configuration/typescript#addressing-import-issues-with-directives
			typescript: {
				onlyRemoveTypeImports: true,
			}
		}),
	],
	// https://github.com/amoutonbrady/esbuild-plugin-solid?tab=readme-ov-file#important-note-about-environment-configuration
	define: {
		"process.env.NODE_ENV": JSON.stringify(nodeEnv),
	},
	conditions: [nodeEnv],
});

const cssContext = await esbuild.context({
	entryPoints: ["src/styles/index.css"],
	bundle: true,
	logLevel: "info",
	outfile: "styles.css",
	minify: prod,
});

if (prod) {
	const [tsResult] = await Promise.all([tsContext.rebuild(), cssContext.rebuild()]);

	const metafilePath = "metafile.json";
	await fs.writeFile(
		metafilePath,
		JSON.stringify(tsResult.metafile, null, 2)
	);

	process.exit(0);
} else {
	await Promise.all([tsContext.watch(), cssContext.watch()]);
}
