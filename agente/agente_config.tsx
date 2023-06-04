import type { InitConfig } from '@aries-framework/core'
import { Agent } from '@aries-framework/core'
import { agentDependencies } from '@aries-framework/react-native'

import { AskarModule } from '@aries-framework/askar'
import { ariesAskar } from '@hyperledger/aries-askar-react-native'

import { HttpOutboundTransport, WsOutboundTransport } from '@aries-framework/core'

export function iniciarAgente(label: string, wallet_id: string, wallet_key: string) {
    const config: InitConfig = {
        label: label,
        walletConfig: {
            id: wallet_id,
            key: wallet_key,
        },
    }

    const agente = new Agent({
        config,
        dependencies: agentDependencies,
        modules: {
            // Register the Askar module on the agent
            askar: new AskarModule({
            ariesAskar,
            }),
        },
    })

    agente.registerOutboundTransport(new HttpOutboundTransport())
    agente.registerOutboundTransport(new WsOutboundTransport())

    agente
        .initialize()
        .then(() => {
            console.log('Agente initializado com sucesso!')
        })
        .catch((e) => {
            console.error(`Deu esse erro na hora de inicializar o agente: ${e}`)
        })
    
    return agente
}


