export default function Biodata() {
  return (
    <div className="container">
      <header className="header-section">
        <Judul />
        <Tagline />
      </header>

      <Nama
        nama="Pearl"
        asal="Planet Screwllum"
        spesies="Intellitron (Mechanical Lifeform)"
        faksi="IPC: Interastral Peace Corporation"
        grup="The Ten Stonehearts"
        batu="Pearl of Appraisal"
        gambar ="img/Pearl.jpg"
      />

      <TentangSaya
        deskripsi="A senior manager in the IPC's Strategic Investment Department 
         and one of the Ten Stonehearts.Her Cornerstone is Pearl of Appraisal. 
         The current CEO of Planarcadia, 
         obsessed with studying the essence of art."
      />

      <Jabatan
        dept="Strategic Investment Department"
        role="Secretary & Executive Officer"
        corp1="CEO of Planarcadia"
        corp2="Leader of Pearluxe Corp"
      />

      <Kontak
        email="MadamPearl@ipc.corp.com"
        instagram="@iluvArts"
      />

      <Quote />
    </div>
  );
}

function Judul() {
  return <h1 className="text-center">BIODATA</h1>;
}

function Tagline() {
  return <p className="text-center"><i>"Elegance is the ultimate form of logic."</i></p>;
}

function Nama(props) {
  return (
    <div className="card card-profile"> {/* Tambah class baru */}
      <div className="profile-layout">
        <div className="profile-info">
          <hr />
          <h3>Profil: </h3>
          <p><b>Name:</b> {props.nama}</p>
          <p><b>Origin:</b> {props.asal}</p>
          <p><b>Species:</b> {props.spesies}</p>
          <p><b>Faction:</b> {props.faksi}</p>
          <p><b>Group:</b> {props.grup}</p>
          <p><b>StoneHeart:</b> {props.batu}</p>
        </div>
        <div className="profile-image-container">
          <img src={props.gambar} alt={props.nama} className="profile-img" />
        </div>
      </div>
    </div>
  );
}

function TentangSaya(props) {
  return (
    <div className="card">
      <hr />
      <h3>About Pearl</h3>
      <p>{props.deskripsi}</p>
    </div>
  );
}

function Jabatan(props) {
  return (
    <div className="card">
      <hr />
      <h3>Work : </h3>
      <p><b>Department:</b> {props.dept}</p>
      <p><b>Primary Role:</b> {props.role}</p>
      <p><b>Corporate 1:</b> {props.corp1}</p>
      <p><b>Corporate 2:</b> {props.corp2}</p>
    </div>
  );
}

function Kontak(props) {
  return (
    <div className="card">
      <hr />
      <h3>Contact Frequency</h3>
      <p><b>Email:</b> {props.email}</p>
      <p><b>Instagram:</b> {props.instagram}</p>
    </div>
  );
}

function Quote() {
  return (
    <div className="quote-card">
      <h3>"I Come to Appraise, I Come to Analyse, I Come to Render."</h3>
      <p>
        I Weave the Cosmos into Brocade. Breathe Soul into Painted Stone. <br/>
        Let The Jewels of Heaven Rise as Their Will.<br />
        <strong>All For The Amber Lord.</strong>
      </p>
    </div>
  );
}