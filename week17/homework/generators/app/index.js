var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts)
    }
    async prompting() {
        this.answers = await this.prompt([{
            type: 'input',
            name: 'title',
            message: 'Your project title',
        }]);
        this.readContent = await this.prompt([{
            type: 'input',
            name: 'content',
            message: 'Your project content',
        }]);
    }
    writing() {
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('../../gen-linhao/public/index.html'),
            { title: this.answers.title }, // user answer `title` used
            { content: this.readContent.content }
        );
    }
};