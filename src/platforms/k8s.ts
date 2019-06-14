/*********************************************************************
 * Copyright (c) 2019 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/
// tslint:disable:object-curly-spacing

import { Command } from '@oclif/command'
import * as commandExists from 'command-exists'
import * as execa from 'execa'
import * as Listr from 'listr'

export class K8sHelper {
  startTasks(flags: any, command: Command): Listr {
    return new Listr([
      {
        title: 'Verify if kubectl is installed',
        task: () => {
          if (!commandExists.sync('kubectl')) {
            command.error('E_REQUISITE_NOT_FOUND')
          }
        }
      },
      { title: 'Verify remote kubernetes status',
        task: async (_ctx: any, task: any) => {
          const k8sIsRunning = await this.iskubernetesRunning()
          if (!k8sIsRunning) {
            command.error('E_PLATFORM_NOT_READY: kubectl cluster-info command failed.')
          } else {
            task.title = `${task.title}...done.`
          }
        }
      },
      // { title: 'Verify minikube memory configuration', skip: () => 'Not implemented yet', task: () => {}},
      // { title: 'Verify kubernetes version', skip: () => 'Not implemented yet', task: () => {}},
      /*{ title: 'Verify if minikube ingress addon is enabled',
        task: async (ctx: any) => {
          ctx.isIngressAddonEnabled = await this.isIngressAddonEnabled()
        }
      },
      { title: 'Enable minikube ingress addon',
        skip: (ctx: any) => {
          if (ctx.isIngressAddonEnabled) {
            return 'Ingress addon is already enabled.'
          }
        },
        task: () => this.enableIngressAddon()
      },*/
      // Should automatically compute route if missing
      { title: 'Verify domain is set',
        task: (_ctx: any, task: any) => {
          if (flags.domain === undefined || flags.domain === '') {
            command.error('E_MISSING_ARGUMENT: the domain parameter needs to be defined.')
          }
          task.title = `${task.title}...set to ${flags.domain}.`
        }
      },
    ], {renderer: flags['listr-renderer'] as any})
  }

  async iskubernetesRunning(): Promise<boolean> {
    const { code } = await execa('kubectl', ['cluster-info'], { timeout: 10000, reject: false })
    if (code === 0) { return true } else { return false }
  }

}
