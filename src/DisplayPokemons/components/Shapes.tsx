import React from 'react'

import { Checkboxes, FilterContainer, FilterTitle, Input, Span } from "../../Styles/styles";

const Shapes = ({ pokemonshapes, handleShapesFilter }: { pokemonshapes: any, handleShapesFilter: () => void }) => {
    return (
        <FilterContainer>
            <FilterTitle>Shapes</FilterTitle>
            <Checkboxes>
                {
                    pokemonshapes.map(({ id, name }: { id: number, name: string }) => {
                        return (
                            <label key={`shapes-${id}`}>
                                <Input type="checkbox" onClick={handleShapesFilter} value={name} />
                                <Span>{name}</Span>
                            </label>
                        );
                    })
                }
            </Checkboxes>
        </FilterContainer>
    )
}

export default Shapes