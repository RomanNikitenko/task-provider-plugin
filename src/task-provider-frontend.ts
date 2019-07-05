
import * as theia from '@theia/plugin';

export function start(context: theia.PluginContext) {
    const outputChannel = theia.window.createOutputChannel('Test Channel');
    outputChannel.show();

    const testCommand = {
        id: 'execute-overriden-task',
        label: "Execute overriden task"
    };
    context.subscriptions.push(theia.commands.registerCommand(testCommand, (...args: any[]) => {
        theia.commands.executeCommand('task:run', 'customType', 'build', { command: 'yarn', args: ['run', 'watch'] });
    }));

    theia.tasks.registerTaskProvider('customType', {
        provideTasks: () => {
            const tasks: theia.Task[] = []

            const buildTask = {
                name: 'build',
                definition: {
                    type: 'customType'
                },
                source: 'customType',
                execution: {
                    command: 'yarn',
                    args: ['run', 'build'],
                    options: {
                        cwd: '/home/rnikitenko/projects/theia'
                    }
                },
            }
            tasks.push(buildTask);

            outputChannel.appendLine('=== PLUGIN === provide task: ' + JSON.stringify(buildTask));

            return tasks;
        },

        resolveTask: task => {
            return task;
        }
    });
}

export function stop() {

}
