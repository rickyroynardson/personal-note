import React, { useEffect, useState } from "react";
import { FiDownload, FiEdit, FiShare, FiTrash2, FiX } from "react-icons/fi";
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
  const [editNoteModal, setEditNoteModal] = useState(false);
  const [deleteNoteConfirmation, setDeleteNoteConfirmation] = useState(false);
  const [archiveNoteConfirmation, setArchiveNoteConfirmation] = useState(false);
  const [unarchiveNoteConfirmation, setUnarchiveNoteConfirmation] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [activeId, setActiveId] = useState(0);

  const resetForm = () => {
    setTitle("");
    setBody("");
  }

  const findById = (id) => {
    const index = notes.findIndex((note) => note.id === id);
    return { note: notes[index], index }
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

  const editNote = () => {
    const targetNote = findById(activeId);
    const note = {
      ...targetNote.note,
      title,
      body
    }
    const currentNotes = [...notes];
    currentNotes.splice(targetNote.index, 1, note);
    setNotes(currentNotes);
    setEditNoteModal(false);
    resetForm();
  }

  const deleteNote = () => {
    const targetNote = findById(activeId);
    const currentNotes = [...notes];
    currentNotes.splice(targetNote.index, 1);
    setNotes(currentNotes);
    setDeleteNoteConfirmation(false);
  }

  const archiveNote = () => {
    const targetNote = findById(activeId);
    const currentNotes = [...notes];
    currentNotes.splice(targetNote.index, 1, { ...targetNote.note, archived: true });
    setNotes(currentNotes);
    setArchiveNoteConfirmation(false);
  }

  const unarchiveNote = () => {
    const targetNote = findById(activeId);
    const currentNotes = [...notes];
    currentNotes.splice(targetNote.index, 1, { ...targetNote.note, archived: false });
    setNotes(currentNotes);
    setUnarchiveNoteConfirmation(false);
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
                    <Button type="button" title="Edit" theme="amber" size="xs" onClick={() => {
                      setActiveId(note.id);
                      setTitle(note.title);
                      setBody(note.body);
                      setEditNoteModal(true);
                    }}><FiEdit /></Button>
                    <Button type="button" title="Hapus" theme="red" size="xs" onClick={() => {
                      setActiveId(note.id);
                      setDeleteNoteConfirmation(true);
                    }}><FiTrash2 /></Button>
                    <Button type="button" title="Arsipkan" theme="emerald" size="xs" onClick={() => {
                      setActiveId(note.id);
                      setArchiveNoteConfirmation(true);
                    }}><FiDownload /></Button>
                  </NoteAction>
                </NoteCard>
              ))
              : archivedNotes.map((note) => (
                <NoteCard key={note.id}>
                  <NoteBody title={note.title} date={getFormattedDate(note.createdAt)} body={note.body} />
                  <NoteAction>
                    <Button type="button" title="Edit" theme="amber" size="xs" onClick={() => {
                      setActiveId(note.id);
                      setTitle(note.title);
                      setBody(note.body);
                      setEditNoteModal(true);
                    }}><FiEdit /></Button>
                    <Button type="button" title="Hapus" theme="red" size="xs" onClick={() => {
                      setActiveId(note.id);
                      setDeleteNoteConfirmation(true);
                    }}><FiTrash2 /></Button>
                    <Button type="button" title="Pindahkan dari arsip" theme="emerald" size="xs" onClick={() => {
                      setActiveId(note.id);
                      setUnarchiveNoteConfirmation(true);
                    }}><FiShare /></Button>
                  </NoteAction>
                </NoteCard>
              ))
          }
        </NoteList>
      </Main>
      <ModalContainer visible={addNoteModal} onClose={() => {
        setAddNoteModal(false);
        resetForm();
      }}>
        <ModalCard>
          <ModalHeader>
            <Title color="text-slate-800" value="Tulis Catatan" />
            <Button type="button" size="xs" theme="light-gray" onClick={() => {
              setAddNoteModal(false);
              resetForm();
            }}><FiX /></Button>
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
      <ModalContainer visible={editNoteModal} onClose={() => {
        setEditNoteModal(false);
        resetForm();
      }}>
        <ModalCard>
          <ModalHeader>
            <Title color="text-slate-800" value="Edit Catatan" />
            <Button type="button" size="xs" theme="light-gray" onClick={() => {
              setEditNoteModal(false);
              resetForm();
            }}><FiX /></Button>
          </ModalHeader>
          <Form class="flex flex-col gap-3" onSubmit={(e) => {
            e.preventDefault();
            editNote();
          }}>
            <Input type="text" placeholder="Judul catatan" value={title} onChange={(e) => setTitle(e.target.value.substring(0, 50))} required={true} />
            <p className="text-sm text-right text-slate-600">{title.length}/50</p>
            <Textarea placeholder="Isi catatan" rows="5" value={body} onChange={(e) => setBody(e.target.value)} required={true} />
            <Button type="submit">Simpan</Button>
          </Form>
        </ModalCard>
      </ModalContainer>
      <ModalContainer visible={deleteNoteConfirmation} onClose={() => {
        setDeleteNoteConfirmation(false);
        resetForm();
      }}>
        <ModalCard>
          <ModalHeader>
            <Title color="text-slate-800" value="Konfirmasi" />
            <Button type="button" size="xs" theme="light-gray" onClick={() => {
              setDeleteNoteConfirmation(false);
              resetForm();
            }}><FiX /></Button>
          </ModalHeader>
          <p className="text-lg text-gray-600">Apakah anda yakin untuk menghapus catatan ini?</p>
          <div className="flex justify-end gap-2">
            <Button type="button" theme="gray" size="md" onClick={() => {
              setDeleteNoteConfirmation(false);
              resetForm();
            }}>Batal</Button>
            <Button type="button" theme="teal" size="md" onClick={() => deleteNote()}>Ya</Button>
          </div>
        </ModalCard>
      </ModalContainer>
      <ModalContainer visible={archiveNoteConfirmation} onClose={() => {
        setArchiveNoteConfirmation(false);
        resetForm();
      }}>
        <ModalCard>
          <ModalHeader>
            <Title color="text-slate-800" value="Konfirmasi" />
            <Button type="button" size="xs" theme="light-gray" onClick={() => {
              setArchiveNoteConfirmation(false);
              resetForm();
            }}><FiX /></Button>
          </ModalHeader>
          <p className="text-lg text-gray-600">Apakah anda yakin untuk mengarsipkan catatan ini?</p>
          <div className="flex justify-end gap-2">
            <Button type="button" theme="gray" size="md" onClick={() => {
              setArchiveNoteConfirmation(false);
              resetForm();
            }}>Batal</Button>
            <Button type="button" theme="teal" size="md" onClick={() => archiveNote()}>Ya</Button>
          </div>
        </ModalCard>
      </ModalContainer>
      <ModalContainer visible={unarchiveNoteConfirmation} onClose={() => {
        setUnarchiveNoteConfirmation(false);
        resetForm();
      }}>
        <ModalCard>
          <ModalHeader>
            <Title color="text-slate-800" value="Konfirmasi" />
            <Button type="button" size="xs" theme="light-gray" onClick={() => {
              setUnarchiveNoteConfirmation(false);
              resetForm();
            }}><FiX /></Button>
          </ModalHeader>
          <p className="text-lg text-gray-600">Apakah anda yakin untuk memindahkan catatan ini dari arsip?</p>
          <div className="flex justify-end gap-2">
            <Button type="button" theme="gray" size="md" onClick={() => {
              setUnarchiveNoteConfirmation(false);
              resetForm();
            }}>Batal</Button>
            <Button type="button" theme="teal" size="md" onClick={() => unarchiveNote()}>Ya</Button>
          </div>
        </ModalCard>
      </ModalContainer>
    </Layout >
  );
}

export default App;
