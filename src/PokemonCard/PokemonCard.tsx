import React from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom"

const Card = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    min-width: 120px;
    max-height: 148px;

    &:hover {
        background-color: #e4e4e4;
    }
;

`;

const PokemonName = styled.h3`
    color: #000000;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    margin-top: 0;
`;

const PokemoneImage = styled.img`
`;

function PokemonCard({ id, name }: { id: number, name: string }) {
    return (
        <Card>
            <Link to={`/${id}`}>
                <PokemoneImage src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt="" />
            </Link>
            <PokemonName>{name}</PokemonName>
        </Card>
    )
}

export default PokemonCard