"use client"

import { useState } from "react"

export default function HackLab() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [accessibility, setAccessibility] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div className="flex justify-center p-20">
      <div className="flex flex-col flex-1 w-full max-w-sm gap-2 p-4 border">
        <h1>sign up to the hacklab 🌸</h1>
        <p>next hacklab is at Catalyst Social Centre, 144 Sydney Rd Coburg</p>
        <p>6-9pm, 18th July 2023</p>
        <form
          onSubmit={async e => {
            e.preventDefault()
            console.log("submitting")
            setLoading(true)
            try {
              await fetch("/api/PostMatrixMessage", {
                method: "POST",
                body: JSON.stringify({
                  message: `New signup for July! \n \n name: ${name} \n email: ${email} \n accessibility: ${accessibility}`,
                }),
              })
            } catch (e) {
              setError(true)
            }
            setLoading(false)
            setSubmitted(true)
          }}
          className="flex flex-col">
          <label htmlFor="name">name</label>
          <input
            type="text"
            id="name"
            className="px-2 bg-white border dark:bg-black"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
            className="px-2 bg-white border dark:bg-black"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="accessibility">accessibility requirements</label>
          <input
            type="text"
            id="accessibility"
            className="px-2 bg-white border dark:bg-black"
            value={accessibility}
            onChange={e => setAccessibility(e.target.value)}
          />
          <button type="submit" className="self-center px-2 m-4 border">
            submit
          </button>
        </form>
        {loading && <p>loading...</p>}
        {submitted && <p>submitted! c u there 💗</p>}
        {error && (
          <p>error! 😅 maybe just email radicaldirectory@protonmail.com soz!</p>
        )}
      </div>
    </div>
  )
}
