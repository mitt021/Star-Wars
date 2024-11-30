import { StatusEnum } from 'redux/types'

export interface ICharactersState {
  charactersStatus: StatusEnum
  allCharacters: IAllCharacters[]
}

export interface IAllCharacters {
  name: string
  mass: string
  height: string
  birth_year: string
  films: []
  created: string
}
