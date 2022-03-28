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
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { name } = params as { name: string };
    const pokemon = await getPokemonInfo( name );

    if ( !pokemon ) {
        return {
            redirect: {
                destination: '/',
                permanent: false 
            }
        }
    }
    
    return {
        props: {
            pokemon
        },
        revalidate: 86400, // 60 * 60 * 24
    }
}

export default PokemonByNamePage;