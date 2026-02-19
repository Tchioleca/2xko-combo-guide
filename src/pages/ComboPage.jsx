import { Link, useParams } from 'react-router-dom'
import useCombo from '../hooks/useCombo'
import useCharacter from '../hooks/useCharacter'
import useInputButtonImages from '../hooks/useInputButtonImages'
import './ComboPage.css'

const dariusImg = 'https://res.cloudinary.com/dywiabwjp/image/upload/v1771488012/Darius_xmveud.png'

function getCharacterImage(character) {
  if (!character) return null
  if (character.name === 'Darius') return dariusImg
  return character.avatar
}

function DifficultyBox({ level }) {
  const colors = { easy: '#90EE90', medium: '#FFD700', hard: '#FF6B6B' }
  const color = colors[level] || '#ccc'
  return <div style={{display:'inline-block', width:24, height:24, background:color, marginRight:6, borderRadius:4}} />
}

function MeterBox({ level }) {
  const colors = { 1: '#FFD700', 2: '#FF8C00', 3: '#FF6B6B' }
  const color = colors[level] || '#ccc'
  return <div style={{display:'inline-block', width:24, height:24, background:color, marginRight:6, borderRadius:4}} />
}

function InputPill({ label, buttonData }) {
  const image = buttonData?.image
  const description = buttonData?.description || label
  
  return (
    <div className="pill" title={description}>
      {image ? (
        <img src={image} alt={label} style={{maxHeight: '100%', maxWidth: '100%'}} />
      ) : (
        <span>{label}</span>
      )}
    </div>
  )
}

export default function ComboPage(){
  const { id, comboId, characterId } = useParams()
  const comboIdToFetch = comboId || id
  const { data: combo, loading, error } = useCombo(comboIdToFetch)
  const { data: character } = useCharacter(characterId)
  const { getButtonData } = useInputButtonImages()

  if (loading) return <div className="page">Loading combo…</div>
  if (error) return <div className="page">Error: {error}</div>
  if (!combo) return <div className="page">Not found</div>

  // Use inputButtons array
  const inputs = combo.inputButtons || combo.inputSequence || combo.inputs || combo.sequence || combo.commands || []
  const charToDisplay = character || combo.character
  const imgSrc = getCharacterImage(charToDisplay)
  const backLink = characterId ? `/characters/${characterId}` : `/characters/${combo.characterId}`

  return (
    <div className="page">
      <Link to={backLink} className="back">← Back</Link>
      
      {imgSrc && (
        <div className="combo-image">
          <img src={imgSrc} alt={charToDisplay?.name} style={{maxHeight:120}} />
        </div>
      )}

      <div className="combo-header">
        <h1>{combo.name}</h1>
      </div>

      <div className="combo-inputs">
        <h4>Input sequence</h4>
        <div className="input-row">
          {inputs.length ? inputs.map((i,idx)=> <InputPill key={idx} label={i} buttonData={getButtonData(i)} />) : <div>No input sequence</div>}
        </div>
      </div>

      <div className="combo-details">
        <div><strong>Character:</strong> {charToDisplay?.name ?? '—'}</div>
        <div className="difficulty-row">
          <strong>Difficulty:</strong>
          <div>
            {combo.difficulty ? (
              combo.difficulty.split(',').map((d, i) => <DifficultyBox key={i} level={d.trim()} />)
            ) : (
              <span>—</span>
            )}
          </div>
        </div>
        <div className="meter-row">
          <strong>Meter:</strong>
          <div>
            {combo.meter ? (
              combo.meter.split(',').map((m, i) => <MeterBox key={i} level={m.trim()} />)
            ) : (
              <span>—</span>
            )}
          </div>
        </div>
        <div><strong>Description:</strong> {combo.description}</div>
        <div><strong>Combo likes:</strong> {combo.likes ?? 0}</div>
      </div>
    </div>
  )
}
