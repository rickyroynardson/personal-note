import React, { useEffect, useState } from "react";
import { Layout } from "./components/templates";
import { Header, Main, NoteList } from "./components/organisms";
import { ModalContainer, SearchContainer, TabContainer } from "./components/molecules";
import { HeaderBrand, SearchInput, Button, Tab } from "./components/atoms";
import { getInitialData, getFormattedDate } from "./utils/index";

function App() {
  const [notes, setNotes] = useState(getInitialData());
  const [activeNotes, setActiveNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [onActiveTab, setOnActiveTab] = useState(true);
  const [search, setSearch] = useState("");
  const [addNoteModal, setAddNoteModal] = useState(false);

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
                <p key={note.id}>{note.title}</p>
              ))
              : archivedNotes.map((note) => (
                <p key={note.id}>{note.title}</p>
              ))
          }
        </NoteList>
      </Main>
      <ModalContainer visible={addNoteModal} onClose={() => setAddNoteModal(false)}>
        <p>Ini modal add</p>
      </ModalContainer>
    </Layout >
  );
}

export default App;
