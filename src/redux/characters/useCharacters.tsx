import { useDispatch, useSelector } from 'react-redux'
import { fetchCharacters } from 'redux/characters/index'
import { AppDispatch, RootState } from '../store'
import { StatusEnum } from 'redux/types'

const useCharacters = () => {
  const dispatch: AppDispatch = useDispatch()

  const loading = useSelector((state: RootState) => state.characters.charactersStatus === StatusEnum.Pending)
  const getCharacters = (page: number) => dispatch(fetchCharacters(page))
  const characters = useSelector((state: RootState) => state.characters.allCharacters)

  return {
    loading,
    getCharacters,
    characters,
  }
}

export default useCharacters
