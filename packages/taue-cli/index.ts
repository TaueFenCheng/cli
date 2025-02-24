import fs from "node:fs";
import path from "node:path";
import utils from "node:util";
import chalk from "chalk";
import download from "download-git-repo";
import figlet from "figlet";
import inquirer from "inquirer";
import ora from "ora";

const baseProject = "../../projects";
const log = console.log;

const downloadFun = (url: any, project: any) => {
	const spinner = ora("Downloading source...").start();

	download(url, project, { clone: true }, (err: unknown) => {
		if (!err) {
			spinner.succeed(chalk.green("Download successful!"));
			console.log(
				chalk.yellow(figlet.textSync("Done!", { horizontalLayout: "full" })),
			);
			console.log(
				chalk.blue(`You can start by running:
cd ${project}
${chalk.green("npm install")}
${chalk.green("npm run dev")}`),
			);
		} else {
			spinner.fail(chalk.red("Download failed"));
			console.error(chalk.red(err));
		}
	});
};

const projectMap = [
	{
		key: "react",
		projectPath: path.join(baseProject, "/rspack_demo"),
	},
	{
		key: "node",
		projectPath: path.join(baseProject, "/node_demo"),
	},
	{
		key: "vue",
		projectPath: path.join(baseProject, "/vite_demo"),
	},
];
export async function inquirerFn(params: any) {
	console.log(params, "命令行参数");
	inquirer
		.prompt([
			{
				type: "input",
				name: "projectName",
				message: "请输入项目名称:",
			},
			{
				type: "list",
				name: "projectType",
				message: "请选择项目类型:",
				choices: ["node", "react", "vue"],
			},
			{
				type: "input",
				name: "pathInput",
				message: "请输入项目路径:",
				default: "./",
			},
		])
		.then((answers) => {
			const { projectName, projectType, pathInput } = answers;
			const projectPath = `${pathInput}/${projectName}`;

			if (!fs.existsSync(projectPath)) {
				fs.mkdirSync(projectPath, { recursive: true });
				console.log(
					`创建项目: ${projectName} 类型: ${projectType} 在路径: ${projectPath}`,
				);

				const copyFile = utils.promisify(fs.copyFile);
				const copyDir = fs.promises.cp;

				const findPaths = (path: "react" | "node" | "vue") =>
					projectMap.find((item) => item.key === path).projectPath;
				const spinner = ora("Loading...").start();

				// 根据项目类型创建不同的项目结构
				switch (projectType) {
					case "react": {
						const sourceDirReact = findPaths(projectType);
						console.log(sourceDirReact);
						copyDir(sourceDirReact, `${projectPath}/`, { recursive: true })
							.then((res) => {
								spinner.stop();
								log(chalk.red("项目拷贝成功"));
							})
							.catch((error) => {
								spinner.stop();
								// console.error(error);
								console.log(error);
							});
						break;
					}
					case "node":
						// 创建React项目结构
						fs.writeFileSync(`${projectPath}`, "// React 项目入口");
						break;
					case "vue": {
						// 创建Vue项目结构
						const sourceDirVue = findPaths(projectType);
						console.log(sourceDirVue);
						copyDir(sourceDirVue, `${projectPath}/`, { recursive: true })
							.then((res) => {
								log("项目拷贝成功!");
							})
							.catch((error) => {
								// console.error(error);
								console.log(error);
							});
						break;
					}
					default:
						console.log("未知的项目类型");
				}
			} else {
				console.log("项目路径已存在，请选择其他名称或路径。");
			}
		})
		.catch((error) => {
			if (error.isTtyError) {
				console.log("无法在当前环境中渲染提示");
			} else {
				console.log("发生错误:", error);
			}
		});
}
