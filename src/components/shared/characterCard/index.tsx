import React from 'react'
import { IAllCharacters } from 'redux/characters/interface'
import styles from 'components/shared/characterCard/CharacterCard.module.scss'

interface ICharacterCardProps {
  character: IAllCharacters
  onClick: (character: IAllCharacters) => void
  hoverEffect: string
}

const CharacterCard = ({ character, onClick, hoverEffect }: ICharacterCardProps) => {
  return (
    <>
      <div className={`${styles.cardMainSection} ${styles[hoverEffect]}`} onClick={() => onClick(character)}>
        <h3 className={styles.characterName}>{character.name}</h3>
      </div>
    </>
  )
}

export default CharacterCard
