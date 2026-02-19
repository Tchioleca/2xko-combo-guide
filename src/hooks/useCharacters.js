import { useEffect, useState } from 'react'
import { fetchCharacters } from '../api'

export default function useCharacters() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    fetchCharacters()
      .then(d => { if (mounted) setData(d) })
      .catch(e => { if (mounted) setError(e.message) })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])

  return { data, loading, error }
}
