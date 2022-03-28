import { FC } from 'react'
import { Card, Grid } from '@nextui-org/react';

import { Pokemon } from '../../interfaces'

interface Props {
    pokemon: Pokemon;
}

export const PokemonBasicCard: FC<Props> = ({ pokemon }) => {
  return (
    <Grid xs={ 12 } sm={ 4 }>
        <Card hoverable css={{ padding: '30px' }}>
        <Card.Body>
            <Card.Image
            src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' }
            alt={ pokemon.name }
            width="100%"
            height={ 200 }
            />
        </Card.Body>
        </Card>
    </Grid>
  )
}
