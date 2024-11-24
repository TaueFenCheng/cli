// index.ts
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
import path from "node:path";
import fs from "node:fs";
import inquirer from "inquirer";
import utils from "node:util";
import chalk from "chalk";
import ora from "ora";
import download from "download-git-repo";
import figlet from "figlet";
var baseProject = "../../projects";
var log = console.log;
var projectMap = [
    {
        key: "react",
        projectPath: path.join(baseProject, "/rspack_demo")
    },
    {
        key: "node",
        projectPath: path.join(baseProject, "/node_demo")
    },
    {
        key: "vue",
        projectPath: path.join(baseProject, "/vite_demo")
    }
];
function inquirerFn(params) {
    return _inquirerFn.apply(this, arguments);
}
function _inquirerFn() {
    _inquirerFn = _async_to_generator(function(params) {
        return _ts_generator(this, function(_state) {
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
                        "node",
                        "react",
                        "vue"
                    ]
                },
                {
                    type: "input",
                    name: "pathInput",
                    message: "\u8BF7\u8F93\u5165\u9879\u76EE\u8DEF\u5F84:",
                    default: "./"
                }
            ]).then(function(answers) {
                var projectName = answers.projectName, projectType = answers.projectType, pathInput = answers.pathInput;
                var projectPath = "".concat(pathInput, "/").concat(projectName);
                if (!fs.existsSync(projectPath)) {
                    fs.mkdirSync(projectPath, {
                        recursive: true
                    });
                    console.log("创建项目: ".concat(projectName, " 类型: ").concat(projectType, " 在路径: ").concat(projectPath));
                    var copyFile = utils.promisify(fs.copyFile);
                    var copyDir = fs.promises.cp;
                    var findPaths = function(path2) {
                        return projectMap.find(function(item) {
                            return item.key === path2;
                        }).projectPath;
                    };
                    var spinner = ora("Loading...").start();
                    switch(projectType){
                        case "react":
                            var sourceDirReact = findPaths(projectType);
                            console.log(sourceDirReact);
                            copyDir(sourceDirReact, "".concat(projectPath, "/"), {
                                recursive: true
                            }).then(function(res) {
                                spinner.stop();
                                log(chalk.red("\u9879\u76EE\u62F7\u8D1D\u6210\u529F"));
                            }).catch(function(error) {
                                spinner.stop();
                                console.log(error);
                            });
                            break;
                        case "node":
                            fs.writeFileSync("".concat(projectPath), "// React \u9879\u76EE\u5165\u53E3");
                            break;
                        case "vue":
                            var sourceDirVue = findPaths(projectType);
                            console.log(sourceDirVue);
                            copyDir(sourceDirVue, "".concat(projectPath, "/"), {
                                recursive: true
                            }).then(function(res) {
                                log("\u9879\u76EE\u62F7\u8D1D\u6210\u529F!");
                            }).catch(function(error) {
                                console.log(error);
                            });
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
            return [
                2
            ];
        });
    });
    return _inquirerFn.apply(this, arguments);
}
export { inquirerFn };
//# sourceMappingURL=index.mjs.map