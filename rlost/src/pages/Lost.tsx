import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { createItem, upsertUser } from "@dataconnect/generated";
import { auth, dataConnect } from "../firebase";
import { locations } from "../data/locations";
import styles from "./Lost.module.css";

function Lost() {
    const [searchParams] = useSearchParams();
    const itemNameFromSearch = searchParams.get("itemName")?.trim() ?? "";
    const descriptionFromSearch = searchParams.get("description")?.trim() ?? "";
    const [itemName, setItemName] = useState(itemNameFromSearch);
    const [description, setDescription] = useState(descriptionFromSearch);
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [notifications, setNotifications] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [trackingEnabled, setTrackingEnabled] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    async function enableBrowserNotifications() {
        if (!("Notification" in window) || Notification.permission === "granted") return;
        if (Notification.permission !== "denied") {
            await Notification.requestPermission();
        }
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            if (!currentUser) {
                setError("Please sign in before reporting a lost item.");
                return;
            }

            let imageURL: string | null = null;
            if (imageFile) {
                const reader = new FileReader();
                reader.readAsDataURL(imageFile);
                await new Promise((resolve) => {
                    reader.onload = resolve;
                });
                imageURL = String(reader.result);
            }

            await upsertUser(dataConnect, {
                username: currentUser.displayName || "",
                email: currentUser.email || "",
                photoUrl: currentUser.photoURL || null,
            });

            await createItem(dataConnect, {
                itemName,
                description,
                location,
                imageLink: imageURL,
                category,
                lostStatus: true,
            });

            if (notifications) {
                await enableBrowserNotifications();
                localStorage.setItem("rlost.notifications", "enabled");
            } else {
                localStorage.removeItem("rlost.notifications");
            }

            setTrackingEnabled(true);
        } catch (submitError) {
            console.error("Lost-item report failed:", submitError);
            setError("We couldn't create the report. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    if (trackingEnabled) {
        return (
            <section className={styles.container}>
                <div className={styles.success}>
                    <h2>Lost item report created</h2>
                    <p>
                        We will track <strong>{itemName}</strong> and check it against newly reported found items.
                    </p>
                    {notifications && (
                        <p>Notification preference enabled.</p>
                    )}
                    <button type="button" onClick={() => setTrackingEnabled(false)}>
                        Report another item
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.container}>
            <h2>Report your lost item</h2>
            <p>These details will help match your item with found-item reports.</p>
            {authLoading ? (
                <p>Checking sign-in status...</p>
            ) : !currentUser ? (
                <p className={styles.error}>Please sign in using the navigation bar before reporting a lost item.</p>
            ) : null}

            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    Item name
                    <input
                        type="text"
                        value={itemName}
                        onChange={(event) => setItemName(event.target.value)}
                        placeholder="Example: Black backpack"
                        required
                    />
                </label>

                <label>
                    Description
                    <textarea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Brand, color, distinguishing details..."
                        required
                    />
                </label>

                <label>
                    Where was it lost?
                    <select
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        required
                    >
                        <option value="" disabled>Select a location</option>
                        {locations.map((itemLocation) => (
                            <option key={itemLocation} value={itemLocation}>{itemLocation}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Category
                    <select
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        required
                    >
                        <option value="" disabled>Select a category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Documents">Documents</option>
                        <option value="Other">Other</option>
                    </select>
                </label>

                <label>
                    Photo
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
                    />
                </label>

                <label className={styles.checkbox}>
                    <input
                        type="checkbox"
                        checked={notifications}
                        onChange={(event) => setNotifications(event.target.checked)}
                    />
                    Notify me when a matching found item is reported
                </label>

                {error && <p className={styles.error}>{error}</p>}

                <button type="submit" disabled={submitting || authLoading || !currentUser}>
                    {submitting
                        ? "Creating report..."
                        : authLoading
                            ? "Checking sign-in..."
                            : "Create lost-item report"}
                </button>
            </form>
        </section>
    );
}

export default Lost;