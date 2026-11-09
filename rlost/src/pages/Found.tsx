import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { searchLostItems, type SearchLostItemsData } from "@dataconnect/generated";
import { dataConnect } from "../firebase";
import { FoundItemForm } from "../components/FoundForm";
import { locations } from "../data/locations";
import styles from "./LostSearchResults.module.css";

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

function scoreItem(item: LostItem, keywords: string[]) {
    const searchableText = normalize([
        item.itemName,
        item.description ?? "",
        item.location ?? "",
        item.category ?? "",
    ].join(" "));

    return keywords.reduce(
        (score, keyword) =>
            score + (searchableText.includes(normalize(keyword)) ? 1 : 0),
        0,
    );
}

function LostSearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q")?.trim() ?? "";
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [results, setResults] = useState<LostItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;

        async function runSearch() {
            setLoading(true);
            setError(null);

            try {
                const variables = {
                    ...(location ? { location } : {}),
                    ...(category ? { category } : {}),
                };
                const response = await searchLostItems(dataConnect, variables);
                const keywords = query
                    .split(",")
                    .map((keyword) => keyword.trim())
                    .filter(Boolean);
                const rankedItems = response.data.items
                    .map((item) => ({
                        item,
                        score: scoreItem(item, keywords),
                    }))
                    .filter(({ score }) => score > 0)
                    .sort((left, right) => right.score - left.score)
                    .map(({ item }) => item);

                if (!ignore) {
                    setResults(rankedItems);
                }
            } catch (searchError) {
                console.error("Lost-item search failed:", searchError);
                if (!ignore) {
                    setError("Unable to search for lost items.");
                    setResults([]);
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        void runSearch();
        return () => {
            ignore = true;
        };
    }, [category, location, query]);

    if (!query) {
        return null;
    }

    return (
        <section className={styles.container}>
            <h2>Search Results</h2>
            <p>Searching under: {query}</p>

            <form className={styles.filters}>
                <label>
                    Location
                    <select value={location} onChange={(event) => setLocation(event.target.value)}>
                        <option value="">All locations</option>
                        {locations.map((itemLocation) => (
                            <option key={itemLocation} value={itemLocation}>
                                {itemLocation}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Category
                    <select value={category} onChange={(event) => setCategory(event.target.value)}>
                        <option value="">All categories</option>
                        {categories.map((itemCategory) => (
                            <option key={itemCategory} value={itemCategory}>
                                {itemCategory}
                            </option>
                        ))}
                    </select>
                </label>
            </form>

            {loading && <p>Searching...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && results.length === 0 && (
                <p>No matching lost items were found.</p>
            )}

            <div className={styles.results}>
                {results.map((item) => (
                    <article className={styles.item} key={item.id}>
                        <h3>{item.itemName}</h3>
                        {item.description && <p><strong>Description:</strong> {item.description}</p>}
                        {item.location && <p><strong>Location:</strong> {item.location}</p>}
                        {item.category && <p><strong>Category:</strong> {item.category}</p>}
                        {item.imageLink && (
                            <img className={styles.image} src={item.imageLink} alt={item.itemName} />
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}

function Found() {
    return <>
        <h2>Found Page</h2>
        <LostSearchResults />
        <FoundItemForm />
    </>
}

export default Found