import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { Pokemon, PokemonListResponse } from '../../interfaces';
import { Layout } from '../../components/layouts';
import { PokemonInfo } from '../../components/pokemon';
import { pokeAPI } from '../../api';
import { getPokemonInfo } from '../../utils';

interface Props {
    pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  return (
    <Layout>
        <PokemonInfo pokemon={pokemon} />
    </Layout>
  )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const { data } = await pokeAPI.get<PokemonListResponse>('/pokemon?limit=151'); // your fetch function here 
    const pokemon151 = data.results.map( (pokemon) => ( pokemon.name ));

    return {
        paths: pokemon151.map( name => ({
            params: { name } 
        })),
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { name } = params as { name: string };
    
    return {
        props: {
            pokemon: await getPokemonInfo( name )
        }
    }
}

export default PokemonByNamePage;