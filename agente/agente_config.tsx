import type { InitConfig } from '@aries-framework/core'
import { Agent } from '@aries-framework/core'
import { agentDependencies } from '@aries-framework/react-native'

import { AskarModule } from '@aries-framework/askar'
import { ariesAskar } from '@hyperledger/aries-askar-react-native'

import { HttpOutboundTransport, WsOutboundTransport } from '@aries-framework/core'

const config: InitConfig = {
  label: 'docs-agent-react-native',
  walletConfig: {
    id: 'wallet-id',
    key: 'testkey0000000000000000000000000',
  },
}

const agent = new Agent({
    config,
    dependencies: agentDependencies,
    modules: {
      // Register the Askar module on the agent
      askar: new AskarModule({
        ariesAskar,
      }),
    },
  })

agent.registerOutboundTransport(new HttpOutboundTransport())
agent.registerOutboundTransport(new WsOutboundTransport())

agent
  .initialize()
  .then(() => {
    console.log('Agente initializado!')
  })
  .catch((e) => {
    console.error(`Deu esse erro na hora de inicializar o agente: ${e}`)
  })