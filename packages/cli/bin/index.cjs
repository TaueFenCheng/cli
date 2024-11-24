"use strict";
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = function(to, from, except, desc) {
    if (from && (typeof from === "undefined" ? "undefined" : _type_of(from)) === "object" || typeof from === "function") {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            var _loop = function() {
                var key = _step.value;
                if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
                    get: function() {
                        return from[key];
                    },
                    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                });
            };
            for(var _iterator = __getOwnPropNames(from)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    return to;
};
var __toESM = function(mod, isNodeMode, target) {
    return target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(// If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
    }) : target, mod);
};
// index.ts
var import_commander = require("commander");
var import_node_fs = __toESM(require("fs"), 1);
var import_inquirer = __toESM(require("inquirer"), 1);
var program = new import_commander.Command();
function inquirerFn() {
    import_inquirer.default.prompt([
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
        if (!import_node_fs.default.existsSync(projectPath)) {
            import_node_fs.default.mkdirSync(projectPath, {
                recursive: true
            });
            console.log("创建项目: ".concat(projectName, " 类型: ").concat(projectType, " 在路径: ").concat(projectPath));
            switch(projectType){
                case "Node.js":
                    import_node_fs.default.writeFileSync("".concat(projectPath, "/index.js"), "// Node.js \u9879\u76EE\u5165\u53E3");
                    break;
                case "React":
                    import_node_fs.default.writeFileSync("".concat(projectPath, "/App.js"), "// React \u9879\u76EE\u5165\u53E3");
                    break;
                case "Vue":
                    import_node_fs.default.writeFileSync("".concat(projectPath, "/main.js"), "// Vue \u9879\u76EE\u5165\u53E3");
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
inquirerFn();
//# sourceMappingURL=index.cjs.map