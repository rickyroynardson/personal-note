import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { Layout } from "./components/templates";
import { Header, Main, NoteList } from "./components/organisms";
import { ModalHeader, ModalCard, ModalContainer, SearchContainer, TabContainer, Form, NoteCard, NoteBody, NoteAction } from "./components/molecules";
import { HeaderBrand, SearchInput, Input, Textarea, Button, Tab, Title, NoteDate, Content } from "./components/atoms";
import { getInitialData, getFormattedDate } from "./utils/index";

function App() {
  const [notes, setNotes] = useState(getInitialData());
  const [activeNotes, setActiveNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [onActiveTab, setOnActiveTab] = useState(true);
  const [search, setSearch] = useState("");
  const [addNoteModal, setAddNoteModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const resetForm = () => {
    setTitle("");
    setBody("");
  }

  const addNote = () => {
    const note = {
      id: +new Date(),
      title,
      body,
      archived: false,
      createdAt: new Date().toISOString()
    }
    const currentNotes = [...notes];
    currentNotes.push(note);
    setNotes(currentNotes);
    setAddNoteModal(false);
    resetForm();
  }

  useEffect(() => {
    setActiveNotes(
      notes.filter((note) => note.archived === false && note.title.match(new RegExp(search.trim(), 'gi')))
    )
    setArchivedNotes(
      notes.filter((note) => note.archived === true && note.title.match(new RegExp(search.trim(), 'gi')))
    )
  }, [notes, search])

  return (
    <Layout>
      <Header>
        <HeaderBrand />
      </Header>
      <SearchContainer>
        <SearchInput type="search" placeholder="Cari berdasarkan judul" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button type="button" weight="semibold" onClick={() => setAddNoteModal(true)}>Tulis Catatan</Button>
      </SearchContainer>
      <TabContainer>
        <Tab type="button" active={onActiveTab} onClick={() => setOnActiveTab(true)}>Aktif</Tab>
        <Tab type="button" active={!onActiveTab} onClick={() => setOnActiveTab(false)}>Arsip</Tab>
      </TabContainer>
      <Main>
        <NoteList>
          {
            onActiveTab
              ? activeNotes.map((note) => (
                <NoteCard key={note.id}>
                  <NoteBody title={note.title} date={getFormattedDate(note.createdAt)} body={note.body} />
                  <NoteAction>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                  </NoteAction>
                </NoteCard>
              ))
              : archivedNotes.map((note) => (
                <NoteCard key={note.id}>
                  <NoteBody title={note.title} date={getFormattedDate(note.createdAt)} body={note.body} />
                  <div className="flex gap-1">
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                  </div>
                </NoteCard>
              ))
          }
        </NoteList>
      </Main>
      <ModalContainer visible={addNoteModal} onClose={() => setAddNoteModal(false)}>
        <ModalCard>
          <ModalHeader>
            <Title color="text-slate-800" value="Tulis Catatan" />
            <Button type="button" size="xs" theme="light-gray" onClick={() => setAddNoteModal(false)}><FiX /></Button>
          </ModalHeader>
          <Form class="flex flex-col gap-3" onSubmit={(e) => {
            e.preventDefault();
            addNote();
          }}>
            <Input type="text" placeholder="Judul catatan" value={title} onChange={(e) => setTitle(e.target.value.substring(0, 50))} required={true} />
            <p className="text-sm text-right text-slate-600">{title.length}/50</p>
            <Textarea placeholder="Isi catatan" rows="5" value={body} onChange={(e) => setBody(e.target.value)} required={true} />
            <Button type="submit">Simpan</Button>
          </Form>
        </ModalCard>
      </ModalContainer>
    </Layout >
  );
}

export default App;
