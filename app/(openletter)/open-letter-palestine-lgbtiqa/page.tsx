const { AS_TOKEN } = process.env

// export const dynamic = "force-dynamic"

import { Client, Room, Event } from "simple-matrix-sdk"
import { SignLetter } from "./SignLetter"
import { Suspense } from "react"
import { getCacheTagFetch } from "lib/utils"

const BASE_URL = "https://matrix.radical.directory"
const ROOM_ID = "!aNyqgXhDKOZKyvYdHa:radical.directory"

async function getRoomMessagesIterator() {
  const fetcher = getCacheTagFetch(["openletter"], 300)

  const client = new Client(BASE_URL, AS_TOKEN!, {
    fetch: fetcher,
    params: {
      user_id: "@_relay_bot:radical.directory",
    },
  })
  const room = new Room(ROOM_ID, client)
  const messagesIterator = room.getMessagesAsyncGenerator("b", 100)()
  return messagesIterator
}

async function getLengthState() {
  const fetcher = getCacheTagFetch(["openletter"], 300)
  const client = new Client(BASE_URL, AS_TOKEN!, {
    fetch: fetcher,
    params: {
      user_id: "@_relay_bot:radical.directory",
    },
  })
  const room = new Room(ROOM_ID, client)
  const storedLength = await room.getStateEvent(
    "directory.radical.openletter.count"
  )
  console.log("storedLength", storedLength)
  return storedLength?.length
}

async function validateLengthState(length: number) {
  // const fetcher = getCacheTagFetch(["openletter"], 300)
  const client = new Client(BASE_URL, AS_TOKEN!, {
    fetch: fetch,
    params: {
      user_id: "@_relay_bot:radical.directory",
    },
  })
  const room = new Room(ROOM_ID, client)
  const storedLength = await room.getStateEvent(
    "directory.radical.openletter.count"
  )
  console.log("storedLength", storedLength, "real length", length)
  if (storedLength?.content?.length === length) return
  const resp = await room.sendStateEvent("directory.radical.openletter.count", {
    length,
  })
  console.log("resp", resp)
}

type Chunk = {
  type: string
  event_id: string
  content: { body: string; msgtype?: string; "m.relates_to"?: any }
}[] &
  Event[]

export default async function Letter() {
  const messagesIterator = await getRoomMessagesIterator()
  const length = await getLengthState()

  // 27 signatures = height of page
  // then grid of signatures?

  return (
    <>
      <h1 className="font-black text-3xl lg:text-5xl pb-4">
        No Pride in Genocide
      </h1>
      <h2 className="font-bold pb-6">
        LGBTIQA+ Workers, Advocates, and Community Members in Australia in
        Solidarity with Palestine
      </h2>
      <div className="flex items-center justify-between lg:hidden text-sm sm:text-base">
        <div className="sm:text-lg">
          <b>{length}</b> signatures
        </div>
        <a
          href="#sign"
          className="flex justify-center text-center px-4 py-1 my-4 border-black border-2 rounded font-bold bg-black text-pink-200 hover:bg-transparent hover:text-black">
          Add your signature
        </a>
      </div>
      <div className="flex flex-col gap-6 lg:flex-row text-sm sm:text-base">
        <div className="max-w-lg">
          <P>
            We, LGBTIQA+ workers, advocates, and community members across
            Australia, write this statement in solidarity with Palestinian
            people. We have been filled with grief and rage at the escalation of
            violence, the evidence of a{" "}
            <A href="https://www.ohchr.org/en/press-releases/2023/10/un-expert-warns-new-instance-mass-ethnic-cleansing-palestinians-calls#:~:text=GENEVA%20(14%20October%202023)%20–,Hamas%20and%20Israeli%20occupation%20forces">
              mass ethnic cleansing
            </A>{" "}
            event reminiscent of the 1948 Nakba, and the{" "}
            <A href="https://www.un.org/unispal/document/gaza-is-running-out-of-time-un-experts-warn-demanding-a-ceasefire-to-prevent-genocide/#:~:text=to%20prevent%20genocide-,Gaza%20is%20%27running%20out%20of%20time%27%20UN%20experts%20warn%2C,decimate%20the%20besieged%20Gaza%20strip.">
              acceleration of genocide
            </A>{" "}
            since October 7th, on the back of 75 years of settler-colonial
            oppression and dispossession.
          </P>
          <P>
            LGBTIQA+ liberation is inextricably connected to the liberation of
            all oppressed communities. There are{" "}
            <A href="https://www.instagram.com/queersinpalestine/">
              LGBTIQA+ Palestinians in Palestine
            </A>
            , in Australia, and in the diaspora worldwide. We reject the
            attempts of Israel and any other nation to frame the ongoing
            genocide of Palestinians as in any way liberatory to LGBTIQA+
            people. We add our voices to those of our LGBTIQA+ peers in{" "}
            <A href="https://www.instagram.com/p/CzI7uepM_Jt/?igshid=bm8zd2Jqanhvajdl&img_index=3">
              West Asia and North Africa
            </A>
            , and express our solidarity with the many LGBTIQA+ Jews leading{" "}
            <A href="https://www.tzedekcollective.com/statements/ceasefire-now-end-the-occupation-statement-from-jewish-collectives/">
              anti-zionist organising
            </A>{" "}
            in Australia and abroad.
          </P>
          <P>
            We affirm Palestinian peoples’ sovereignty and inalienable right to
            self-determination, as well as the right of all Palestinian refugees
            - including those in the Gaza Strip and the international diaspora -
            to return to their homelands across all of historic Palestine.
          </P>
          <P>
            We send our love, strength and solidarity to all Palestinians, and
            in particular our LGBTIQA+ siblings in Palestine. We are horrified
            to see{" "}
            <A href="https://www.middleeasteye.net/news/israel-palestine-war-soldier-rainbow-flag-gaza-condemned-pinkwashing-textbook">
              LGBTIQA+ zionists
            </A>{" "}
            actively participating in this current wave of colonial violence. We
            will not be silent or complicit in the face of violence that falsely
            claims to be in service of LGBTIQA+ community, while destroying the
            lives, loves, families and homelands of Palestinians.
          </P>
          <p>
            <b>
              As LGBTIQA+ workers, advocates, and community members across
              Australia, we:
            </b>
          </p>
          <ul className="list-disc list-outside pl-6">
            <Li>
              Publicly join the international call for a permanent ceasefire, an
              end to the occupation, and accountability for all breaches of
              international law and humanitarian standards. This can look like
              attending protests, signing petitions and letters, sharing
              Palestinian voices on social media - get creative!
            </Li>
            <Li>
              Refuse to be complicit in{" "}
              <A href="https://bdsmovement.net/pinkwashing">pinkwashing</A>, and
              will resist the weaponisation of LGBTIQA+ people in Islamophobic
              and zionist propaganda, wherever we see it.
            </Li>
            <Li>
              Leverage our memberships and connections with organisations,
              including those who claim to represent LGBTIQA+ communities, and
              ask them to{" "}
              <A href="https://www.instagram.com/p/Cz4jdmfhO4W/?img_index=5">
                speak out in solidarity with Palestine
              </A>
              .
            </Li>
            <Li>
              Put our solidarity into action:{" "}
              <A href="https://docs.google.com/forms/d/e/1FAIpQLScSdi15a3zCeSvNfTpCIbDvx-Clj_2bMpIYXDU7aaf-h_0yFA/viewform?mibextid=Zxz2cZ&fbclid=IwAR3S-llUK7oDRWk2Jt4S5od3WkcFVbVtcGG77xVa0yKEl1zxWy50vp6cmnQ">
                rank and file union members across Australia
              </A>{" "}
              have responded to the call from Palestinian unions to demand an
              end to genocide in Palestine. As LGBTIQA+ workers we can play a
              crucial role in organising in solidarity with Palestine.
            </Li>
            <Li>
              Refuse to be financially complicit in genocide, and join the
              collective economic action of the{" "}
              <A href="https://bdsmovement.net/call">
                Boycott, Divestment and Sanctions movement
              </A>
              .
            </Li>
          </ul>
          <P>
            We situate this letter within a greater framework of anti-racism and
            continue to stand against anti-Palestinian racism, Islamophobia, and
            antisemitism in all their forms.
          </P>
          <P>
            We write this as Indigenous and non-Indigenous people in solidarity
            with all Aboriginal and Torres Strait Islander decolonial movements,
            and all Indigenous decolonial movements globally. We understand that
            all struggles against all oppressions are inherently linked, and
            that the Palestinian struggle is a decolonial struggle.
          </P>
          <P>
            This statement was written on the unceded land of the Wurundjeri
            Peoples of the Kulin Nation, and we pay our deep respects to their
            Elders past and present.
          </P>
          <a
            href="#sign"
            className="hidden lg:flex justify-center text-center px-4 py-1 my-4 border-black border-2 rounded font-bold bg-black text-pink-200 hover:bg-transparent hover:text-black">
            Add your signature
          </a>
        </div>
        <div className="my-4 flex flex-col" id="sign">
          <div className="pb-4 text-lg self-center">
            <b>{length}</b> signatures
          </div>
          <SignLetter />

          <ul className="p-4 text-sm self-center gap-2 gap-x-4 justify-center flex flex-wrap max-w-xl lg:w-60 sm:pl-16 lg:pl-0 lg:p-0 lg:pt-4">
            <Signatories end="" messagesIterator={messagesIterator} />
          </ul>
        </div>
      </div>
    </>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="my-4">{children}</p>
}

function Li({ children }: { children: React.ReactNode }) {
  return <li className="my-4">{children}</li>
}

function A({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a className="underline" href={href}>
      {children}
    </a>
  )
}

function Signatory({
  name,
  work,
  location,
}: {
  name: string
  work: string
  location: string
}) {
  return (
    <li className="pb-2 flex flex-col items-start gap-1 w-56">
      <span className="">{name}</span>
      <div className="">
        <span className="italic opacity-60">
          {work.trim() !== "" && `${work} • `}
        </span>
        <span className="italic opacity-60">{location}</span>
      </div>
    </li>
  )
}

async function Signatories({
  end,
  messagesIterator,
  length,
  messages,
}: {
  end: string
  messagesIterator: AsyncGenerator
  length?: number
  messages?: Event[]
}) {
  //recursive component for fetching and rendering paginated signatories
  const response = await messagesIterator.next(end)
  const { value } = response
  if (!value) return []

  console.log("\nreceived messages", messages?.length)

  const messagesToCheck = [...(messages || []), ...value.chunk]

  // console.log(
  //   "messagesToCheck",
  //   messagesToCheck.map(msg => msg.type)
  // )

  console.log("messagesToCheck", messagesToCheck.length)

  const combinedReactions = getReactions(messagesToCheck)
  const signatories = messagesToSignatories(messagesToCheck, combinedReactions)
  // don't include messages that have already been rendered
  const remainingMessages = messagesToCheck.filter(
    message => !signatories.find(signatory => signatory.id === message.event_id)
  )

  // console.log("remainingMessages", remainingMessages)

  const newLength = (length || 0) + signatories.length

  if (value.end.includes("t1-")) {
    const meri = signatories.pop()
    meri && signatories.splice(signatories.length - 5, 0, meri)

    // check if length state key exists and is equal to signatories length
    validateLengthState(newLength)
  }

  console.log("length", newLength)

  return (
    <>
      {signatories.map((signatory, i) => (
        <Signatory key={i} {...signatory} />
      ))}
      <Suspense fallback={<div>loading...</div>}>
        <Signatories
          end={value.end}
          messagesIterator={messagesIterator}
          length={newLength}
          messages={remainingMessages}
        />
      </Suspense>
    </>
  )
}

function getReactions(chunk: Chunk) {
  return chunk
    .filter(
      message =>
        message?.type === "m.reaction" &&
        ((message?.content && message.content["m.relates_to"]?.key == "👍️") ||
          "👍")
    )
    .map(
      message => message?.content && message.content["m.relates_to"]?.event_id
    )
    .filter((event_id: string) => !!event_id)
}

function messagesToSignatories(chunk: Chunk, reactions: string[]) {
  const messages = chunk.filter(message => message.type === "m.room.message")

  return messages
    .filter(message => reactions?.includes(message.event_id))
    .filter(
      message =>
        message?.content?.body?.includes("name:") &&
        message.content.body?.includes("\nwork:") &&
        message.content.body?.includes("\nlocation:")
    )
    .map(message => ({
      tuple: message?.content?.body
        ?.split("\n")
        .flatMap((line: string) => line.split(":")),
      id: message.event_id,
    }))
    .map(({ tuple: [_name, name, _work, work, _location, location], id }) => ({
      name,
      work,
      location,
      id,
    }))
}
