import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getGenerativeModel } from "firebase/ai";
import { searchLostItems, type SearchLostItemsData } from "@dataconnect/generated";
import { ai, dataConnect } from "../firebase";

// Create model
const model = getGenerativeModel(ai, { model: "gemini-3.5-flash-lite" });

const categories = [
    "Electronics",
    "Clothing",
    "Accessories",
    "Documents",
    "Other",
];

type LostItem = SearchLostItemsData["items"][number];

function normalize(value: string) {
    return value.toLowerCase().trim();
}

function getKeywords(text: string) {
    return text
        .split(",")
        .map((keyword) => normalize(keyword))
        .filter(Boolean);
}

function WaitingAI() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get("q")
    const [keywords, setKeywords] = useState<string | null>(null);

    useEffect(() => {
        if (!query) {
            return;
        }
        let ignore = false;
        async function run() {
            // Prompt
            const prompt = "This is a lost and found website. The user is searching for a lost item. The item is a " + query + ". We need to search the database, give 5-15 keywords to search the database for. Reply with only the keywords, separated by commas."

            const result = await model.generateContent(prompt);
            if (!ignore)
                setKeywords(result.response.text());
        }

        run();
        return () => {
            ignore = true;
        }
    }, [query]);

    if (!query){
        return <>
            <h2>Error</h2>
        </>
    }

    return <>
        <h2>Searching Database for "{query}"</h2>
        <h2>Searching under</h2>
        <h2>{keywords}</h2>
    </>
}

export default WaitingAI