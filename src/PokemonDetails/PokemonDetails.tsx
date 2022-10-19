import React from 'react'
import { useParams } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';
import { Link } from "react-router-dom";

import styled from "styled-components";

const Main = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #535353;
    color: white;
`;

type PokemonColorProps = {
    pokColor?: string;
}
const PokemonColor = styled.div<PokemonColorProps>`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color:${props => props.pokColor};
    border: 1px solid black;
`;

const MainPokemon = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InfoContainer = styled.section`
    margin: 0 auto;
    border: 1px solid rgba(0,0,0, 0.2);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    min-width: 500px;
`;

const InfoTitle = styled.h2`
    text-transform: uppercase;
`;

const InfoParagraph = styled.p`
    font-weight: 500;
`;

const InfoSpan = styled.span`
    font-weight: normal;
`;

const PokemonDetailContainer = styled.div`
text-align: center;`;

const EvolutionContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

type EvolutionImageProps = {
    samePokemon?: boolean;
}
const EvolutionImage = styled.img<EvolutionImageProps>`
    border: ${props => props.samePokemon ? "1px solid #37ff00;" : "1px solid rgba(0, 0, 0, 0.2);"};
    border-radius: 4px;

`;

const EvolutionImageContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`;

const Button = styled.button`
    margin: 20px 0;
`;

function PokemonDetails() {
    const { id } = useParams();

    const GET_POKEMON_DETAILS = gql`
        query GetGen3Pokemons {
            gen3_species: pokemon_v2_pokemonspecies(where: {id: {_eq: ${id}}}) {
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
                evolves_from_species_id
                growth_rate_id
                pokemon_v2_evolutionchain {
                  id
                  pokemon_v2_pokemonspecies {
                    name
                    id
                  }
                }
            }
        }
    `
    const { loading, error, data } = useQuery(GET_POKEMON_DETAILS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const pokemonInfo = data.gen3_species[0];
    const pokemonEvolutions = pokemonInfo.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies;

    const { name, id: pokemonId, is_baby, is_legendary, is_mythical, evolves_from_species_id, growth_rate_id } = pokemonInfo;

    return (
        <Main>
            <InfoContainer>
                <PokemonColor pokColor={pokemonInfo.pokemon_color.name}></PokemonColor>

                <MainPokemon>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt="" />
                    <InfoTitle>{name}</InfoTitle>
                </MainPokemon>


                <PokemonDetailContainer>
                    <InfoParagraph>ID: <InfoSpan>{pokemonId}</InfoSpan></InfoParagraph>
                    {
                        evolves_from_species_id && (
                            <InfoParagraph>Evolves from species id: <InfoSpan>{evolves_from_species_id}</InfoSpan></InfoParagraph>
                        )
                    }
                    <InfoParagraph>Growth rate id: <InfoSpan>{growth_rate_id}</InfoSpan></InfoParagraph>
                    <InfoParagraph>Is baby: <InfoSpan>{is_baby ? "true" : "false"}</InfoSpan></InfoParagraph>
                    <InfoParagraph>Is legendary: <InfoSpan>{is_legendary ? "true" : "false"}</InfoSpan></InfoParagraph>
                    <InfoParagraph>Is mythical: <InfoSpan>{is_mythical ? "true" : "false"}</InfoSpan></InfoParagraph>
                    {
                        pokemonInfo.pokemon_color?.name && (
                            <InfoParagraph>Color: <InfoSpan>{pokemonInfo.pokemon_color.name}</InfoSpan></InfoParagraph>
                        )
                    }
                    {
                        pokemonInfo.pokemon_habitat?.name && (
                            <InfoParagraph>Habitat: <InfoSpan>{pokemonInfo.pokemon_habitat.name}</InfoSpan></InfoParagraph>
                        )
                    }
                    {
                        pokemonInfo.pokemon_shape?.name && (
                            <InfoParagraph>Shape: <InfoSpan>{pokemonInfo.pokemon_shape.name}</InfoSpan></InfoParagraph>
                        )
                    }
                </PokemonDetailContainer>

                <EvolutionContainer>
                    <InfoParagraph>Evolution Chain:</InfoParagraph>

                    <EvolutionImageContainer>
                        {
                            pokemonEvolutions.map((info: any, index: number) => {
                                return (
                                    <Link to={`/${info.id}`} key={index}>
                                        <EvolutionImage samePokemon={info.id === pokemonId} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${info.id}.png`} alt="" />
                                    </Link>
                                )
                            })
                        }
                    </EvolutionImageContainer>
                </EvolutionContainer>

                <Link to="/">
                    <Button>Back to Pokemon List</Button>
                </Link>
            </InfoContainer>
        </Main>
    )
}

export default PokemonDetails