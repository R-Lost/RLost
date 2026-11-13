import {useEffect, useMemo, useRef, useState} from "react";
import { getGenerativeModel } from "firebase/ai";
import { ai } from "../firebase";
import { useNavigate, useSearchParams } from "react-router";
import { animIn } from "../utils/animText.ts";
import styles from "./WaitingAI.module.css";

const GeminiModel = "gemini-3.5-flash-lite";

const model = getGenerativeModel(ai, {
    model: GeminiModel,
});

function WaitingAI() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const [keywords, setKeywords] = useState<string | null>(null);
    const navigate = useNavigate();
    const pageTitleRef = useRef<HTMLHeadingElement>(null);
    const [keywordsDisplayed, setKeywordsDisplayed] = useState<string[]>([]);

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

    useEffect(() => {
        if (pageTitleRef.current)
            animIn(pageTitleRef.current, 400, 0.8)
    }, [])

    const keywordList = useMemo(() => keywords
            ? keywords.split(",").map((keyword) => keyword.trim()).filter(Boolean)
            : [],
        [keywords]
    )

    useEffect(() => {
        if (keywordList.length === 0)
            return;

        function continueNextPage() {
            const text = keywordList.join(",").trim();
            navigate("/found?" + new URLSearchParams({ q: text }).toString());
        }

        if (keywordsDisplayed.length < keywordList.length) {
            const timer = setTimeout(() => setKeywordsDisplayed(prev => [...prev, keywordList[prev.length]]), 100);
            return () => clearTimeout(timer);
        }

        const timer = setTimeout(continueNextPage, 2500);
        return () => clearTimeout(timer);
    }, [keywordList, keywordsDisplayed.length, navigate])

    if (!query) {
        return <h2>Error</h2>;
    }

    function keywordRef(elem: HTMLLIElement | null) {
        if (elem && !elem.dataset.shown){
            elem.dataset.shown = "true";
            animIn(elem, 400, 0.8);
        }
    }

    return (
        <div className={styles.parent}>
            <span className={styles.pageTitle} ref={pageTitleRef}>Searching R'Lost database for</span>
            <ul className={styles.keywordList}>
                {keywordsDisplayed.map((word) => <li key={word} ref={keywordRef}>{word}</li>)}
            </ul>
        </div>
    );
}

export default WaitingAI;
