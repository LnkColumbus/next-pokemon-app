import { FC } from 'react';
import { Grid } from '@nextui-org/react';

import { Pokemon } from '../../interfaces';
import { PokemonBasicCard } from './PokemonBasicCard';
import { PokemonDetail } from './PokemonDetail';

interface Props {
    pokemon: Pokemon;
}

export const PokemonInfo: FC<Props> = ({ pokemon }) => {
  return (
    <Grid.Container css={{ marginTop: '5px'}} gap={ 2 }>
        <PokemonBasicCard pokemon={pokemon} />
        <PokemonDetail pokemon={pokemon} />
    </Grid.Container>
  )
}
