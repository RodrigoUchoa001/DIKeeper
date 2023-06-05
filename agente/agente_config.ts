import { CredentialEventTypes, CredentialState, CredentialStateChangedEvent, InitConfig } from '@aries-framework/core'
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
    // agente.registerInboundTransport(new HttpInboundTransport({ port: 3002 }))

    agente
        .initialize()
        .then(() => {
            console.log(`Agente ${label} initializado com sucesso!`)
        })
        .catch((e) => {
            console.error(`Deu esse erro na hora de inicializar o agente: ${e}`)
        })
    
    // ouvir por novas credenciais chegando
    agente.events.on<CredentialStateChangedEvent>(CredentialEventTypes.CredentialStateChanged, async ({ payload }) => {
        switch (payload.credentialRecord.state) {
            case CredentialState.OfferReceived:
                console.log('credencial recebida')
                // TODO: exibir na tela a nova credencial

                await agente.credentials.acceptOffer({ credentialRecordId: payload.credentialRecord.id })
            case CredentialState.Done:
                console.log(`Credencial com id ${payload.credentialRecord.id} aceita`)
                process.exit(0)
        }
    })
    
    return agente
}


