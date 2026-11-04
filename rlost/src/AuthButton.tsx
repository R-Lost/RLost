import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, dataConnect } from "./firebase";
import { upsertUser } from "@dataconnect/generated";

export function AuthButton(){
    const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await upsertUser(dataConnect, {
                id: user.uid,
                username: user.displayName || "",
                email: user.email || "",
                photoUrl: user.photoURL || ""
            });
        } catch (error) {
            console.error("Error signing in with Google:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleSignOut = async () => {
        await signOut(auth);
    };
    // figure out how i want it to look pretty
    if (currentUser) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {currentUser.photoURL && (
          <img
            src={currentUser.photoURL}
            alt="Profile"
            style={{ width: "32px", height: "32px", borderRadius: "50%" }}
          />
        )}
        <span>{currentUser.displayName}</span>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    );
  }

  return (
    <button onClick={handleGoogleSignIn} disabled={loading}>
      {loading ? "Signing in..." : "Sign in with Google"}
    </button>
  );
}