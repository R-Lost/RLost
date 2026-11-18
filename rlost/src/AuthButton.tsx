import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, dataConnect } from "./firebase";
import { upsertUser } from "@dataconnect/generated";

interface AuthButtonProps {
  className?: string;
}
export function AuthButton({ className }: AuthButtonProps){
    const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            if (user) {
              try {
                upsertUser(dataConnect, {
                username: user.displayName || "",
                email: user.email || "",
                photoUrl: user.photoURL || ""
            });
              } catch (error) {
                console.error("Error upserting user:", error);
              }
            }
        });
        return () => unsubscribe();
    }, []);
    const handleGoogleSignIn = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
        } catch (error) {
            console.error("Error signing in with Google:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleSignOut = async () => {
        await signOut(auth);
    };
    if (currentUser) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {currentUser.photoURL && (
          <img
            src={currentUser.photoURL}
            alt="Profile"
            referrerPolicy="no-referrer"
            style={{ width: "32px", height: "32px", borderRadius: "50%" }}
          />
        )}
        <span>{currentUser.displayName}</span>
        <button onClick={handleSignOut} className = {className}>Sign Out</button>
      </div>
    );
  }

  return (
    <button onClick={handleGoogleSignIn} disabled={loading} className = {className}>
      {loading ? "Signing in..." : "Sign in with Google"}
    </button>
  );
}