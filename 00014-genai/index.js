import { ChatGroq } from "@langchain/groq"
import dotenv from "dotenv"
import rl from "readline/promises"
import { tool, createAgent } from "langchain"
import * as z from "zod"
import { StateGraph, START, END } from "@langchain/langgraph"

dotenv.config()

/** to read input from the terminal
 
  const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
})

const userInput = await readline.question("Enter your input: ")

console.log(userInput)

readline.close()
 */

/* to give prompt to ai

const model = new ChatGroq({
    model : "openai/gpt-oss-120b",
    apiKey : process.env.GROQ_API_KEY,
})

const response = await model.invoke("hello,how r u?")

console.log(response);
*/


const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
})

const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.GROQ_API_KEY,
})

/*

without stramline response

while(true){
    const userInput = await readline.question("Enter your Input: ");

    const response = await model.invoke(userInput)

    console.log(response.content)

}

*/


/*

stream line response

while(true){
    const userInput = await readline.question("Enter your Input: ");

    const stream = await model.stream(
        [
            {
                role : "user",
                content: userInput
            }
        ])

    for await (const chunk of stream){
        process.stdout.write(chunk.content)
    }

    process.stdout.write("\n");
}
*/


/* //LLM memory 

const messages = []

while(true){
    const userInput = await readline.question("Enter your Input: ");

    messages.push({
        role: "user",
        content : userInput
    }) 

    const stream = await model.stream(messages)

 let aiMessage = ""

    for await (const chunk of stream){
        aiMessage += chunk.content
        process.stdout.write(chunk.content)
    }

    messages.push({
        role: "assistant",
        content: aiMessage
    })

    process.stdout.write("\n");
}

*/

// using tool

const events = []

const createEventTool = tool(
    async function ({ date, title, description }) {

        console.log("Creating event:", { date, title, description })

        events.push({
            date,
            title,
            description
        })
        return "Event created"
    },
    {
        name: "createEvent",
        description: "Creates a new event with a date, title, and description",
        schema: z.object({
            date: z.string(),
            title: z.string(),
            description: z.string()
        })
    }
)

const getEventsTool = tool(
    async function ({ }) {
        console.log("Retrieving events:", events)
        return events
    },
    {
        name: "getEvents",
        description: "Retrieves all events",
        schema: z.object({})
    })

/*

// ai calls tool with the help of langchain createAgent

const agent = createAgent({
    model,
    tools: [createEventTool, getEventsTool]
})


while (true) {
    const userInput = await readline.question("Enter your input: ")

    const stream = await agent.stream({
        messages: [
            {
                role: "user",
                content: userInput
            },
        ]
    }, { streamMode: "messages" })
    for await (const [chunk] of stream) {
        process.stdout.write(chunk.content)
    }
    process.stdout.write("\n")
}

*/

// –––––––––––––––– LLM Node –––––––––––––––– 

async function LLMNode(state) {
    console.log("LLMNode state:", state)
    return {
        messages: [
            ...state.messages,
            {
                role: "assistant",
                content: "Hello, user!"
            }
        ]
    }
}
const graph = new StateGraph(
    z.object({
        messages: z.array(z.any())
    }))
    .addNode("LLMNode", LLMNode)
    .addEdge(START, "LLMNode")
    .addEdge("LLMNode", END)
    .compile()



const graphResult = await graph.invoke({
    messages: [
        {
            role: "user",
            content: "Hello, world!"
        }
    ]
})

console.log("Graph result:", graphResult)