const { AS_TOKEN } = process.env

export const dynamic = "force-dynamic"

import { Client, Room } from "simple-matrix-sdk"
import { Form } from "./Form"
import { revalidateTag } from "next/cache"

const BASE_URL = "https://matrix.radical.directory"
const ROOM_ID = "!aNyqgXhDKOZKyvYdHa:radical.directory"
// const OPEN_LETTER_USERID = "@openletter:radical.directory"

async function sendSignatory(name: string, work: string, location: string) {
  "use server"
  const client = new Client(BASE_URL, AS_TOKEN!, {
    fetch,
    params: {
      user_id: "@_relay_bot:radical.directory",
    },
  })
  const room = new Room(ROOM_ID, client)
  const content = {
    body: `name: ${name}\nwork: ${work}\nlocation: ${location}`,
    msgtype: "m.text",
  }
  await room.sendMessage(content)
  const storedLength = await room.getStateEvent(
    "directory.radical.openletter.count"
  )
  const newLength = parseInt(storedLength?.length || "0") + 1
  // console.log("storedLength", storedLength, "newLength", newLength)
  const resp = await room.sendStateEvent("directory.radical.openletter.count", {
    length: newLength,
  })
  // console.log("resp", resp)
  revalidateTag("openletter")
}

export async function SignLetter() {
  return (
    <div className="lg:w-60 p-4 lg:p-0 flex flex-col">
      <Form sendSignatory={sendSignatory} />
    </div>
  )
}
