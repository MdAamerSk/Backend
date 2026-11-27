import { PDFParse } from "pdf-parse";
import fs from "fs/promises"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { CohereEmbeddings } from "@langchain/cohere"
import "dotenv/config"
import { Pinecone } from '@pinecone-database/pinecone';

const parser = new PDFParse({
    data: await fs.readFile("story.pdf")
})

// –––––––––––––––––––––––––– Extract all the text from pdf file –––––––––––––––––––––––––

const text = (await parser.getText({pageJoiner: ""})).text

const textSplitter = new RecursiveCharacterTextSplitter({
     chunkSize: 500, 
     chunkOverlap: 100 
    })

// –––––––––––––––––––––––––– Split the text into chunks –––––––––––––––––––––––––

const chunks = await textSplitter.splitText(text)

// –––––––––––––––––––––––––– Initialize embeddings [embedding model] –––––––––––––––––––––––––

const embeddings = new CohereEmbeddings({
    model : "embed-v5.0-fast",
    apiKey: process.env.COHERE_API_KEY
})

// –––––––––––––––––––––––––– Embed the text chunks into vectors –––––––––––––––––––––––––
const vectors = await embeddings.embedDocuments(chunks)

// –––––––––––––––––––––––––– Initialize Pinecone client [database to store number vector from Cohere] –––––––––––––––––––––––––
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

const index = pc.Index({
    name: "cohort-rag",
    host: "https://cohort-rag-bj9d15k.svc.aped-4627-b74a.pinecone.io"
});

// Upsert = Update + Insert (if an ID already exists, overwrite it; otherwise, add it).

await index.documents.upsert({
    documents: vectors.map((vector, index) => {
        return {
            _id: `chunk-${index}`,  //Unique name (chunk-0, chunk-1, ...)
            embedding: vector, // The number vector from Cohere (for similarity search)
            content: chunks[ index ] //The original text chunk (so you can read/pass it to the LLM later during retrieval)
        }
    })
})