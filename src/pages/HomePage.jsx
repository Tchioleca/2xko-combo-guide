import { Link } from 'react-router-dom'
import useCharacters from '../hooks/useCharacters'
import './HomePage.css'

const dariusImg = 'https://res.cloudinary.com/dywiabwjp/image/upload/v1771488012/Darius_xmveud.png'

function getCharacterImage(character) {
	if (character.name === 'Darius') return dariusImg
	return character.avatar
}

export default function HomePage() {
	const { data: characters, loading, error } = useCharacters()

	if (loading) return <div className="loading">Loading characters…</div>
	if (error) return <div className="error">Error: {error}</div>

	return (
		<div className="page">
			<h1 className="heading">2xko — Characters</h1>
			<div className="grid">
				{characters && characters.length ? characters.map(c => {
					const imgSrc = getCharacterImage(c)
					return (
						<Link key={c.id} to={`/characters/${c.id}`} className="card">
							<div className="avatar">
								{imgSrc ? <img src={imgSrc} alt={c.name} style={{maxHeight:64}}/> : <div>{c.name?.[0] ?? 'C'}</div>}
							</div>
							<div className="name">{c.name}</div>
						</Link>
					)
				}) : <div>No characters found</div>}
			</div>

      
		</div>
	)
}
