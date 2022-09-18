// @ts-nocheck

import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client';

import styled from "styled-components";

import PokemonCard from '../PokemonCard/PokemonCard';
import Color from "./components/Color";
import Habitat from "./components/Habitat";
import Shapes from "./components/Shapes";

const MainLayout = styled.main`
    display: flex;
    width: 100vw;
    min-height: 100vh;
`;

const PokemonGrid = styled.section`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    background-color: #535353;
    margin-left: 330px;
    padding-top: 40px;
`;
const Filters = styled.section`
    position: fixed;
    min-width: 330px;
    height:100vh;
    background-color: #ec6a6a;
    display: flex;
    flex-direction: column;
    padding-top: 40px;

`;

const GET_GEN3_POKEMONS = gql`
  query GetGen3Pokemons {
      gen3_species: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {}}}, order_by: {id: asc}) {
        name
        id
        is_baby
        is_legendary
        is_mythical

        pokemon_color: pokemon_v2_pokemoncolor {
            id
            name
        }
        pokemon_habitat: pokemon_v2_pokemonhabitat {
            id
            name
        }
        pokemon_shape: pokemon_v2_pokemonshape {
            id
            name
        }
      }
      
      gen3_colors: pokemon_v2_pokemoncolor {
        name
        id
      }

      gen3_habitats: pokemon_v2_pokemonhabitat {
        name
        id
      }

      gen3_shapes: pokemon_v2_pokemonshape {
        name
        id
      }
  }
`
function DisplayPokemons() {
    const [colorFilter, setColorFilter] = useState([]);
    const [shapesFilter, setShapesFilter] = useState([]);
    const [habitatFilter, setHabitatFilter] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    const { loading, error, data } = useQuery(GET_GEN3_POKEMONS);

    useEffect(() => {
        if (!data?.gen3_species) {
            setFilteredPokemons([]);
        } else {
            const filters = [].concat(colorFilter, shapesFilter, habitatFilter);
            const result = colorFilter.length === 0 && shapesFilter.length === 0 && habitatFilter.length === 0 ? data.gen3_species : data.gen3_species.filter((pokemon) => {
                return filters.includes(pokemon.pokemon_color?.name) || filters.includes(pokemon.pokemon_habitat?.name) || filters.includes(pokemon.pokemon_shape?.name)
            });
            setFilteredPokemons(result);
        }
    }, [data, colorFilter, shapesFilter, habitatFilter])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const handleColorFilter = (event) => {
        const value = event.target.value;

        if (colorFilter.includes(value)) {
            setColorFilter(colorFilter.filter((item) => item !== value));
        } else {
            setColorFilter([...colorFilter, value])
        }
    }

    const handleShapesFilter = (event) => {
        const value = event.target.value;

        if (shapesFilter.includes(value)) {
            setShapesFilter(shapesFilter.filter((item) => item !== value));
        } else {
            setShapesFilter([...shapesFilter, value])
        }
    }

    const handleHabitatsFilter = (event) => {
        const value = event.target.value;

        if (habitatFilter.includes(value)) {
            setHabitatFilter(habitatFilter.filter((item) => item !== value));
        } else {
            setHabitatFilter([...habitatFilter, value])
        }
    }

    const { gen3_colors: pokemoncolors, gen3_shapes: pokemonshapes, gen3_habitats: pokemonhabitats } = data;

    return (
        <MainLayout>
            <Filters>
                <Color pokemoncolors={pokemoncolors} handleColorFilter={handleColorFilter} />
                <Habitat pokemonhabitats={pokemonhabitats} handleHabitatsFilter={handleHabitatsFilter} />
                <Shapes pokemonshapes={pokemonshapes} handleShapesFilter={handleShapesFilter} />
            </Filters>

            <PokemonGrid>
                {
                    filteredPokemons?.map(({ id, name }: { id: number, name: string }) => {
                        return <PokemonCard key={`pokemon-${id}`} name={name} id={id} />;
                    })
                }

            </PokemonGrid>
        </MainLayout>
    )
}

export default DisplayPokemons