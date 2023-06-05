import { Agent } from "@aries-framework/core"
import { iniciarAgente } from "./agente_config"

// Agente BOB - holder
const agenteBob = iniciarAgente(
    'demo-agent-bob',
    'mainBob',
    'demoagentbob04928502759204758920'
)
const agentBobInicializado = async () => {
    return await agenteBob.initialize()
}


const receberConvite = async (agente: Agent, UrlDoConvite: string) => {
    const { outOfBandRecord } = await agente.oob.receiveInvitationFromUrl(UrlDoConvite)

    return outOfBandRecord
}