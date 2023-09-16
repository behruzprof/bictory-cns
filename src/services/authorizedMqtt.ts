import { IS_PRODUCTION, MqttAdditionalConfig, mqttServer } from "./constants"
import { connect as mqttConnect, MqttClient } from "mqtt"
import { cookies, CookieKeys } from "./cookie"

export const mqttCipher = (salt: string) => {
  let textToChars = (text: string) => text.split("").map((c) => c.charCodeAt(0))
  let byteHex = (n: string) => ("0" + Number(n).toString(16)).substr(-2)
  let applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code)

  return (text: string) =>
    text.split("").map(textToChars).map(applySaltToChar).map(byteHex).join("")
}

let connectionTestTimer

export class AuthorizedMqttService {
  private static instance: AuthorizedMqttService
  private static mqttCl: MqttClient
  private static cipher
  private static clId
  public static Encoder
  private constructor() {
    AuthorizedMqttService.Encoder = new TextDecoder("utf-8")
  }

  public static getInstance(updatedToken?: string): AuthorizedMqttService {
    if (!AuthorizedMqttService.instance) {
      AuthorizedMqttService.instance = new AuthorizedMqttService()
      AuthorizedMqttService.cipher = mqttCipher("ubSalt")
      AuthorizedMqttService.clId = AuthorizedMqttService.cipher(
        "mqttjs_" + Math.random().toString(16).substr(2, 8)
      )
      AuthorizedMqttService.mqttCl = mqttConnect(mqttServer, {
        password: IS_PRODUCTION ? "123456789123" : AuthorizedMqttService.clId,
        username: IS_PRODUCTION
          ? "public"
          : cookies.get(CookieKeys.ACCESS_TOKEN) ?? AuthorizedMqttService.clId,
        clientId: AuthorizedMqttService.clId,
        ...MqttAdditionalConfig,
      })
      AuthorizedMqttService.mqttCl.on("connect", function (params) {
        if (process.env.NODE_ENV !== "production") {
          console.log(params)
        }
      })
      AuthorizedMqttService.mqttCl.on("reconnect", function () {
        if (process.env.NODE_ENV !== "production") {
          console.log(
            `%cRegistered mqtt Reconnected1 ${new Date().toISOString()}`,
            "color:magenta;font-size:16px;"
          )
        }
        // MessageService.send({ name: MessageNames.RECONNECT_EVENT });
      })
      AuthorizedMqttService.mqttCl.on("close", () => {
        if (process.env.NODE_ENV !== "production") {
          console.log(
            `%cRegistered mqtt disconnected1 ${new Date().toISOString()}`,
            "color:red;font-size:12px;"
          )
        }
      })

      AuthorizedMqttService.mqttCl.on("message", function (topic, message) {
        // show received message
        const string = AuthorizedMqttService.Encoder.decode(message)
      })
    } else if (updatedToken) {
      AuthorizedMqttService.mqttCl.end(true)
      //@ts-ignore
      delete AuthorizedMqttService.mqttCl
      //@ts-ignore
      delete AuthorizedMqttService.instance
      AuthorizedMqttService.instance = new AuthorizedMqttService()
      AuthorizedMqttService.cipher = mqttCipher("ubSalt")
      AuthorizedMqttService.clId = AuthorizedMqttService.cipher(
        "mqttjs_" + Math.random().toString(16).substr(2, 8)
      )
      AuthorizedMqttService.mqttCl = mqttConnect(mqttServer, {
        password: AuthorizedMqttService.clId,
        username: updatedToken,
        clientId: AuthorizedMqttService.clId,
        ...MqttAdditionalConfig,
      })
      AuthorizedMqttService.mqttCl.on("connect", function (params) {
        clearInterval(connectionTestTimer)
        connectionTestTimer = setInterval(() => {
          AuthorizedMqttService.mqttCl.publish("/testing", "connectionCheck")
        }, 5000)

        if (process.env.NODE_ENV !== "production") {
          console.log(params)
        }
      })
      AuthorizedMqttService.mqttCl.on("reconnect", function () {
        if (process.env.NODE_ENV !== "production") {
          console.log(
            `%cRegistered mqtt Reconnected2 ${new Date().toISOString()}`,
            "color:magenta;font-size:18px;"
          )
        }
        // MessageService.send({ name: MessageNames.RECONNECT_EVENT });
      })
      AuthorizedMqttService.mqttCl.on("close", () => {
        if (process.env.NODE_ENV !== "production") {
          console.log(
            `%cRegistered mqtt disconnected2 ${new Date().toISOString()}`,
            "color:red;font-size:12px;"
          )
        }
      })

      AuthorizedMqttService.mqttCl.on("message", function (topic, message) {
        // show received message
        const string = AuthorizedMqttService.Encoder.decode(message)
      })
    }
    return AuthorizedMqttService.instance
  }

  public ConnectToSubject(data: { subject: string }) {
    const { subject } = data
    if (process.env.NODE_ENV !== "production") {
      console.log("connecting to", subject)
    }
    data.subject !== undefined &&
      AuthorizedMqttService.mqttCl.subscribe(data.subject)
  }
  public DisconnectFromSubject(data: { subject: string }) {
    if (process.env.NODE_ENV !== "production") {
      console.log("disConnecting", data)
    }
    AuthorizedMqttService.mqttCl.unsubscribe(data.subject)
  }
  public ConnectToNewSubject(data: { oldsubject: string; newSubject: string }) {
    const { newSubject, oldsubject } = data
    if (process.env.NODE_ENV !== "production") {
      console.log("connecting to", newSubject)
      console.log("disconnecting from", oldsubject)
    }
    AuthorizedMqttService.mqttCl.unsubscribe(oldsubject).subscribe(newSubject)
  }
}

export const authorizedMqttService = AuthorizedMqttService.getInstance()
