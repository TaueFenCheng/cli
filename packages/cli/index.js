// CommonJS (.cjs)
import { Command } from 'commander';
import path from 'node:path'
import fs, { fsyncSync } from 'node:fs'
import inquirer from 'inquirer';
const program = new Command();


function myParseInt(value) {
  return parseInt(value, 10);
}

function increaseVerbosity(value) {
  return value + 1;
}

function collect(value, previous) {
  return previous.concat([value]);
}

function commaSeparatedList(value) {
  return value.split(',');
}

const projectMap = {

}


function inquirerFn() {

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'projectName',
        message: '请输入项目名称:',
      },
      {
        type: 'list',
        name: 'projectType',
        message: '请选择项目类型:',
        choices: ['Node.js', 'React', 'Vue'],
      },
      {
        type: 'input',
        name: 'path',
        message: '请输入项目路径:',
        default: './',
      }
    ])
    .then((answers) => {
      const { projectName, projectType, path } = answers;
      const projectPath = `${path}/${projectName}`;

      if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath, { recursive: true });
        console.log(`创建项目: ${projectName} 类型: ${projectType} 在路径: ${projectPath}`);
        
        // 根据项目类型创建不同的项目结构
        switch (projectType) {
          case 'Node.js':
            // 创建Node.js项目结构
            fs.writeFileSync(`${projectPath}/index.js`, '// Node.js 项目入口');
            break;
          case 'React':
            // 创建React项目结构
            fs.writeFileSync(`${projectPath}/App.js`, '// React 项目入口');
            break;
          case 'Vue':
            // 创建Vue项目结构
            fs.writeFileSync(`${projectPath}/main.js`, '// Vue 项目入口');
            break;
          default:
            console.log('未知的项目类型');
        }
      } else {
        console.log('项目路径已存在，请选择其他名称或路径。');
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log('无法在当前环境中渲染提示');
      } else {
        console.log('发生错误:', error);
      }
    });
}

function main() {
  program
    .option('-f, --float <number>', 'float argument', parseFloat)
    .option('-i, --integer <number>', 'integer argument', myParseInt)
    .option('-v, --verbose', 'verbosity that can be increased', increaseVerbosity, 0)
    .option('-c, --collect <value>', 'repeatable value', collect, [])
    .option('-l, --list <items>', 'comma separated list', commaSeparatedList)

  program.parse();

  const options = program.opts();
  console.log(options);
  if (options.float !== undefined) console.log(`float: ${options.float}`);
  if (options.integer !== undefined) console.log(`integer: ${options.integer}`);
  if (options.verbose > 0) console.log(`verbosity: ${options.verbose}`);
  if (options.collect.length > 0) console.log(options.collect);
  if (options.list !== undefined) console.log(options.list);


}

inquirerFn();
// main();