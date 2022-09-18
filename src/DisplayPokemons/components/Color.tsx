import React from 'react'

import { Checkboxes, FilterContainer, FilterTitle, Input, Span } from "../../Styles/styles";

const Color = ({ pokemoncolors, handleColorFilter }: { pokemoncolors: any, handleColorFilter: () => void }) => {
  return (
    <FilterContainer>
      <FilterTitle>Colors</FilterTitle>
      <Checkboxes>
        {
          pokemoncolors.map(({ id, name }: { id: number, name: string }) => {
            return (
              <label key={`colors-${id}`}>
                <Input type="checkbox" onClick={handleColorFilter} value={name} />
                <Span>{name}</Span>
              </label>
            );
          })
        }
      </Checkboxes>
    </FilterContainer>
  )
}

export default Color