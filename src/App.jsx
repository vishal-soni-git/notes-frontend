import { useEffect, useState } from 'react';


const API = process.env.REACT_APP_API_URL;

console.log("API base from env:", API);


function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    const res = await fetch(`${API}/notes`);
    setNotes(await res.json());
  };

  useEffect(()=>{ fetchNotes(); }, []);

  const createNote = async () => {
    const res = await fetch(`${API}/notes`, {
      method:"POST", headers:{'Content-Type':'application/json'},
      body:JSON.stringify({title, content})
    });
    await res.json();
    setTitle(""); setContent("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`${API}/notes/${id}`, {method:"DELETE"});
    fetchNotes();
  };

  const shareNote = async (id) => {
    const res = await fetch(`${API}/notes/${id}/share`, {method:"POST"});
    const url = await res.text();
    alert("Share link: " + API.replace("/api","") + url);
  };

  return (
    <div style={{maxWidth:600, margin:"2rem auto", fontFamily:"sans-serif"}}>
      <h1>Notes</h1>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
      <br/>
      <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Content" />
      <br/>
      <button onClick={createNote}>Add</button>
      <hr/>
      {notes.map(n=>(
        <div key={n.id} style={{border:"1px solid #ccc", margin:"8px 0", padding:"8px"}}>
          <h3>{n.title}</h3>
          <p>{n.content}</p>
          <button onClick={()=>deleteNote(n.id)}>Delete</button>
          <button onClick={()=>shareNote(n.id)}>Share</button>
        </div>
      ))}
    </div>
  );
}

export default App;
