import styled from 'styled-components'

export const Definition = ({ definitionData }) => {
    const { meanings } = definitionData;

    const DefinitionList = () => {
        return meanings.map(partOfSpeech => {
            return partOfSpeech.definitions.map((el, idx) =>
                <DefinitionWrapper key={idx}>{`- ${el.definition}`}</DefinitionWrapper>);
        });
    };

    return (
        <DefinitionsWrapper>
            <Heading>Definitions</Heading>
            <Definitions>
                <DefinitionList />
            </Definitions>
        </DefinitionsWrapper>
    );
};

const DefinitionsWrapper = styled.div`
  max-width: 750px;
  padding-right: 16px;
  flex-grow: 3;
  border-right: 1px solid #fff;
  
  @media (max-width: 768px) {
    padding: 0 0 16px 0;
    border-right: none;
    border-bottom: 1px solid #fff;
  }
`;

const Heading = styled.h4`
  font-style: italic;
  font-size: 20px;
  font-weight: normal;
  margin: 8px 0;
`;

const Definitions = styled.div`
  display: flex;
  flex-direction: column;
`;

const DefinitionWrapper = styled.span`
  font-size: 14px;
`;

export default Definition;
