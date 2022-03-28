import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { PokemonInfo } from '../../components/pokemon/';
import { Layout } from '../../components/layouts';
import { Pokemon } from '../../interfaces';
import { getPokemonInfo } from '../../utils';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

  return (
    <Layout title={ pokemon.name }>
      <PokemonInfo pokemon={pokemon} />
    </Layout>
  )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
 
  const pokemon151 = [...Array(151)].map( (value, index) => `${ index + 1 }`)

  return {
    paths: pokemon151.map( id => ({
      params: { id }
    })),
    // fallback: false
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { id } = params as { id: string };
  const pokemon = await getPokemonInfo(id);

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

export default PokemonPage;
