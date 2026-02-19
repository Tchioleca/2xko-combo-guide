import { useEffect, useState } from 'react'
import { fetchCombo } from '../api'

export default function useCombo(id) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    let mounted = true
    fetchCombo(id)
      .then(d => { if (mounted) setData(d) })
      .catch(e => { if (mounted) setError(e.message) })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [id])

  return { data, loading, error }
}
