
/**
 * Generated using theia-plugin-generator
 */

import * as theia from '@theia/plugin';
import { Task } from '@theia/plugin';

export function start(context: theia.PluginContext) {
    let currentTaskExecution: theia.TaskExecution;

    theia.tasks.onDidStartTask(event => {
        currentTaskExecution = event.execution;
        console.log('+++++++++++++ !!! on STARTED ');
        const tsk = event.execution.task;
        console.log('+++ name ' + tsk.name);
        console.log('+++ type ' + tsk.definition.type);

        const shellExecution = tsk.execution as theia.ShellExecution;
        console.log('+++ command ' + shellExecution.command);
        console.log('+++ commandLine ' + shellExecution.commandLine);
        console.log('+++ args ' + shellExecution.args![0] + ' /// ' + shellExecution.args![1]);
        console.log('+++ cwd ' + shellExecution.options!.cwd);
    });

    // theia.tasks.onDidEndTask(event => {
    //     currentTaskExecution = event.execution;
    //     console.log('********************** !!! on END ');
    //     const tsk = event.execution.task;
    //     console.log('+++ name ' + tsk.name);
    //     console.log('+++ type ' + tsk.definition.type);

    //     const shellExecution = tsk.execution as theia.ShellExecution;
    //     console.log('+++ command ' + shellExecution.command);
    //     console.log('+++ commandLine ' + shellExecution.commandLine);
    //     console.log('+++ args ' + shellExecution.args![0] + ' /// ' + shellExecution.args![1]);
    //     console.log('+++ cwd ' + shellExecution.options!.cwd);
    // });

    theia.commands.registerCommand({
        id: 'terminateTask',
        label: 'Terminate task'
    }, (...args: any[]) => {
        currentTaskExecution.terminate();
    });




    theia.tasks.registerTaskProvider('shell', {
        provideTasks: token => {
            const tasks: Task[] = []

            const buildTask = {
                name: 'yarn build',
                definition: {
                    type: 'shell'
                },
                execution: {
                    commandLine: 'yarn run build',
                    options: {
                        cwd: '/home/rnikitenko/projects/theia'
                    }
                },
            };

            const watchTask = {
                name: 'yarn watch',
                definition: {
                    type: 'shell'
                },
            }

            tasks.push(buildTask);
            tasks.push(watchTask);

            return tasks;
        },

        resolveTask: task => {
            if (task.name === 'yarn watch') {
                task.execution = {
                    commandLine: 'yarn run watch',
                    options: {
                        cwd: '/projects/task-provider-plugin'
                    }
                }
            }
            return task;
        }
    });

}

export function stop() {

}
