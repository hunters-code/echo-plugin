import { Type, type Static } from "@sinclair/typebox";
import { registerOrbitUserBilling, type OrbitOpenClawPluginApi } from "@orbit-0g/sdk";
import { definePluginEntry, jsonResult } from "openclaw/plugin-sdk/core";

const echoParams = Type.Object({
  message: Type.String({ description: "Message to echo back" }),
});

export default definePluginEntry({
  id: "echo-plugin",
  name: "Echo",
  description: "Echoes back a message — simple Orbit billing test plugin",
  register(api) {
    registerOrbitUserBilling(api as OrbitOpenClawPluginApi, {
      pluginId: process.env.ORBIT_PLUGIN_ID,
    });

    api.registerTool({
      name: "echo_message",
      label: "Echo message",
      description: "Returns the message you send",
      parameters: echoParams,
      async execute(_id, params) {
        const p = params as Static<typeof echoParams>;
        return jsonResult({ ok: true, echo: p.message });
      },
    });
  },
});
