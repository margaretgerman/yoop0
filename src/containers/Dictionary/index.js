import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Autocomplete from 'react-autocomplete';
import { autoCompleteSuggestions } from '../../auto-complete';
import Definition from '../../components/Definition';
import Notes from '../../components/Notes';

const DICTIONARY_API = 'https://api.dictionaryapi.dev/api/v2/entries/en';

export const Dictionary = () => {
    const [word, setWord] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [definitionData, setDefinitionData] = useState(null);
    const [autocompleteResults, setAutocompleteResults] = useState([]);

    useEffect(() => {
        if (word.length) {
            autoCompleteSuggestions(word).then(response => setAutocompleteResults(response.results));
        }
    }, [word]);

    useEffect(() => {
        if (word.length) {
            fetch(`${DICTIONARY_API}/${searchTerm}`)
                .then(response => response.json())
                .then(definition => setDefinitionData(definition[0]));
        }
    }, [searchTerm]);

    const onSuggestionClick = val => {
        setWord(val);
        setSearchTerm(val);
    };

    return (
        <>
            <SearchContainer>
                <span>Search a word:</span>
                <Autocomplete
                    getItemValue={item => item}
                    items={autocompleteResults}
                    renderInput={props => <Input {...props} />}
                    renderItem={(item, isHighlighted) => {
                        return (
                            <Suggestion key={item} isHighlighted={isHighlighted}>
                                {item}
                            </Suggestion>
                        );
                    }}
                    value={word}
                    onChange={e => setWord(e.target.value)}
                    onSelect={onSuggestionClick}
                />
                <button onClick={() => setSearchTerm(word)}>Search</button>
            </SearchContainer>

            {definitionData && (
                <Wrapper>
                    <div>
                        <Text fontWeight="bold">{definitionData.word}</Text>
                        {definitionData.phonetic && <Text fontStyle="italic">{` - ${definitionData.phonetic}`}</Text>}
                    </div>
                    <ResultsContainer>
                        <Definition definitionData={definitionData} />
                        <Notes />
                    </ResultsContainer>
                </Wrapper>
            )}
        </>
    );
};

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResultsContainer = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  margin: 8px;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
`;

const Text = styled.span`
  font-style: ${props => props.fontStyle};
  font-weight: ${props => props.fontWeight};
  font-size: ${props => props.fontSize || '24px'};
`;

const Suggestion = styled.div`
  background: ${props => (props.isHighlighted ? 'lightgray' : 'white')};
  color: #000;
`;

export default Dictionary;
