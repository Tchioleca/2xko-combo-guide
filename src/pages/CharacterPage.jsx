import { Link, useParams } from 'react-router-dom'
import useCharacter from '../hooks/useCharacter'
import './CharacterPage.css'

const dariusImg = 'https://res.cloudinary.com/dywiabwjp/image/upload/v1771488012/Darius_xmveud.png'

function getCharacterImage(character) {
  if (character.name === 'Darius') return dariusImg
  return character.avatar
}

export default function CharacterPage(){
  const { id } = useParams()
  const { data: character, combos, loading, error } = useCharacter(id)

  if (loading) return <div className="page">Loading character…</div>
  if (error) return <div className="page">Error: {error}</div>
  if (!character) return <div className="page">Not found</div>

  const imgSrc = getCharacterImage(character)

  return (
    <div className="page">
      <Link to="/" className="back">← Back</Link>

      <h1>{character.name}</h1>

      <div className="container">
        <div className="left">
          <div className="avatar-large">
            {imgSrc ? <img src={imgSrc} alt={character.name} style={{maxHeight:150}}/> : <div style={{fontSize:48}}>{character.name?.[0]}</div>}
          </div>
        </div>

        <div>
          <p><strong>Region:</strong> {character.region}</p>
          <p><strong>Archetype:</strong> {character.archetype}</p>
          <p><strong>Difficulty:</strong> {character.difficulty}</p>
          <p><strong>Likes:</strong> {character.likes}</p>
          <p><strong>Dislikes:</strong> {character.dislikes}</p>

          <h3>Combos</h3>

          {combos.length ? (
            <ul className="combo-list">
              {combos.map(c => (
                <li key={c.id}>
                  <Link to={`/characters/${id}/combos/${c.id}`}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div>No combos listed for this character.</div>
          )}
        </div>
      </div>
    </div>
  )
}
