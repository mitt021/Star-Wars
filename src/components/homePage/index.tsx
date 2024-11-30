import React, { useEffect, useState } from 'react'
import useCharacters from 'redux/characters/useCharacters'
import { Container, Grid, Pagination } from '@mui/material'
import CharacterCard from 'components/shared/characterCard'
import Loader from 'components/shared/loader'
import styles from 'components/homePage/HomePage.module.scss'
import { IAllCharacters } from 'redux/characters/interface'
import Modal from 'components/shared/modal'
import { Typography } from '@mui/material'
import { format } from 'date-fns'

const HomePage = () => {
  const { loading, getCharacters, characters } = useCharacters()
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [error, setError] = useState('')
  const [characterDetailsModal, setCharacterDetailsModal] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState<IAllCharacters | null>(null)

  const hoverEffects = [
    'hoverEffect1',
    'hoverEffect2',
    'hoverEffect3',
    'hoverEffect4',
    'hoverEffect5',
    'hoverEffect6',
    'hoverEffect7',
    'hoverEffect8',
    'hoverEffect9',
    'hoverEffect10',
  ]

  const creationDate = selectedCharacter?.created
    ? format(new Date(selectedCharacter.created), 'dd-MM-yyyy')
    : 'Unknown'

  const fetchCharacters = async (page: number) => {
    const response: Record<string, any> = await getCharacters(page)
    if (response?.payload?.status === 503 || response?.error) {
      setError(response.payload.message)
    } else {
      setTotalPages(Math.ceil(response?.payload?.count / 10))
    }
  }

  useEffect(() => {
    fetchCharacters(1)
  }, [])

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    fetchCharacters(value)
  }

  const handleCardClick = (character: IAllCharacters) => {
    setSelectedCharacter(character)
    setCharacterDetailsModal(true)
  }

  const handleCloseModal = () => {
    setCharacterDetailsModal(false)
    setSelectedCharacter(null)
  }

  return (
    <Container>
      {loading && <Loader />}
      <h4 className={styles.title}>Star Wars</h4>
      {error && <h4 className={styles.errorText}>{error}</h4>}
      {!loading && !error.length && (
        <>
          <Grid container spacing={2}>
            {characters.map((character, index) => (
              <Grid item xs={12} sm={6} md={4} key={`${character.name}-${index}`}>
                <CharacterCard
                  character={character}
                  onClick={handleCardClick}
                  hoverEffect={hoverEffects[index % hoverEffects?.length]}
                />
              </Grid>
            ))}
          </Grid>
          <div className={styles.paginationBox}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              variant="outlined"
              shape="rounded"
            />
          </div>
        </>
      )}
      <Modal open={characterDetailsModal} onClose={handleCloseModal} title={selectedCharacter?.name}>
        {selectedCharacter && (
          <>
            <Typography variant="body1">
              <strong>Height:</strong> <span>{Number(selectedCharacter?.height) / 100} meters</span>
            </Typography>
            <Typography variant="body1">
              <strong>Mass:</strong> <span>{selectedCharacter?.mass} kg</span>
            </Typography>
            <Typography variant="body1">
              <strong>Birth Year:</strong> <span>{selectedCharacter?.birth_year}</span>
            </Typography>
            <Typography variant="body1">
              <strong>Number of Films:</strong> <span>{selectedCharacter?.films?.length}</span>
            </Typography>
            <Typography variant="body1">
              <strong>Created:</strong> <span>{creationDate}</span>
            </Typography>
          </>
        )}
      </Modal>
    </Container>
  )
}

export default HomePage
