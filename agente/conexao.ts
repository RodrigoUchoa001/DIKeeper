import { Agent } from "@aries-framework/core"

export const receberConviteDeConexao = async (agente: Agent, urlDoConvite: string) => {
    const { outOfBandRecord } = await agente.oob.receiveInvitationFromUrl(urlDoConvite)

    return outOfBandRecord
}