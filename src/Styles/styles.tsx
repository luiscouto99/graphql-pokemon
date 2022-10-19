import styled from "styled-components";

export const FilterContainer = styled.div`
    margin: 0 16px;
`;

export const FilterTitle = styled.h3`
    font-weight: 500;
    color: #202020;
    margin-bottom: 0;
`;

export const Checkboxes = styled.div`
    display: flex;
    flex-direction: column;
    color: #191919;
`;

export const Input = styled.input`
    position:relative;
    margin: 0;
    margin-bottom: 8px;
    
    &:before {
        content: "";
        display: block;
        position: absolute;
        width: 13px;
        height: 13px;
        top: 0;
        left: 0;
        border: 2px solid #555555;
        border-radius: 3px;
        background-color: white;
    }

    &:checked:after {
        content: "";
        display: block;
        width: 5px;
        height: 8px;
        border: solid black;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        position: absolute;
        top: 1px;
        left: 5px;
    }
`;

export const Span = styled.span`
    margin-left: 8px;
    margin-top: 1px;
`;
