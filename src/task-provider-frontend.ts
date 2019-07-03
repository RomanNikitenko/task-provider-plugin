
import * as theia from '@theia/plugin';

export function start(context: theia.PluginContext) {
    const outputChannel = theia.window.createOutputChannel('Test Channel');
    outputChannel.show();

    theia.tasks.registerTaskProvider('customType', {
        provideTasks: () => {
            const tasks: theia.Task[] = []

            const buildTask = {
                name: 'build',
                definition: {
                    type: 'customType'
                },
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
            outputChannel.appendLine('=== PLUGIN === resolve task: ' + JSON.stringify(task));
            if (task.name === 'build') {
                task.execution = {
                    command: 'yarn',
                    args: [],
                    options: {
                        cwd: '/home/rnikitenko/projects/che-theia'
                    }
                }
            }
            return task;
        }
    });
}

export function stop() {

}
