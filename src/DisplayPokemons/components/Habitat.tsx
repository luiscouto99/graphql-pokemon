import React from 'react'

import { Checkboxes, FilterContainer, FilterTitle, Input, Span } from "../../Styles/styles";

const Habitat = ({ pokemonhabitats, handleHabitatsFilter }: { pokemonhabitats: any, handleHabitatsFilter: () => void }) => {
    return (
        <FilterContainer>
            <FilterTitle>Habitats</FilterTitle>
            <Checkboxes>
                {
                    pokemonhabitats.map(({ id, name }: { id: number, name: string }) => {
                        return (
                            <label key={`habitats-${id}`}>
                                <Input type="checkbox" onClick={handleHabitatsFilter} value={name} />
                                <Span>{name}</Span>
                            </label>
                        )
                    })
                }
            </Checkboxes>
        </FilterContainer>
    )
}

export default Habitat