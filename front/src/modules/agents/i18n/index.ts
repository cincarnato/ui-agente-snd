
import merge from "deepmerge";
import AgentMessages from "./Agent-i18n"

const messages = merge.all([
    AgentMessages
])

export default messages
