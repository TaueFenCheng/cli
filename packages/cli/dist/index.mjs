// index.ts
import { Command } from "commander";
import fs from "node:fs";
import inquirer from "inquirer";
var program = new Command();
function inquirerFn(params) {
    console.log(params, "\u547D\u4EE4\u884C\u53C2\u6570");
    inquirer.prompt([
        {
            type: "input",
            name: "projectName",
            message: "\u8BF7\u8F93\u5165\u9879\u76EE\u540D\u79F0:"
        },
        {
            type: "list",
            name: "projectType",
            message: "\u8BF7\u9009\u62E9\u9879\u76EE\u7C7B\u578B:",
            choices: [
                "Node.js",
                "React",
                "Vue"
            ]
        },
        {
            type: "input",
            name: "path",
            message: "\u8BF7\u8F93\u5165\u9879\u76EE\u8DEF\u5F84:",
            default: "./"
        }
    ]).then(function(answers) {
        var projectName = answers.projectName, projectType = answers.projectType, path = answers.path;
        var projectPath = "".concat(path, "/").concat(projectName);
        if (!fs.existsSync(projectPath)) {
            fs.mkdirSync(projectPath, {
                recursive: true
            });
            console.log("创建项目: ".concat(projectName, " 类型: ").concat(projectType, " 在路径: ").concat(projectPath));
            switch(projectType){
                case "Node.js":
                    fs.writeFileSync("".concat(projectPath, "/index.js"), "// Node.js \u9879\u76EE\u5165\u53E3");
                    break;
                case "React":
                    fs.writeFileSync("".concat(projectPath, "/App.js"), "// React \u9879\u76EE\u5165\u53E3");
                    break;
                case "Vue":
                    fs.writeFileSync("".concat(projectPath, "/main.js"), "// Vue \u9879\u76EE\u5165\u53E3");
                    break;
                default:
                    console.log("\u672A\u77E5\u7684\u9879\u76EE\u7C7B\u578B");
            }
        } else {
            console.log("\u9879\u76EE\u8DEF\u5F84\u5DF2\u5B58\u5728\uFF0C\u8BF7\u9009\u62E9\u5176\u4ED6\u540D\u79F0\u6216\u8DEF\u5F84\u3002");
        }
    }).catch(function(error) {
        if (error.isTtyError) {
            console.log("\u65E0\u6CD5\u5728\u5F53\u524D\u73AF\u5883\u4E2D\u6E32\u67D3\u63D0\u793A");
        } else {
            console.log("\u53D1\u751F\u9519\u8BEF:", error);
        }
    });
}
export { inquirerFn };
//# sourceMappingURL=index.mjs.map