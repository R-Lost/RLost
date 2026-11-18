import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { searchFoundItems, type SearchFoundItemsData } from "@dataconnect/generated";
import { dataConnect } from "../firebase";
import { locations } from "../data/locations";
import styles from "./LostSearchResults.module.css";

const categories = ["Electronics", "Clothing", "Accessories", "Documents", "Other"];

type FoundItem = SearchFoundItemsData["items"][number];

function normalize(value: string) {
    return value.toLowerCase().trim();
}

function scoreItem(item: FoundItem, keywords: string[]) {
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

function SearchResults() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get("q")?.trim() ?? "";
    const originalQuery = searchParams.get("original")?.trim() ?? query;
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [results, setResults] = useState<FoundItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [claimItemId, setClaimItemId] = useState<string | null>(null);

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
                const response = await searchFoundItems(dataConnect, variables);
                const keywords = query
                    .split(",")
                    .map((keyword) => keyword.trim())
                    .filter(Boolean);
                const rankedItems = response.data.items
                    .map((item) => ({ item, score: scoreItem(item, keywords) }))
                    .filter(({ score }) => score > 0)
                    .sort((left, right) => right.score - left.score)
                    .map(({ item }) => item);

                if (!ignore) setResults(rankedItems);
            } catch (searchError) {
                console.error("Found-item search failed:", searchError);
                if (!ignore) {
                    setError("Unable to search for found items.");
                    setResults([]);
                }
            } finally {
                if (!ignore) setLoading(false);
            }
        }

        if (query) void runSearch();
        return () => { ignore = true; };
    }, [category, location, query]);

    const reportParams = useMemo(
        () => new URLSearchParams({ description: originalQuery }),
        [originalQuery],
    );

    if (!query) {
        return (
            <section className={styles.container}>
                <h2>Describe your lost item</h2>
                <p>Use the search bar above to begin.</p>
            </section>
        );
    }

    return (
        <section className={styles.container}>
            <h2>Found-item matches</h2>
            <p>Searching for: {originalQuery}</p>

            <form className={styles.filters} onSubmit={(event) => event.preventDefault()}>
                <label>
                    Location
                    <select value={location} onChange={(event) => setLocation(event.target.value)}>
                        <option value="">All locations</option>
                        {locations.map((itemLocation) => (
                            <option key={itemLocation} value={itemLocation}>{itemLocation}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Category
                    <select value={category} onChange={(event) => setCategory(event.target.value)}>
                        <option value="">All categories</option>
                        {categories.map((itemCategory) => (
                            <option key={itemCategory} value={itemCategory}>{itemCategory}</option>
                        ))}
                    </select>
                </label>
            </form>

            {loading && <p>Searching...</p>}
            {error && <p className={styles.error}>{error}</p>}

            {!loading && !error && results.length === 0 && (
                <div className={styles.noResults}>
                    <h3>No matches found</h3>
                    <p>Report this item lost to track it and get notified if a matching item is found.</p>
                    <button type="button" onClick={() => navigate(`/lost/report?${reportParams}`)}>
                        Report my lost item
                    </button>
                </div>
            )}

            <div className={styles.results}>
                {results.map((item) => (
                    <article className={styles.item} key={item.id}>
                        <h3>{item.itemName}</h3>
                        {item.description && <p><strong>Description:</strong> {item.description}</p>}
                        {item.location && <p><strong>Found near:</strong> {item.location}</p>}
                        {item.category && <p><strong>Category:</strong> {item.category}</p>}
                        {item.locationTurnedIn && (
                            <p><strong>Turned in at:</strong> {item.locationTurnedIn}</p>
                        )}
                        {item.imageLink && (
                            <img className={styles.image} src={item.imageLink} alt={item.itemName} />
                        )}
                        <button type="button" onClick={() => setClaimItemId(
                            claimItemId === item.id ? null : item.id,
                        )}>
                            {claimItemId === item.id ? "Hide claim instructions" : "View claim instructions"}
                        </button>
                        {claimItemId === item.id && (
                            <div className={styles.claimInstructions}>
                                <strong>How to claim this item</strong>
                                <p>
                                    Contact or visit{" "}
                                    {item.locationTurnedIn
                                        ? item.locationTurnedIn
                                        : "the location listed above"}.
                                    Bring identification and be ready to describe the item.
                                </p>
                            </div>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}

export default SearchResults;
