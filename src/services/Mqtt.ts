import { connect as mqttConnect, MqttClient } from "mqtt"
import {
  MqttAdditionalConfig,
  mqttPassword,
  mqttServer,
  MqttTopics,
  mqttUserName,
} from "./constants"
import { CnsQueueMessageService } from "./message_service"

/**
 * It takes a string and a salt, and returns a string of hexadecimal numbers
 * @param {string} salt - The salt is a random string that is used to encrypt the message.
 * @returns A function that takes a string and returns a string.
 */
export const mqttCipher = (salt: string) => {
  let textToChars = (text: string) => text.split("").map((c) => c.charCodeAt(0))
  let byteHex = (n: number | Array<number>) =>
    ("0" + Number(n).toString(16)).substr(-2)
  let applySaltToChar = (code: any) =>
    textToChars(salt).reduce((a: number, b: number) => a ^ b, code)

  return (text: string) =>
    text.split("").map(textToChars).map(applySaltToChar).map(byteHex).join("")
}

/* The MqttService class is a singleton class that connects to the mqtt server and subscribes to the
topics that are needed */
export class MqttService {
  private static instance: MqttService
  private static mqttCl: MqttClient
  private static cipher: Function
  private static clId: string
  private static Encoder: TextDecoder

  private constructor() {
    MqttService.Encoder = new TextDecoder("utf-8")
  }

  /**
   * It creates a singleton instance of the MqttService class.
   */
  public static getInstance(): MqttService {
    if (!MqttService.instance) {
      MqttService.instance = new MqttService()
      MqttService.cipher = mqttCipher("ubSalt")
      MqttService.clId = MqttService.cipher(
        "mqttjs_" + Math.random().toString(16).substr(2, 8)
      )
      MqttService.mqttCl = mqttConnect(mqttServer, {
        password: mqttPassword,
        username: mqttUserName,
        clientId: MqttService.clId,
        ...MqttAdditionalConfig,
      })

      MqttService.mqttCl.on("connect", function (params) {
        if (process.env.NODE_ENV !== "production") {
          console.log(params)
        }
      })

      MqttService.mqttCl.on("message", function (topic: string, message) {
        const string = MqttService.Encoder.decode(message)
        if (topic.includes(MqttTopics.CnsQueue)) {
          CnsQueueMessageService.send({
            name: topic,
            payload: JSON.parse(string),
          })
        }
      })
    }
    return MqttService.instance
  }

  /**
   * It returns the MqttService.mqttCl object.
   * @returns The MQTT client object.
   */
  public GetSubscriptions() {
    return MqttService.mqttCl
  }

  /**
   * Subscribe to a subject
   * @param data - { subject: string }
   */
  public ConnectToSubject(data: { subject: string }) {
    MqttService.mqttCl.subscribe(data.subject)
  }

  /**
   * It unsubscribes from the subject.
   * @param data - { subject: string }
   */
  public DisconnectFromSubject(data: { subject: string }) {
    MqttService.mqttCl.unsubscribe(data.subject)
  }
}

export const mqttService = MqttService.getInstance()
