import React, { useEffect, useMemo, useState } from 'react';
import Auth from './Auth';
import { supabase } from './lib/supabase';
import { BookOpen, GraduationCap, ClipboardCheck, ChevronRight, ArrowLeft, CheckCircle2, XCircle, RotateCcw, Menu, Sparkles } from 'lucide-react';

const chapters = [
  {
    id: 'konsep', title: "Konsep Ilmu Ma’ani", subtitle: 'Pengertian, ruang lingkup, dan tujuan ilmu Ma’ani.',
    intro: "Ilmu Ma’ani adalah cabang ilmu balaghah yang membahas cara menyusun ungkapan agar sesuai dengan tuntutan keadaan (مُقْتَضَى الْحَال). Fokusnya bukan hanya benar secara tata bahasa, tetapi juga tepat menurut konteks, tujuan pembicara, dan kondisi pendengar.",
    objectives: ['Menjelaskan pengertian Ilmu Ma’ani.', 'Memahami hubungan antara kalimat dan konteks.', 'Mengenali tujuan penggunaan susunan kalimat.'],
    sections: [
      {h:'Ruang lingkup', p:'Pembahasan Ilmu Ma’ani mencakup khabar dan insya’, musnad dan musnad ilaih, qashr, fashl dan washl, ijaz, ithnab, serta musawah. Susunan kalimat dapat berubah sesuai maksud, penekanan, dan keadaan lawan bicara.'},
      {h:'Prinsip utama', p:'Ungkapan yang baik mempertimbangkan siapa yang berbicara, siapa pendengarnya, informasi apa yang sudah diketahui, dan tujuan yang ingin dicapai. Satu makna dapat disampaikan dengan susunan berbeda untuk menghasilkan efek yang berbeda.'}
    ],
    examples: [
      {ar:'زَيْدٌ قَائِمٌ', tr:'Zaid berdiri.', note:'Kalimat berita sederhana. Dalam konteks yang tepat, kalimat ini menyampaikan informasi bahwa Zaid sedang berdiri.'},
      {ar:'إِنَّ زَيْدًا قَائِمٌ', tr:'Sesungguhnya Zaid berdiri.', note:'Partikel إِنَّ memberi penegasan. Pemilihan bentuk ini sesuai ketika pendengar membutuhkan penekanan atau sedang meragukan informasi.'}
    ],
    quiz: [
      {q:'Apa fokus utama Ilmu Ma’ani?', opts:['Menghafal kosakata Arab','Menyesuaikan susunan ungkapan dengan konteks','Membahas perubahan akhir kata saja','Menerjemahkan setiap kata secara harfiah'], a:1, exp:'Ilmu Ma’ani mengkaji kesesuaian bentuk dan susunan kalimat dengan tuntutan keadaan atau مقتضى الحال.'},
      {q:'Istilah مقتضى الحال paling dekat maknanya dengan …', opts:['Tuntutan keadaan atau konteks','Akhir kata dalam kalimat','Bentuk jamak suatu kata','Pola perubahan fi’il'], a:0, exp:'مقتضى الحال berarti tuntutan keadaan, yaitu konteks yang memengaruhi pilihan ungkapan.'},
      {q:'Mengapa dua kalimat dengan makna dasar serupa dapat memakai susunan berbeda?', opts:['Karena tata bahasa tidak penting','Karena konteks dan tujuan komunikasinya berbeda','Karena semua kalimat harus panjang','Karena bahasa Arab tidak memiliki aturan'], a:1, exp:'Pilihan struktur dipengaruhi konteks, keadaan pendengar, dan maksud pembicara.'}
    ]
  },
  {
    id: 'khabar', title: "Khabar dan Insya’", subtitle: 'Membedakan kalimat berita dan kalimat nonberita.',
    intro: 'Dalam Ilmu Ma’ani, kalam dibagi secara umum menjadi khabar dan insya’. Khabar adalah ungkapan yang secara prinsip dapat dinilai benar atau salah berdasarkan kenyataan. Insya’ adalah ungkapan yang tidak dinilai benar atau salah dengan cara yang sama ketika diucapkan, seperti perintah, larangan, pertanyaan, panggilan, dan harapan.',
    objectives: ['Membedakan khabar dan insya’.', 'Mengenali bentuk insya’ thalabi.', 'Menjelaskan fungsi penegasan dalam kalimat khabar.'],
    sections: [
      {h:'Khabar (الخبر)', p:'Khabar menyampaikan informasi. Contoh: الطَّالِبُ مُجْتَهِدٌ (Siswa itu rajin). Khabar dapat disampaikan tanpa penegasan, atau disertai perangkat penegasan sesuai keadaan pendengar.'},
      {h:'Insya’ (الإنشاء)', p:'Insya’ mencakup ungkapan seperti perintah (الأمر), larangan (النهي), pertanyaan (الاستفهام), panggilan (النداء), dan harapan (التمني). Makna pragmatisnya ditentukan oleh bentuk dan konteks.'},
      {h:'Tingkat penegasan khabar', p:'Dalam pengantar balaghah, khabar sering dijelaskan berdasarkan keadaan pendengar: ibtida’i (tanpa penegasan), thalabi (dengan penegasan ketika ada keraguan), dan inkari (penegasan lebih kuat ketika ada pengingkaran). Klasifikasi ini merupakan panduan retoris, bukan rumus mutlak untuk semua konteks.'}
    ],
    examples: [
      {ar:'الْعِلْمُ نَافِعٌ', tr:'Ilmu itu bermanfaat.', note:'Khabar: menyampaikan informasi yang dapat dinilai benar atau salah.'},
      {ar:'اِقْرَأِ الْكِتَابَ', tr:'Bacalah buku itu!', note:'Insya’ berupa perintah (الأمر), bukan laporan tentang fakta.'},
      {ar:'هَلْ فَهِمْتَ الدَّرْسَ؟', tr:'Apakah kamu memahami pelajaran?', note:'Insya’ berupa pertanyaan (الاستفهام).'}
    ],
    quiz: [
      {q:'Manakah contoh kalimat khabar?', opts:['اِجْلِسْ','هَلْ حَضَرَ؟','الْجَوُّ جَمِيلٌ','يَا طَالِبُ'], a:2, exp:'الْجَوُّ جَمِيلٌ berarti “Cuaca itu indah”. Kalimat ini menyampaikan informasi yang dapat dinilai benar atau salah.'},
      {q:'Kalimat اِكْتُبْ دَرْسَكَ termasuk …', opts:['Khabar','Insya’ berupa perintah','Insya’ berupa panggilan','Khabar inkari'], a:1, exp:'اِكْتُبْ adalah bentuk perintah (الأمر), sehingga termasuk insya’ thalabi.'},
      {q:'Apa fungsi إِنَّ dalam إِنَّ الطَّالِبَ نَاجِحٌ?', opts:['Membentuk pertanyaan','Memberi penegasan','Menyatakan larangan','Memanggil seseorang'], a:1, exp:'إِنَّ merupakan perangkat penegasan yang dapat menguatkan pernyataan.'}
    ]
  },
  {
    id: 'qashr', title: 'Qashr', subtitle: 'Membatasi makna pada unsur tertentu untuk menghasilkan penekanan.',
    intro: 'Qashr (القصر) adalah pengkhususan suatu perkara pada perkara lain melalui cara tertentu. Secara sederhana, qashr membuat makna terasa terbatas atau terfokus, misalnya menegaskan bahwa suatu sifat khusus berlaku pada pihak tertentu dalam konteks yang dimaksud.',
    objectives: ['Menjelaskan pengertian qashr.', 'Mengenali beberapa metode qashr.', 'Menganalisis fungsi pembatasan makna dalam contoh.'],
    sections: [
      {h:'Metode qashr yang umum', p:'Di antara metode yang sering dipelajari ialah النفي والاستثناء (peniadaan dan pengecualian), إنما, pendahuluan unsur kalimat dalam konteks tertentu, serta penggunaan عطف dengan بل atau لا sesuai konstruksi dan maknanya.'},
      {h:'Perhatikan konteks', p:'Qashr tidak selalu berarti pembatasan universal tanpa pengecualian dalam semua keadaan. Makna yang dimaksud bergantung pada konstruksi bahasa dan konteks pembicaraan.'}
    ],
    examples: [
      {ar:'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ', tr:'Sesungguhnya amal-amal bergantung pada niat.', note:'إنما adalah salah satu bentuk yang dikenal dalam pembahasan qashr. Makna lengkapnya tetap dipahami berdasarkan konteks.'},
      {ar:'مَا مُحَمَّدٌ إِلَّا رَسُولٌ', tr:'Muhammad tidak lain hanyalah seorang rasul.', note:'Pola penafian lalu pengecualian (ما ... إلا) menjadi contoh bentuk qashr.'}
    ],
    quiz: [
      {q:'Apa tujuan umum qashr?', opts:['Memperpanjang semua kalimat','Membatasi atau mengkhususkan makna','Mengubah kata menjadi jamak','Menghilangkan hubungan antarkalimat'], a:1, exp:'Qashr berfungsi memfokuskan atau mengkhususkan suatu makna melalui konstruksi tertentu.'},
      {q:'Pola مَا ... إِلَّا termasuk metode …', opts:['Nida’','Nahy','Nafi dan istitsna’','Tasybih'], a:2, exp:'ما ... إلا merupakan pola penafian diikuti pengecualian yang sering digunakan dalam qashr.'},
      {q:'Mengapa konteks penting saat menafsirkan qashr?', opts:['Karena makna pembatasan dapat bergantung pada konteks','Karena qashr tidak memiliki aturan','Karena semua kata berarti sama','Karena konteks menghapus makna kalimat'], a:0, exp:'Konteks membantu menentukan ruang lingkup pembatasan dan maksud retoris kalimat.'}
    ]
  },
  {
    id: 'taqdim', title: 'Taqdim dan Ta’khir', subtitle: 'Mendahulukan atau mengakhirkan unsur kalimat untuk tujuan tertentu.',
    intro: 'Taqdim berarti mendahulukan unsur yang dalam susunan lain dapat datang belakangan, sedangkan ta’khir berarti mengakhirkan unsur tersebut. Dalam balaghah, perubahan urutan dapat memberi penekanan, menunjukkan perhatian khusus, atau membentuk pembatasan makna sesuai konteks.',
    objectives: ['Mendefinisikan taqdim dan ta’khir.', 'Mengenali perubahan urutan unsur kalimat.', 'Menjelaskan kemungkinan efek retoris dari urutan kalimat.'],
    sections: [
      {h:'Urutan dan penekanan', p:'Bahasa Arab memungkinkan variasi susunan sesuai kaidahnya. Unsur yang diletakkan di awal sering memperoleh perhatian lebih besar, tetapi efeknya harus dianalisis berdasarkan struktur gramatikal dan konteks, bukan diasumsikan selalu sama.'},
      {h:'Analisis secara hati-hati', p:'Bandingkan susunan dasar dengan susunan yang didahulukan. Tanyakan unsur mana yang mendapat fokus dan apakah konteks menunjukkan pengkhususan, perhatian, atau alasan kebahasaan lain.'}
    ],
    examples: [
      {ar:'إِيَّاكَ نَعْبُدُ', tr:'Hanya kepada-Mu kami menyembah.', note:'Objek إِيَّاكَ didahulukan sebelum verba نَعْبُدُ. Dalam konteks ayat, susunan ini menunjukkan fokus dan pengkhususan ibadah kepada Allah.'},
      {ar:'قَرَأَ الطَّالِبُ الْكِتَابَ', tr:'Siswa membaca buku itu.', note:'Ini contoh susunan verba, subjek, lalu objek. Perbandingan dengan susunan lain harus mempertimbangkan kaidah dan konteks.'}
    ],
    quiz: [
      {q:'Apa arti taqdim?', opts:['Menghapus kata','Mendahulukan unsur kalimat','Menghubungkan dua kalimat','Membentuk kalimat tanya'], a:1, exp:'Taqdim berarti mendahulukan suatu unsur dalam susunan kalimat.'},
      {q:'Dalam إِيَّاكَ نَعْبُدُ, unsur apa yang didahulukan?', opts:['Verba نعبد','Objek إياك','Keterangan tempat','Partikel pertanyaan'], a:1, exp:'إِيَّاكَ didahulukan sebelum نَعْبُدُ dan memberi fokus retoris.'},
      {q:'Apakah setiap taqdim selalu bermakna pembatasan?', opts:['Ya, selalu','Tidak; perlu dilihat struktur dan konteks','Ya, hanya dalam prosa','Tidak ada efek makna sama sekali'], a:1, exp:'Taqdim dapat memiliki beberapa tujuan. Efek pembatasan tidak boleh disimpulkan tanpa melihat konteks.'}
    ]
  },
  {
    id: 'fashl', title: 'Fashl dan Washl', subtitle: 'Memisahkan atau menghubungkan kalimat sesuai hubungan maknanya.',
    intro: 'Fashl (الفصل) adalah tidak menghubungkan satu kalimat dengan kalimat sebelumnya menggunakan huruf penghubung tertentu, sedangkan washl (الوصل) adalah menghubungkannya, khususnya dengan waw (و). Kajian ini mempertimbangkan hubungan makna dan struktur antarkalimat.',
    objectives: ['Membedakan fashl dan washl.', 'Memahami peran waw sebagai penghubung.', 'Menganalisis hubungan antarkalimat dalam konteks.'],
    sections: [
      {h:'Washl (الوصل)', p:'Washl menghubungkan kalimat ketika hubungan di antara keduanya mendukung penggunaan penghubung. Waw tidak sekadar hiasan; hubungan makna dan struktur tetap perlu diperiksa.'},
      {h:'Fashl (الفصل)', p:'Fashl tidak menggunakan penghubung antara dua kalimat. Dalam balaghah, keputusan memisahkan dapat terkait dengan kuatnya hubungan, perbedaan fungsi, atau pertimbangan retoris lainnya. Penentuannya memerlukan analisis konteks.'}
    ],
    examples: [
      {ar:'جَاءَ زَيْدٌ وَذَهَبَ عَمْرٌو', tr:'Zaid datang dan Amr pergi.', note:'Waw menghubungkan dua peristiwa dalam satu rangkaian ujaran. Contoh ini menunjukkan bentuk penghubungan secara umum.'},
      {ar:'الشَّمْسُ طَالِعَةٌ، الْجَوُّ مُعْتَدِلٌ', tr:'Matahari sedang terbit; cuaca sedang sejuk.', note:'Dua kalimat ditampilkan tanpa waw. Analisis balaghah yang lengkap perlu menilai hubungan keduanya dalam konteks.'}
    ],
    quiz: [
      {q:'Apa yang dimaksud washl dalam pembahasan ini?', opts:['Menghubungkan kalimat','Menghilangkan subjek','Membatasi makna','Menyatakan perintah'], a:0, exp:'Washl adalah menghubungkan kalimat, lazimnya dengan waw, ketika hubungan makna mendukungnya.'},
      {q:'Apa ciri umum fashl?', opts:['Selalu memakai إنما','Tidak menggunakan penghubung antara kalimat yang dibahas','Selalu berbentuk pertanyaan','Harus memiliki dua objek'], a:1, exp:'Fashl berarti memisahkan kalimat tanpa penghubung tertentu di antara keduanya.'},
      {q:'Apa yang perlu diperhatikan saat memilih fashl atau washl?', opts:['Panjang kata saja','Hubungan makna dan konteks','Jumlah huruf hijaiyah saja','Terjemahan literal saja'], a:1, exp:'Hubungan antarkalimat dan konteks menentukan pilihan retoris yang tepat.'}
    ]
  },
  {
    id: 'ijaz', title: 'Ijaz, Ithnab, dan Musawah', subtitle: 'Memilih panjang ungkapan sesuai kebutuhan makna.',
    intro: 'Ijaz (الإيجاز), ithnab (الإطناب), dan musawah (المساواة) membahas perbandingan antara panjang ungkapan dan makna yang disampaikan. Ijaz menyampaikan makna luas dengan ungkapan ringkas; ithnab menambahkan unsur yang memiliki tujuan retoris; musawah menyampaikan makna dengan kadar ungkapan yang seimbang.',
    objectives: ['Membedakan ijaz, ithnab, dan musawah.', 'Mengenali tujuan penambahan atau peringkasan ungkapan.', 'Menilai kesesuaian panjang kalimat dengan tujuan komunikasi.'],
    sections: [
      {h:'Ijaz (الإيجاز)', p:'Ungkapan ringkas tetapi tetap menyampaikan maksud dengan jelas. Ringkas bukan berarti menghilangkan unsur penting hingga makna menjadi kabur.'},
      {h:'Ithnab (الإطناب)', p:'Ungkapan lebih panjang karena ada manfaat retoris, misalnya penegasan, perincian, atau penjelasan. Tambahan yang tidak memberi manfaat bukan otomatis ithnab yang baik.'},
      {h:'Musawah (المساواة)', p:'Panjang ungkapan seimbang dengan makna yang hendak disampaikan. Tidak ada pemadatan atau perluasan yang menonjol.'}
    ],
    examples: [
      {ar:'وَلَكُمْ فِي الْقِصَاصِ حَيَاةٌ', tr:'Dalam qisas itu terdapat kehidupan bagi kalian.', note:'Contoh yang lazim dibahas sebagai ijaz: ungkapan singkat memuat makna yang luas.'},
      {ar:'رَأَيْتُهُ بِعَيْنِي', tr:'Aku melihatnya dengan mataku sendiri.', note:'Frasa “dengan mataku sendiri” dapat berfungsi sebagai penegasan dalam konteks tertentu, contoh sederhana dari perluasan ungkapan untuk tujuan retoris.'}
    ],
    quiz: [
      {q:'Ungkapan ringkas yang tetap memuat makna secara efektif disebut …', opts:['Ithnab','Musawah','Ijaz','Fashl'], a:2, exp:'Ijaz menyampaikan makna dengan ungkapan ringkas tanpa menghilangkan kejelasan yang diperlukan.'},
      {q:'Apa ciri ithnab yang baik?', opts:['Selalu memakai kata sebanyak mungkin','Ada tambahan ungkapan yang memiliki manfaat retoris','Tidak menyampaikan makna','Selalu menghilangkan penegasan'], a:1, exp:'Ithnab memperluas ungkapan karena ada tujuan seperti penegasan atau perincian.'},
      {q:'Musawah merujuk pada …', opts:['Keseimbangan kadar ungkapan dan makna','Kalimat perintah','Pembatasan dengan pengecualian','Pemisahan dua kalimat'], a:0, exp:'Musawah adalah kesepadanan kadar ungkapan dengan makna yang disampaikan.'}
    ]
  }
];

function App() {
  const [page, setPage] = useState('home');
  const [activeId, setActiveId] = useState(chapters[0].id);
  const [quizMode, setQuizMode] = useState('chapter');
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const active = chapters.find(c => c.id === activeId) || chapters[0];

  const quizQuestions = useMemo(() => {
    if (quizMode === 'combined') return chapters.flatMap(c => c.quiz.map((q, i) => ({...q, chapter: c.title, id: `${c.id}-${i}`})));
    return active.quiz.map((q, i) => ({...q, chapter: active.title, id: `${active.id}-${i}`}));
  }, [quizMode, active]);

  const score = quizQuestions.reduce((sum, q) => sum + (answers[q.id] === q.a ? 1 : 0), 0);
  const startQuiz = (id, mode = 'chapter') => {
    setActiveId(id || chapters[0].id); setQuizMode(mode); setAnswers({}); setSubmitted(false); setPage('quiz'); window.scrollTo(0,0);
  };
  const openChapter = id => { setActiveId(id); setPage('lesson'); window.scrollTo(0,0); };
  const resetQuiz = () => { setAnswers({}); setSubmitted(false); };
  if (!authReady) {
    return <div>Memeriksa sesi akun...</div>;
  }

  if (!session) {
    return <Auth onLogin={() => {}} />;
  }
  return <div className="app-shell">
    <header className="topbar">
      <button className="brand" onClick={() => setPage('home')} aria-label="Kembali ke beranda"><span className="brand-mark"><Sparkles size={20}/></span><span><strong>Balaghah Builder</strong><small>RUANG BELAJAR ILMU MA’ANI</small></span></button>
      <button className="menu-toggle" onClick={() => setMobileNav(!mobileNav)}><Menu size={20}/> Menu</button>
      <nav className={mobileNav ? 'nav open' : 'nav'}>
        <button className={page === 'home' ? 'nav-active' : ''} onClick={() => {setPage('home');setMobileNav(false)}}>Beranda</button>
        <button className={page === 'materials' || page === 'lesson' ? 'nav-active' : ''} onClick={() => {setPage('materials');setMobileNav(false)}}>Materi</button>
        <button className={page === 'practice' || page === 'quiz' ? 'nav-active' : ''} onClick={() => {setPage('practice');setMobileNav(false)}}>Latihan Soal</button>
        <button className="nav-cta" onClick={() => startQuiz(chapters[0].id, 'combined')}>Evaluasi Gabungan <ChevronRight size={16}/></button>
      </nav>
    </header>

    <main>
      {page === 'home' && <>
        <section className="hero">
          <div className="eyebrow"><span></span> PLATFORM PEMBELAJARAN BALAGHAH</div>
          <h1>Memahami makna.<br/><em>Mengasah rasa bahasa.</em></h1>
          <p className="hero-copy">Pelajari Ilmu Ma’ani melalui materi terstruktur, contoh bahasa Arab, latihan per bab, dan evaluasi dengan pembahasan.</p>
          <div className="hero-actions"><button className="primary-btn" onClick={() => setPage('materials')}>Mulai belajar <ChevronRight size={18}/></button><button className="secondary-btn" onClick={() => startQuiz(chapters[0].id,'combined')}>Kerjakan evaluasi</button></div>
          <div className="hero-stats"><div><strong>06</strong><span>Bab materi</span></div><div><strong>18+</strong><span>Soal latihan</span></div><div><strong>01</strong><span>Evaluasi gabungan</span></div></div>
          <div className="hero-decoration" aria-hidden="true">المعاني</div>
        </section>
        <section className="section-block">
          <div className="section-heading"><div><div className="eyebrow">JALUR PEMBELAJARAN</div><h2>Belajar langkah demi langkah</h2><p>Mulai dari konsep dasar, pahami contoh, lalu uji pemahaman.</p></div><button className="text-btn" onClick={() => setPage('materials')}>Lihat semua materi <ChevronRight size={17}/></button></div>
          <ChapterGrid onOpen={openChapter} chapters={chapters.slice(0,3)} compact={false}/>
        </section>
        <section className="callout"><div className="callout-icon"><GraduationCap size={26}/></div><div><h2>Sudah mempelajari semua bab?</h2><p>Uji pemahaman lintas topik melalui evaluasi gabungan dan baca pembahasan setiap jawaban.</p></div><button className="primary-btn" onClick={() => startQuiz(chapters[0].id,'combined')}>Mulai evaluasi <ChevronRight size={18}/></button></section>
      </>}

      {page === 'materials' && <section className="page-section">
        <BackButton onClick={() => setPage('home')} />
        <div className="eyebrow">RUANG BELAJAR</div><h1 className="page-title">Materi Ilmu Ma’ani</h1><p className="page-lead">Enam bab berisi konsep, contoh Arab, terjemahan, dan analisis balaghah.</p>
        <ChapterGrid onOpen={openChapter} chapters={chapters}/>
      </section>}

      {page === 'lesson' && <section className="page-section lesson-page">
        <BackButton onClick={() => setPage('materials')} />
        <div className="eyebrow">BAB PEMBELAJARAN</div><h1 className="page-title">{active.title}</h1><p className="page-lead">{active.subtitle}</p>
        <div className="lesson-layout"><aside className="lesson-nav"><strong>Daftar bab</strong>{chapters.map((c,i)=><button key={c.id} className={c.id===active.id?'lesson-nav-active':''} onClick={()=>{setActiveId(c.id);window.scrollTo(0,0)}}><span>{String(i+1).padStart(2,'0')}</span>{c.title}</button>)}</aside>
          <article className="lesson-content">
            <div className="content-card"><h2>Pengantar</h2><p>{active.intro}</p></div>
            <div className="content-card"><h2>Tujuan pembelajaran</h2><ul className="objective-list">{active.objectives.map((o,i)=><li key={i}><CheckCircle2 size={18}/>{o}</li>)}</ul></div>
            {active.sections.map((s,i)=><div className="content-card" key={i}><h2>{s.h}</h2><p>{s.p}</p></div>)}
            <div className="content-card"><h2>Contoh dan analisis</h2>{active.examples.map((e,i)=><div className="example-block" key={i}><div className="arabic" lang="ar" dir="rtl">{e.ar}</div><p className="translation">{e.tr}</p><p>{e.note}</p></div>)}</div>
            <div className="content-card takeaway"><h2>Rangkuman</h2><p>{active.title}: pahami definisi, kenali bentuknya dalam contoh, lalu tentukan fungsi retoris berdasarkan konteks. Hindari menyimpulkan makna hanya dari satu kata tanpa membaca susunan kalimat secara utuh.</p><button className="primary-btn" onClick={()=>startQuiz(active.id)}>Kerjakan latihan bab ini <ChevronRight size={18}/></button></div>
            <div className="chapter-switch"><button className="secondary-btn" disabled={chapters[0].id===active.id} onClick={()=>setActiveId(chapters[Math.max(0,chapters.findIndex(c=>c.id===active.id)-1)].id)}>Bab sebelumnya</button><button className="secondary-btn" disabled={chapters[chapters.length-1].id===active.id} onClick={()=>setActiveId(chapters[Math.min(chapters.length-1,chapters.findIndex(c=>c.id===active.id)+1)].id)}>Bab berikutnya <ChevronRight size={16}/></button></div>
          </article>
        </div>
      </section>}

      {page === 'practice' && <section className="page-section">
        <div className="eyebrow">UJI PEMAHAMAN</div><h1 className="page-title">Latihan per Materi</h1><p className="page-lead">Pilih bab yang telah dipelajari, jawab soal, lalu periksa nilai dan pembahasannya.</p>
        <ChapterGrid chapters={chapters} practice onOpen={id=>startQuiz(id)}/>
        <div className="combined-card"><div className="combined-symbol"><ClipboardCheck size={25}/></div><div><div className="eyebrow">EVALUASI AKHIR</div><h2>Latihan Gabungan</h2><p>18 soal pilihan ganda dari seluruh bab. Nilai dan pembahasan ditampilkan setelah jawaban diperiksa.</p></div><button className="primary-btn" onClick={()=>startQuiz(chapters[0].id,'combined')}>Mulai evaluasi <ChevronRight size={18}/></button></div>
      </section>}

      {page === 'quiz' && <section className="page-section quiz-page">
        <BackButton onClick={()=>setPage('practice')}/>
        <div className="eyebrow">{quizMode==='combined'?'EVALUASI AKHIR':'LATIHAN PER BAB'}</div><h1 className="page-title">{quizMode==='combined'?'Evaluasi Gabungan Ilmu Ma’ani':`Latihan ${active.title}`}</h1><p className="page-lead">{quizMode==='combined'?'Uji pemahaman dari seluruh enam bab.':'Pilih jawaban terbaik untuk setiap pertanyaan.'}</p>
        {submitted && <div className="score-panel"><div className="score-number">{Math.round(score/quizQuestions.length*100)}<small>/100</small></div><div><h2>{score} dari {quizQuestions.length} jawaban benar</h2><p>{score/quizQuestions.length>=0.8?'Pemahaman kamu sudah kuat. Tetap periksa pembahasan untuk memperdalam analisis.':score/quizQuestions.length>=0.6?'Cukup baik. Pelajari kembali pembahasan pada soal yang belum tepat.':'Baca kembali materi, lalu ulangi latihan untuk memperkuat pemahaman.'}</p></div><button className="secondary-btn" onClick={resetQuiz}><RotateCcw size={16}/> Ulangi</button></div>}
        <div className="quiz-progress"><span>{Object.keys(answers).length} dari {quizQuestions.length} dijawab</span><div><span style={{width:`${Object.keys(answers).length/quizQuestions.length*100}%`}}/></div></div>
        <div className="quiz-list">{quizQuestions.map((q,i)=><div className="question-card" key={q.id}><div className="question-meta"><span>SOAL {String(i+1).padStart(2,'0')}</span>{quizMode==='combined'&&<span>{q.chapter}</span>}</div><h2>{q.q}</h2><div className="answer-options">{q.opts.map((opt,j)=>{const chosen=answers[q.id]===j;let cls='answer-option';if(chosen)cls+=' answer-selected';if(submitted&&j===q.a)cls+=' answer-correct';if(submitted&&chosen&&j!==q.a)cls+=' answer-wrong';return <button key={j} disabled={submitted} className={cls} onClick={()=>setAnswers(prev=>({...prev,[q.id]:j}))}><span className="option-letter">{String.fromCharCode(65+j)}</span><span>{opt}</span>{submitted&&j===q.a&&<CheckCircle2 size={18} className="result-icon"/>}{submitted&&chosen&&j!==q.a&&<XCircle size={18} className="result-icon"/>}</button>})}</div>{submitted&&<div className="explanation"><strong>Pembahasan</strong><p>{q.exp}</p></div>}</div>)}</div>
        {!submitted?<button className="primary-btn submit-btn" disabled={Object.keys(answers).length!==quizQuestions.length} onClick={()=>{setSubmitted(true);window.scrollTo(0,0)}}>Periksa jawaban <CheckCircle2 size={18}/></button>:<div className="quiz-end-actions"><button className="secondary-btn" onClick={()=>setPage('practice')}>Kembali ke daftar latihan</button><button className="primary-btn" onClick={()=>{if(quizMode==='combined'){setPage('materials')}else{const idx=chapters.findIndex(c=>c.id===activeId);startQuiz(chapters[(idx+1)%chapters.length].id)}}}>{quizMode==='combined'?'Baca materi':'Latihan bab berikutnya'} <ChevronRight size={18}/></button></div>}
      </section>}
    </main>
    <footer><div className="footer-brand"><span className="brand-mark"><Sparkles size={17}/></span><strong>Balaghah Builder</strong></div><p>Media belajar Ilmu Ma’ani. Gunakan materi sebagai pengantar dan cocokkan analisis lanjutan dengan kitab atau rujukan akademik yang digunakan di kelas.</p><span className="copyright">RUANG BELAJAR · ILMU MA’ANI</span></footer>
  </div>;
}

function ChapterGrid({chapters: list, onOpen, practice=false, compact=false}) {
  const icons = [BookOpen, Sparkles, GraduationCap, ClipboardCheck, BookOpen, Sparkles];
  return <div className={`chapter-grid ${compact?'compact-grid':''}`}>{list.map((c,i)=>{const Icon=icons[chapters.findIndex(x=>x.id===c.id)]||BookOpen;return <button className="chapter-card" key={c.id} onClick={()=>onOpen(c.id)}><div className="card-icon"><Icon size={21}/></div><span className="card-number">BAB {String(chapters.findIndex(x=>x.id===c.id)+1).padStart(2,'0')}</span><h3>{practice?`Latihan ${c.title}`:c.title}</h3><p>{practice?`Uji pemahaman konsep ${c.title.toLowerCase()} melalui soal pilihan ganda.`:c.subtitle}</p><div className="card-bottom"><span>{practice?'3 soal + pembahasan':'Materi, contoh & analisis'}</span><ChevronRight size={18}/></div></button>})}</div>;
}
function BackButton({onClick}) { return <button className="back-btn" onClick={onClick}><ArrowLeft size={16}/> Kembali</button>; }

export default App;
