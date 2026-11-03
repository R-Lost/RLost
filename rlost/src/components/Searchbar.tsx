import styles from "./Searchbar.module.css";
import {useNavigate, useSearchParams} from "react-router";

const Searchbar = () => {
    const [searchParams] = useSearchParams();
    const nav = useNavigate();

    function submitted(formData: FormData)
    {
        const text = String(formData.get('q') ?? '').trim();
        if (text === '') return;

        nav("/loading?" + new URLSearchParams({ q: text }).toString())
    }

    return (
        <div className={styles.parent}>
            <form action={submitted} className={styles.searchbar}>
                <label htmlFor="search">Lost an item? </label>
                <input id="search" type="search" name="q" defaultValue={searchParams.get('q') ?? ''} />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default Searchbar;