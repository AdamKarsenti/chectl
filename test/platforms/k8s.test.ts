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
import * as execa from 'execa'
import { expect, fancy } from 'fancy-test'

import {K8sHelper} from '../../src/platforms/k8s'

jest.mock('execa')

let k8s = new K8sHelper()

describe('start', () => {
  fancy
    .it('confirms that kubernetes is running when it does run', async () => {
      const status = `Kubernetes master is running at https://master.rhpds311.openshift.opentlc.com:443

      To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
      `;

      (execa as any).mockResolvedValue({ code: 0, stdout: status })
      const res = await k8s.iskubernetesRunning()
      expect(res).to.equal(true)
    })

  fancy
    .it('confirms that kubernetes is not running when both minishift and OpenShift are stopped', async () => {
      const status = `Error from server`;

      (execa as any).mockResolvedValue({ code: 1, stdout: status })
      const res = await k8s.iskubernetesRunning()
      expect(res).to.equal(false)
    })
})
