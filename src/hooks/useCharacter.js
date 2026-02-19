import { useEffect, useState } from "react";
import { fetchCharacter, fetchCombosByCharacter } from "../api";

export default function useCharacter(id) {
  const [data, setData] = useState(null);
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");

        const character = await fetchCharacter(id);
        const combosData = await fetchCombosByCharacter(id);

        setData(character);
        setCombos(combosData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) load();
  }, [id]);

  return { data, combos, loading, error };
}
