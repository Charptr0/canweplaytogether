import axios from "axios";

export async function getCompatibleGames(urls: string[]) {
    if (urls.length === 0) throw new Error("The URLs array cannot be empty");

    const queries = "";

    try {
        const res = await axios.get(`http://localhost:4000/get-games/${queries}`);

        const body = res.data;

        console.log(body);

    } catch (err) {
        console.error(err);
        throw err;
    }
}