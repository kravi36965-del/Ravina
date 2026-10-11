import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, AudioLines, Cake, Check, ChevronDown,
  CircleHelp, Clock3, Copy, Gift, Heart, ImagePlus, LockKeyhole, Menu, MessageCircleHeart,
  MoonStar, PartyPopper, Play, Plus, RotateCcw, Sparkles, Stars, WandSparkles, X,
} from 'lucide-react'

type Scene = { id: number; type: string; title: string; text: string; emoji: string }
type Occasion = { name: string; emoji: string; category: string; color: string }

const occasions: Occasion[] = [
  { name: 'Birthday', emoji: '🎂', category: 'Celebrate', color: 'pink' },
  { name: 'Anniversary', emoji: '💞', category: 'Love', color: 'rose' },
  { name: "Valentine's Day", emoji: '💌', category: 'Love', color: 'pink' },
  { name: 'Proposal', emoji: '💍', category: 'Love', color: 'violet' },
  { name: 'Wedding', emoji: '💐', category: 'Love', color: 'rose' },
  { name: 'Engagement', emoji: '🥂', category: 'Love', color: 'gold' },
  { name: 'Farewell', emoji: '🌅', category: 'Milestones', color: 'blue' },
  { name: 'Friendship Day', emoji: '🫶', category: 'Friends & family', color: 'orange' },
  { name: "Mother's Day", emoji: '🌷', category: 'Friends & family', color: 'pink' },
  { name: "Father's Day", emoji: '🧡', category: 'Friends & family', color: 'orange' },
  { name: 'Graduation', emoji: '🎓', category: 'Milestones', color: 'blue' },
  { name: 'Exam Results', emoji: '🎉', category: 'Milestones', color: 'gold' },
  { name: 'Job Promotion', emoji: '🚀', category: 'Milestones', color: 'blue' },
  { name: 'Congratulations', emoji: '🏆', category: 'Celebrate', color: 'gold' },
  { name: 'Apology', emoji: '🕊️', category: 'Just because', color: 'blue' },
  { name: 'Thank You', emoji: '💛', category: 'Just because', color: 'gold' },
  { name: 'Welcome Home', emoji: '🏡', category: 'Friends & family', color: 'orange' },
  { name: 'Baby Shower', emoji: '🧸', category: 'Celebrate', color: 'pink' },
  { name: 'Retirement', emoji: '🌴', category: 'Milestones', color: 'blue' },
  { name: 'Festivals & Holidays', emoji: '✨', category: 'Celebrate', color: 'violet' },
  { name: 'Custom Occasion', emoji: '🪄', category: 'Just because', color: 'violet' },
]

const templates = [
  { title: 'A little birthday magic', occasion: 'Birthday', vibe: 'Magical', emoji: '🎂', color: 'template-pink', description: 'A candlelit reveal with a wish made just for them.' },
  { title: 'Our little universe', occasion: 'Anniversary', vibe: 'Romantic', emoji: '🌌', color: 'template-violet', description: 'Memories, milestones and a message from the heart.' },
  { title: 'Best-friend energy', occasion: 'Friendship Day', vibe: 'Funny', emoji: '🪩', color: 'template-orange', description: 'Inside jokes, photos and a playful final reveal.' },
  { title: 'You did it!', occasion: 'Graduation', vibe: 'Cinematic', emoji: '🎓', color: 'template-blue', description: 'Celebrate every late night and every big win.' },
  { title: 'A note for you', occasion: 'Thank You', vibe: 'Minimal', emoji: '💌', color: 'template-cream', description: 'Simple, thoughtful and full of gratitude.' },
  { title: 'The big question', occasion: 'Proposal', vibe: 'Luxury', emoji: '💍', color: 'template-rose', description: 'A slow, elegant build to a moment to remember.' },
]

const startingScenes: Scene[] = [
  { id: 1, type: 'Opening', title: 'A little something for you…', text: 'Someone made something special. Ready?', emoji: '🌙' },
  { id: 2, type: 'Memory reveal', title: 'Our favourite moments', text: 'Every memory with you deserves its own little sparkle.', emoji: '📸' },
  { id: 3, type: 'Personal note', title: 'A message from the heart', text: 'You make ordinary days feel a little more magical.', emoji: '💌' },
  { id: 4, type: 'Final reveal', title: 'This is your moment!', text: 'Here is to more memories, more laughter and more magic.', emoji: '✨' },
]

const filters = ['All styles', 'Romantic', 'Emotional', 'Funny', 'Cute', 'Magical', 'Cinematic', 'Minimal', 'Luxury', 'Colorful', 'Professional']

export default function App() {
  const [page, setPage] = useState<'home' | 'create' | 'templates' | 'editor'>('home')
  const [selectedOccasion, setSelectedOccasion] = useState('Birthday')
  const [idea, setIdea] = useState('')
  const [recipient, setRecipient] = useState('Someone special')
  const [sender, setSender] = useState('Someone who cares')
  const [tone, setTone] = useState('Magical')
  const [language, setLanguage] = useState('English')
  const [activeFilter, setActiveFilter] = useState('All styles')
  const [scenes, setScenes] = useState<Scene[]>(startingScenes)
  const [activeScene, setActiveScene] = useState(1)
  const [showPreview, setShowPreview] = useState(false)
  const [notice, setNotice] = useState('')
  const [customOccasion, setCustomOccasion] = useState('')
  const [showOccasions, setShowOccasions] = useState(false)

  const visibleTemplates = useMemo(() => templates.filter(t => activeFilter === 'All styles' || t.vibe === activeFilter), [activeFilter])
  const currentScene = scenes.find(s => s.id === activeScene) ?? scenes[0]

  function beginCreate(occasion = selectedOccasion) {
    setSelectedOccasion(occasion)
    setPage('create')
    setShowPreview(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function makePlan() {
    const cleanIdea = idea.trim()
    if (!cleanIdea) {
      setNotice('Add a sentence about your dream ravina first. You can keep it simple!')
      return
    }
    const name = recipient.trim() || 'Someone special'
    const languageNote = language === 'Hindi' ? 'A little ravina, just for you.' : language === 'Hinglish' ? 'Tumhare liye ek chhota sa ravina.' : 'A little ravina, just for you.'
    const newScenes: Scene[] = [
      { id: Date.now() + 1, type: 'Opening', title: `Hey ${name}…`, text: `Something special is waiting for you. ${cleanIdea.slice(0, 150)}`, emoji: '🌙' },
      { id: Date.now() + 2, type: 'Reveal', title: 'Let the magic begin', text: `A ${tone.toLowerCase()} moment, made especially for ${name}.`, emoji: '✨' },
      { id: Date.now() + 3, type: 'Personal note', title: 'A note from the heart', text: `${languageNote} — ${sender.trim() || 'Someone who cares'}`, emoji: '💌' },
      { id: Date.now() + 4, type: 'Final reveal', title: `Happy ${selectedOccasion}!`, text: `This little universe was made for you, ${name}. Keep this moment close.`, emoji: '🎁' },
    ]
    setScenes(newScenes)
    setActiveScene(newScenes[0].id)
    setNotice('Demo plan created. Connect an AI API later to generate truly AI-written plans.')
    setPage('editor')
    setShowPreview(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function useTemplate(template: typeof templates[number]) {
    setSelectedOccasion(template.occasion)
    setTone(template.vibe)
    setScenes([
      { id: Date.now() + 1, type: 'Opening', title: template.title, text: template.description, emoji: template.emoji },
      { id: Date.now() + 2, type: 'Memory reveal', title: 'A memory worth keeping', text: 'Add a photo and a caption that only you two understand.', emoji: '📸' },
      { id: Date.now() + 3, type: 'Personal note', title: 'Made just for you', text: 'Some people make life brighter just by being in it.', emoji: '💌' },
      { id: Date.now() + 4, type: 'Final reveal', title: 'One last little ravina', text: 'The best part of a memory is getting to make more.', emoji: '🎁' },
    ])
    setActiveScene(Date.now() + 1)
    setPage('editor')
    setNotice('Template loaded. Edit the scene text and preview your ravina.')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function updateScene(field: 'title' | 'text' | 'emoji', value: string) {
    setScenes(old => old.map(scene => scene.id === activeScene ? { ...scene, [field]: value } : scene))
  }
  function addScene() {
    const scene: Scene = { id: Date.now(), type: 'New scene', title: 'A new little moment', text: 'Write something meaningful here…', emoji: '✨' }
    setScenes(old => [...old, scene])
    setActiveScene(scene.id)
  }
  function deleteScene(id: number) {
    if (scenes.length < 2) { setNotice('Keep at least one scene in your ravina.'); return }
    const next = scenes.filter(s => s.id !== id)
    setScenes(next)
    if (activeScene === id) setActiveScene(next[0].id)
  }
  function moveScene(id: number, direction: -1 | 1) {
    setScenes(old => {
      const index = old.findIndex(s => s.id === id)
      const target = index + direction
      if (index < 0 || target < 0 || target >= old.length) return old
      const copy = [...old]
      ;[copy[index], copy[target]] = [copy[target], copy[index]]
      return copy
    })
  }
  
async function copyDemoLink() {
  const fakeLink = `rivana.demo/${selectedOccasion.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Math.random().toString(36).slice(2, 8)}`

  try {
    await navigator.clipboard.writeText(fakeLink)
    setNotice(`Demo link copied: ${fakeLink}. This is not a published public link yet.`)
  } catch {
    setNotice(`Demo-only preview link: ${fakeLink}. Public publishing is not configured yet.`)
  }
}


  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setPage('home')} aria-label="ravina home"><span className="brand-mark"><Sparkles size={19} /></span><span>ravina<span className="brand-accent">verse</span></span></button>
        <nav className="desktop-nav" aria-label="Main navigation">
          <button onClick={() => setPage('templates')}>Explore templates</button>
          <button onClick={() => beginCreate()}>How it works</button>
          <button onClick={() => setNotice('Dashboard and saved projects will be added in a later milestone.')}>My ravinas <span className="soon-tag">SOON</span></button>
        </nav>
        <div className="nav-actions"><button className="nav-login" onClick={() => setNotice('Accounts will be added in a later milestone.')}>Log in</button><button className="button button-small" onClick={() => beginCreate()}>Create a ravina <ArrowUpRight size={16}/></button><button className="mobile-menu" onClick={() => setShowOccasions(v => !v)} aria-label="Toggle menu"><Menu/></button></div>
      </header>
      {showOccasions && <div className="mobile-nav"><button onClick={() => { setPage('templates'); setShowOccasions(false) }}>Explore templates</button><button onClick={() => { beginCreate(); setShowOccasions(false) }}>Create a ravina</button></div>}

      <AnimatePresence mode="wait">
        {page === 'home' && <motion.main key="home" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .22 }}>
          <section className="hero section-wrap">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-dot"/> MAKE SOMEONE FEEL EXTRA SPECIAL</div>
              <h1>Your idea.<br/><span className="gradient-text">Your ravina.</span><br/>Your way.</h1>
              <p className="hero-description">Turn your feelings into a little bit of magic. Create personalized digital ravinas filled with memories, heartfelt words and delightful moments.</p>
              <div className="hero-buttons"><button className="button button-large" onClick={() => beginCreate()}>Create your ravina <ArrowRight size={18}/></button><button className="button button-ghost button-large" onClick={() => setPage('templates')}><Play size={16} fill="currentColor"/> Explore templates</button></div>
              <div className="social-proof"><div className="avatar-stack"><span>💗</span><span>🎂</span><span>✨</span><span>🫶</span></div><div><strong>A little magic goes a long way</strong><small>Made for the people who matter most.</small></div></div>
            </div>
            <div className="hero-art" aria-label="Decorative ravina gift illustration">
              <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="art-spark spark-one">✦</div><div className="art-spark spark-two">✧</div><div className="art-spark spark-three">✦</div>
              <div className="float-note note-left"><Heart size={15} fill="currentColor"/><span>made with love</span></div>
              <div className="gift-scene"><div className="gift-glow"/><div className="gift-lid"><div className="ribbon-loop loop-left"/><div className="ribbon-loop loop-right"/><div className="ribbon-knot"/></div><div className="gift-box"><div className="gift-ribbon"/><div className="gift-star">✦</div></div><div className="gift-shadow"/></div>
              <div className="float-note note-right"><Stars size={16}/><span>your kind of magic</span></div><div className="art-caption"><span className="caption-icon"><MessageCircleHeart size={17}/></span><div><strong>A ravina, just for them</strong><small>Every detail tells your story.</small></div><span className="caption-check"><Check size={15}/></span></div>
            </div>
          </section>
          <section className="trust-strip"><div><Sparkles size={17}/><span>Made personal, always</span></div><div><LockKeyhole size={17}/><span>Your memories, your choice</span></div><div><MoonStar size={17}/><span>Magic on your schedule</span></div></section>
          <section className="section-wrap occasion-section"><div className="section-heading"><div><div className="eyebrow">START WITH A FEELING</div><h2>What are we celebrating?</h2><p>Big milestones, little moments, or just because.</p></div><button className="text-link" onClick={() => beginCreate('Custom Occasion')}>All occasions <ArrowRight size={16}/></button></div>
            <div className="occasion-grid">{occasions.slice(0, 8).map(o => <button className={`occasion-card occasion-${o.color}`} key={o.name} onClick={() => beginCreate(o.name)}><span className="occasion-emoji">{o.emoji}</span><span>{o.name}</span><ArrowUpRight size={15} className="occasion-arrow"/></button>)}</div>
          </section>
          <section className="how-section"><div className="section-wrap"><div className="center-heading"><div className="eyebrow">EASY AS A LITTLE HELLO</div><h2>From your heart to their screen.</h2><p>Creating a memorable moment should feel as good as giving one.</p></div><div className="steps-grid"><div className="step-card"><span className="step-number">01</span><div className="step-illustration step-lilac"><Gift size={31}/></div><h3>Pick your vibe</h3><p>Choose an occasion and a template, or dream up something completely your own.</p></div><div className="step-card"><span className="step-number">02</span><div className="step-illustration step-pink"><WandSparkles size={31}/></div><h3>Make it yours</h3><p>Add your words, photos, little ravina and all the details that make it personal.</p></div><div className="step-card"><span className="step-number">03</span><div className="step-illustration step-gold"><PartyPopper size={31}/></div><h3>Reveal the magic</h3><p>Preview your creation and get it ready to share when the moment is right.</p></div></div></div></section>
          <section className="final-cta section-wrap"><div className="cta-stars">✦　✧　✦</div><div><div className="eyebrow">THE BEST ravina FEEL PERSONAL</div><h2>Someone came to mind,<br/>didn't they?</h2><p>Let's make them smile.</p><button className="button button-large" onClick={() => beginCreate()}>Make their day <Heart size={17}/></button></div><div className="cta-orb">💝</div></section>
          <Footer onTemplates={() => setPage('templates')} onCreate={() => beginCreate()}/>
        </motion.main>}

        {page === 'create' && <motion.main key="create" className="section-wrap workspace-page" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}><button className="back-link" onClick={() => setPage('home')}><ArrowLeft size={16}/> Back home</button><div className="workspace-heading"><div className="eyebrow">LET'S MAKE A LITTLE MAGIC</div><h1>What are we creating <span className="gradient-text">today?</span></h1><p>Start with an occasion or tell us the idea that's in your heart.</p></div>
          <div className="create-layout"><div className="create-main"><div className="panel"><div className="panel-title"><span className="panel-icon"><PartyPopper size={19}/></span><div><h2>First, the occasion</h2><p>Pick one to get the ideas flowing.</p></div></div><div className="occasion-picker">{occasions.map(o => <button key={o.name} onClick={() => { setSelectedOccasion(o.name); if(o.name !== 'Custom Occasion') setCustomOccasion('') }} className={`occasion-option ${selectedOccasion === o.name ? 'selected' : ''}`}><span>{o.emoji}</span>{o.name}{selectedOccasion === o.name && <Check size={14}/>}</button>)}</div>{selectedOccasion === 'Custom Occasion' && <input className="text-input custom-occasion" placeholder="Name your occasion…" value={customOccasion} onChange={e => setCustomOccasion(e.target.value)}/>}</div>
          <div className="panel idea-panel"><div className="panel-title"><span className="panel-icon pink-icon"><WandSparkles size={19}/></span><div><h2>Describe your dream ravina</h2><p>Tell us what you imagine. Your idea can be as simple or detailed as you like.</p></div></div><textarea className="idea-textarea" value={idea} onChange={e => setIdea(e.target.value)} placeholder="I want to ravina my best friend at midnight on her birthday. Start with a dark screen and glowing stars, reveal our funniest photos one by one, add a heartfelt note, and finish with a colourful confetti animation…"/><div className="textarea-footer"><span>{idea.length} characters</span><button className="text-link" onClick={() => setIdea('Create a midnight birthday ravina with glowing stars, a countdown, our favourite photos, a heartfelt letter, floating sparkles and a joyful final greeting.')}>Try an example <ArrowUpRight size={14}/></button></div><div className="optional-heading"><span>MAKE IT MORE PERSONAL</span><span className="optional-pill">ALL OPTIONAL</span></div><div className="field-grid"><label>Recipient's name<input className="text-input" value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="Who is it for?"/></label><label>Your name<input className="text-input" value={sender} onChange={e => setSender(e.target.value)} placeholder="From…"/></label><label>Emotional tone<select className="text-input" value={tone} onChange={e => setTone(e.target.value)}>{['Magical','Romantic','Emotional','Funny','Cute','Cinematic','Minimal','Luxury','Professional'].map(x => <option key={x}>{x}</option>)}</select></label><label>Language<select className="text-input" value={language} onChange={e => setLanguage(e.target.value)}>{['English','Hindi','Hinglish','Spanish','French'].map(x => <option key={x}>{x}</option>)}</select></label></div><button className="button button-large full-button" onClick={makePlan}><Sparkles size={18}/> Create my ravina plan <ArrowRight size={18}/></button><p className="demo-note"><CircleHelp size={14}/> This milestone uses a clearly labelled local demo planner. Real AI will be connected in a later phase.</p></div></div>
          <aside className="create-aside"><div className="aside-card aside-gradient"><div className="aside-glow"/><span className="aside-top-icon"><MoonStar size={22}/></span><div className="eyebrow">A LITTLE EXTRA MAGIC</div><h3>Make the moment unforgettable.</h3><p>Your ravina can be a tiny note, a whole story, or anything in between.</p><div className="aside-feature"><span>✦</span> Your words, your way</div><div className="aside-feature"><span>✦</span> Photos and memories</div><div className="aside-feature"><span>✦</span> A reveal on your schedule</div></div><div className="aside-card"><div className="aside-card-heading"><Clock3 size={18}/><strong>Midnight Magic</strong><span className="later-tag">COMING LATER</span></div><p>Schedule aprise to unlock at just the right moment. We'll build this after the editor.</p></div><div className="aside-card privacy-card"><LockKeyhole size={19}/><div><strong>Your idea stays yours</strong><p>Nothing is published from this demo wizard.</p></div></div></aside></div><Footer onTemplates={() => setPage('templates')} onCreate={() => beginCreate()}/></motion.main>}

        {page === 'templates' && <motion.main key="templates" className="section-wrap workspace-page" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><button className="back-link" onClick={() => setPage('home')}><ArrowLeft size={16}/> Back home</button><div className="workspace-heading"><div className="eyebrow">A LITTLE INSPIRATION</div><h1>Find your kind of <span className="gradient-text">magic.</span></h1><p>Start with a template, then make every little detail your own.</p></div><div className="filter-row">{filters.map(f => <button key={f} className={`filter-chip ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>{f}</button>)}</div><div className="template-grid">{visibleTemplates.map((t, i) => <motion.article className="template-card" key={t.title} layout><div className={`template-art ${t.color}`}><span className="template-art-spark spark-a">✦</span><span className="template-art-spark spark-b">✧</span><div className="template-emoji">{t.emoji}</div><span className="template-vibe">{t.vibe}</span></div><div className="template-info"><div className="template-meta"><span>{t.occasion}</span><span>•</span><span>Template {String(i+1).padStart(2,'0')}</span></div><h3>{t.title}</h3><p>{t.description}</p><button className="template-use" onClick={() => useTemplate(t)}>Use this template <ArrowRight size={15}/></button></div></motion.article>)}</div>{visibleTemplates.length === 0 && <div className="empty-state"><Sparkles size={25}/><h3>More styles are on the way</h3><p>Try another filter or start with your own idea.</p><button className="button" onClick={() => beginCreate()}>Create with my idea</button></div>}<div className="custom-template-cta"><div><span className="cta-mini-icon"><WandSparkles size={21}/></span><div><h3>Have something totally different in mind?</h3><p>Your imagination doesn't need a template.</p></div></div><button className="button" onClick={() => beginCreate('Custom Occasion')}>Create from scratch <ArrowRight size={16}/></button></div><Footer onTemplates={() => setPage('templates')} onCreate={() => beginCreate()}/></motion.main>}

        {page === 'editor' && <motion.main key="editor" className="section-wrap workspace-page editor-page" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><button className="back-link" onClick={() => setPage('create')}><ArrowLeft size={16}/> Back to idea</button><div className="editor-heading"><div><div className="eyebrow">YOUR ravina STUDIO</div><h1>Make it <span className="gradient-text">feel like you.</span></h1><p>{selectedOccasion} · {scenes.length} scenes · Local demo editor</p></div><div className="editor-actions"><button className="button button-ghost" onClick={() => setShowPreview(v => !v)}><Play size={16}/>{showPreview ? 'Edit scenes' : 'Preview ravina'}</button><button className="button" onClick={copyDemoLink}><Copy size={16}/> Share options</button></div></div>
          {notice && <div className="notice-bar"><Sparkles size={16}/><span>{notice}</span><button onClick={() => setNotice('')} aria-label="Dismiss notice"><X size={16}/></button></div>}
          {!showPreview ? <div className="editor-layout"><aside className="scene-sidebar"><div className="scene-sidebar-title"><strong>Your scenes</strong><span>{scenes.length}</span></div><div className="scene-list">{scenes.map((s, i) => <div key={s.id} className={`scene-row ${activeScene === s.id ? 'active' : ''}`}><button className="scene-select" onClick={() => setActiveScene(s.id)}><span className="scene-index">{String(i+1).padStart(2,'0')}</span><span className="scene-row-emoji">{s.emoji}</span><span className="scene-row-text"><strong>{s.type}</strong><small>{s.title}</small></span></button><div className="scene-move"><button disabled={i===0} onClick={() => moveScene(s.id, -1)} aria-label="Move scene up"><ArrowDown size={13} className="up-arrow"/></button><button disabled={i===scenes.length-1} onClick={() => moveScene(s.id, 1)} aria-label="Move scene down"><ArrowDown size={13}/></button><button onClick={() => deleteScene(s.id)} aria-label="Delete scene"><X size={13}/></button></div></div>)}</div><button className="add-scene" onClick={addScene}><Plus size={16}/> Add a scene</button><div className="sidebar-hint"><Sparkles size={15}/><span>Keep it personal. The best ravina feel like you.</span></div></aside>
          <section className="scene-edit-panel"><div className="edit-panel-top"><div><span className="edit-label">EDITING SCENE</span><h2>{currentScene?.type ?? 'Scene'}</h2></div><span className="draft-pill"><span/> Draft</span></div><label className="edit-field">Scene title<input className="text-input" value={currentScene?.title ?? ''} onChange={e => currentScene && updateScene('title', e.target.value)}/></label><label className="edit-field">Message<textarea className="text-input edit-message" value={currentScene?.text ?? ''} onChange={e => currentScene && updateScene('text', e.target.value)}/></label><label className="edit-field">Scene emoji<input className="text-input emoji-input" value={currentScene?.emoji ?? ''} onChange={e => currentScene && updateScene('emoji', e.target.value)}/></label><div className="edit-coming"><div className="coming-icon"><ImagePlus size={18}/></div><div><strong>Photos, music & animations</strong><p>These controls will be connected in the next milestones. Your current text edits work now.</p></div><span className="later-tag">NEXT</span></div><div className="edit-bottom"><span><Check size={14}/> Changes update the preview instantly</span><button className="button" onClick={() => setShowPreview(true)}>Preview scene <ArrowRight size={16}/></button></div></section>
          <aside className="preview-side"><div className="preview-side-head"><span><Sparkles size={15}/> LIVE PREVIEW</span><span className="preview-dot"/></div><div className="mini-preview"><div className="mini-preview-stars">✦　✧　·　✦</div><div className="mini-preview-emoji">{currentScene?.emoji}</div><div className="mini-preview-kicker">A LITTLE ravina FOR YOU</div><h3>{currentScene?.title}</h3><p>{currentScene?.text}</p><div className="mini-preview-button">Open your ravina <ArrowRight size={13}/></div><div className="mini-preview-bottom">MADE WITH A LITTLE MAGIC ✦</div></div><p className="preview-help">This is a visual preview of the selected scene. No content has been published.</p></aside></div> : <div className="full-preview-wrap"><div className="full-preview"><div className="preview-stars">✦　✧　✦</div><div className="preview-main-emoji">{currentScene?.emoji}</div><div className="eyebrow">A LITTLE ravina FOR YOU</div><h2>{currentScene?.title}</h2><p>{currentScene?.text}</p><div className="preview-pager"><button className="circle-arrow" disabled={scenes.findIndex(s=>s.id===activeScene)===0} onClick={() => setActiveScene(scenes[Math.max(0, scenes.findIndex(s=>s.id===activeScene)-1)].id)}><ArrowLeft size={17}/></button><span>{Math.max(1, scenes.findIndex(s=>s.id===activeScene)+1)} / {scenes.length}</span><button className="circle-arrow" disabled={scenes.findIndex(s=>s.id===activeScene)===scenes.length-1} onClick={() => setActiveScene(scenes[Math.min(scenes.length-1, scenes.findIndex(s=>s.id===activeScene)+1)].id)}><ArrowRight size={17}/></button></div><span className="preview-watermark">Rivana · PREVIEW ONLY</span></div><div className="preview-bottom-actions"><button className="button button-ghost" onClick={() => setShowPreview(false)}><ArrowLeft size={16}/> Back to editor</button><button className="button" onClick={copyDemoLink}><Copy size={16}/> Share options</button></div></div>}
          <Footer onTemplates={() => setPage('templates')} onCreate={() => beginCreate()}/></motion.main>}
      </AnimatePresence>
      {notice && page !== 'editor' && <div className="toast" role="status"><Sparkles size={16}/><span>{notice}</span><button onClick={() => setNotice('')}><X size={15}/></button></div>}
    </div>
  )
}
function Footer({ onTemplates, onCreate }: { onTemplates: () => void; onCreate: () => void }) {
  return <footer className="footer section-wrap"><button className="brand footer-brand" onClick={onCreate}><span className="brand-mark"><Sparkles size={17}/></span><span>ravina<span className="brand-accent">verse</span></span></button><span>Made for the moments that matter. <span className="footer-heart">♥</span></span><div><button onClick={onTemplates}>Templates</button><button onClick={onCreate}>Create a ravina</button><span>© 2026 Rivana · Prototype</span></div></footer>
}
