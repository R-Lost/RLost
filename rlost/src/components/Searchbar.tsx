import styles from "./Searchbar.module.css";
import {useNavigate} from "react-router";
import {useRef} from "react";

const Searchbar = () => {
    const nav = useNavigate();
    const searchBox = useRef<HTMLInputElement>(null);

    function submitted(formData: FormData)
    {
        if (searchBox.current)
            searchBox.current.value = "";

        const text = String(formData.get('q') ?? '').trim();
        if (text === '') return;

        nav("/loading?" + new URLSearchParams({ q: text }).toString())
    }

    return (
        <div className={styles.parent}>
            <form action={submitted} className={styles.searchbar}>
                <label htmlFor="search">Lost an item on campus? </label>
                <input ref={searchBox} className={styles.textBox} id="search" type="search" name="q" />
                <button className={styles.searchButton} type="submit">Search with AI</button>
            </form>
        </div>
    )
}

export default Searchbar;