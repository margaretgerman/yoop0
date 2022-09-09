import { useState } from 'react';
import styled from 'styled-components';

export const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState('');

    const onAddNote = () => {
        setNotes(oldNotes => [...oldNotes, note]);
        setNote('');
    };

    const handleNote = e => {
        setNote(e.target.value);
    };

    const onRemoveNote = idx => {
        setNotes(notes.filter((_, i) => i !== idx));
    };

    const NotesList = () => {
        return (
            <NotesWrapper>
                {notes.map((note, idx) => (
                    <NoteWrapper key={idx}>
                        <NoteText>{`- ${note}`}</NoteText>
                        <RemoveBtn onClick={() => onRemoveNote(idx)}>Remove</RemoveBtn>
                    </NoteWrapper>
                ))}
            </NotesWrapper>
        );
    };

    return (
        <Wrapper>
            <InputBoxWrapper>
                <Heading>Notes</Heading>
                <NotesInputWrapper>
                    <input value={note} onChange={handleNote} type="text" />
                    <button onClick={onAddNote}>Add Note</button>
                </NotesInputWrapper>
            </InputBoxWrapper>
            <NotesList />
        </Wrapper>
    );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 16px;
  @media (max-width: 768px) {
    align-items: center;
  }
`;

const Heading = styled.h3`
  font-weight: normal;
  margin: 8px 0;
`;

const NotesInputWrapper = styled.div`
  display: flex;
`;

const InputBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const NotesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const NoteWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 8px 0;
`;

const NoteText = styled.span`
  font-size: 14px;
`;

const RemoveBtn = styled.button`
  margin-left: 8px;
`;

export default Notes;
