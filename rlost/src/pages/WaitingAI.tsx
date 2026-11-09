import { useEffect, useState } from "react";
import { getGenerativeModel } from "firebase/ai";
import { ai } from "../firebase";
import { useNavigate, useSearchParams } from "react-router";

const model = getGenerativeModel(ai, {
    model: "gemini-3.5-flash-lite",
});

function WaitingAI() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const [keywords, setKeywords] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!query) {
            return;
        }

        let ignore = false;

        async function run() {
            const prompt =
                "This is a lost and found website. The user is searching for a lost item. " +
                "The item is a " +
                query +
                ". We need to search the database, give 5-15 keywords to search " +
                "the database for. Reply with only the keywords, separated by commas.";

            const result = await model.generateContent(prompt);
            if (!ignore) {
                setKeywords(result.response.text());
            }
        }

        void run();

        return () => {
            ignore = true;
        };
    }, [query]);

    if (!query) {
        return <h2>Error</h2>;
    }

    const keywordList = keywords
        ? keywords.split(",").map((keyword) => keyword.trim()).filter(Boolean)
        : [];

    function continueNextPage() {
        const text = keywordList.join(",").trim();
        navigate("/found?" + new URLSearchParams({ q: text }).toString());
    }

    return (
        <>
            <h2>Generating Search Terms for "{query}"</h2>
            <h3>Searching under</h3>
            <ol>
                {keywordList.map((word) => <li key={word}>{word}</li>)}
            </ol>
            {keywordList.length > 0 && (
                <form action={continueNextPage}>
                    <button type="submit">Continue</button>
                </form>
            )}
        </>
    );
}

export default WaitingAI;
