export const INITIAL_DATA = {
  profile: {
    name: "Aurora Vane",
    title: "Comparative Literature Scholar & Digital Humanities Specialist",
    university: "Harvard University '26",
    tagline: "Deconstructing narrative architectures at the intersection of post-humanism, algorithmic prose, and 19th-century gothic romanticism.",
    bio: "Aurora Vane is an English & Digital Humanities researcher focusing on how LLMs redefine post-structuralist agency, intertextuality in hyper-linked fiction, and the evolution of poetic cadence in digital media. Recipient of the 2025 Mark Twain Undergraduate Essay Prize and Senior Fellow at the Cyber-Narratives Lab.",
    email: "aurora.vane@alumni.harvard.edu",
    statusBadge: "Open for 2026 Fellowships & Literary Commissions",
    location: "Cambridge, MA / Remote",
    socials: {
      github: "https://github.com",
      twitter: "https://x.com",
      substack: "https://substack.com",
      scholar: "https://scholar.google.com"
    },
    stats: {
      publishedEssays: 18,
      citations: 142,
      booksRead2026: 34,
      wordCountDrafted: "320K+"
    }
  },
  works: [
    {
      id: "work-1",
      title: "Algorithmic Hauntology: Ghosts in the Generative Machine",
      category: "Essay",
      topicTag: "Digital Humanities",
      date: "Spring 2026",
      publication: "Oxford Literary Review & Cyber-Poetics Quarterly",
      excerpt: "An exploration of how modern large language models echo Mark Fisher's concept of hauntology, inhabiting the specters of 19th-century prose to forge synthetic memory.",
      readTime: "9 min read",
      sentiment: "Analytical / Philosophical",
      complexityScore: "88/100 (Academic)",
      featured: true,
      content: `### I. The Ghost in the Tokenizer

When Derrida coined *hauntology* in *Specters of Marx* (1993), he described a temporal dislocation where the present is haunted by the lost futures of the past. In 2026, as neural architecture scales into trillion-parameter spaces, we observe a literal manifestation of Derrida's phantom: the transformer model does not create *ex nihilo*, but rather summons historical idioms from its corpus like an automated séance.

Consider the cadence of contemporary synthetic prose. When prompted to articulate grief, a language model defaults to the Victorian elegy—borrowing the structural syntax of Alfred Lord Tennyson and Christina Rossetti. This is not mere mimicry; it is what I term **Tokenized Spectrality**.

> "The machine does not remember the past as history, but re-enacts it as structural probability."

### II. Intertextuality in 8-bit Latent Space

In Roland Barthes' *The Death of the Author*, text is defined as a multi-dimensional space in which a variety of writings, none of them original, blend and clash. Neural networks operationalize Barthesian theory in code. The vector distance between a passage from Virginia Woolf's *To the Lighthouse* and a prompt response describing coastal erosion is measured in cosine similarity.

Here, the boundary between human intent and machine synthesis dissolves into a high-dimensional manifold of semantic embeddings.

### III. Towards a Post-Human Poetics

What happens to the English Major when the archive becomes interactive and generative? We must transition from mere textual critique to **Algorithmic Hermeneutics**—auditing the latent biases, rhythmic cadences, and syntactic anomalies of the synthetic canon.`,
      annotations: [
        { phrase: "hauntology", note: "Mark Fisher extended Derrida's concept to describe cultural stagnation and the persistent repetition of 20th-century aesthetics." },
        { phrase: "Tokenized Spectrality", note: "Author's original term for how transformer embeddings preserve dead linguistic styles across modern context windows." },
        { phrase: "cosine similarity", note: "Mathematical measure of similarity between two non-zero vectors in an inner product space, used in NLP embedding search." }
      ]
    },
    {
      id: "work-2",
      title: "Neon Echoes of Moby-Dick: Cetacean Metaphor in Cyberpunk Worldbuilding",
      category: "Critical Review",
      topicTag: "Comparative Lit",
      date: "Winter 2025",
      publication: "Harvard Journal of Humanities & Modern Fiction",
      excerpt: "Tracing Melville's monomaniacal Captain Ahab to the anti-corporate netrunners of William Gibson and Neal Stephenson.",
      readTime: "6 min read",
      sentiment: "Comparative / Gothic",
      complexityScore: "82/100",
      featured: true,
      content: `Herman Melville’s *Moby-Dick* (1851) is fundamentally a narrative of technological hubris confronting an unquantifiable, primordial force. In 21st-century cyberpunk literature, the Great White Whale is no longer a physical leviathan, but the deep web core of autonomous megacorporations.

### Ahab at the Terminal

When Ahab nails the Spanish doubloon to the mast of the *Pequod*, he commits his crew to a speculative gamble. Similarly, Case in Gibson's *Neuromancer* stakes his central nervous system against the ICE firewall of Wintermute. The deck of the whaling ship transforms into the glowing HUD of the decker's terminal.

The harpoon is replaced by zero-day exploits; the white skin of Moby-Dick becomes the opaque, white noise of raw encrypted data.`,
      annotations: [
        { phrase: "monomaniacal", note: "Exaggerated or obsessive enthusiasm for or devotion to one subject; Ahab's defining psychological trait." },
        { phrase: "ICE firewall", note: "Intrusion Countermeasure Electronics, term popularized by William Gibson in Neuromancer." }
      ]
    },
    {
      id: "work-3",
      title: "Sublingual Syntax: Stanzas for the Synthetic Era",
      category: "Poetry",
      topicTag: "Modern Poetics",
      date: "January 2026",
      publication: "The Boston Review - Young Poets Series",
      excerpt: "A suite of three experimental poems exploring silicon, parchment, copper wire, and lost letters.",
      readTime: "4 min read",
      sentiment: "Lyrical / Luminous",
      complexityScore: "75/100",
      featured: true,
      content: `#### I. Copper & Vellum

We buried the ledger beneath the oak,
where root system meets fibre-optic braid.
The ink did not bleed—
it digitized,
flowing upward into the leaves like green phosphors.

#### II. Margin Notes in Code

\`\`\`
if (grief.length > 0) {
   remember(ghosts.pop());
}
\`\`\`

You left a footnote on line 42 of my heart:
*"Refer to chapter on unsaid things."*

#### III. The Last Bibliophile

The library smells of ozone and old parchment.
Outside, the storm hums in 60 Hertz.
I turn the page—
and touch the thumbprint of a scribe who died in 1492.`,
      annotations: [
        { phrase: "60 Hertz", note: "Standard utility AC power frequency in North America; symbolizes the hum of electrical infrastructure." },
        { phrase: "1492", note: "Refers to the early incunabula printing era following Gutenberg's movable type innovation." }
      ]
    },
    {
      id: "work-4",
      title: "The Architecture of Solitude: Spatial Tropes in Emily Brontë and Virginia Woolf",
      category: "Essay",
      topicTag: "Victorian & Modernism",
      date: "Autumn 2025",
      publication: "The Yale Literary Magazine",
      excerpt: "Examining how spatial isolation in Wuthering Heights evolves into the internal stream-of-consciousness in A Room of One's Own.",
      readTime: "12 min read",
      sentiment: "Analytical",
      complexityScore: "91/100",
      featured: false,
      content: `Spatiality in women’s writing of the 19th and early 20th centuries functions as both a prison and a sanctuary. In Brontë’s *Wuthering Heights*, the moorlands represent wild, uncontained psychological desire, contrasted against the suffocating domestic enclosure of Thrushcross Grange...`,
      annotations: [
        { phrase: "Thrushcross Grange", note: "The polished, civilized estate in Wuthering Heights contrasting with the raw storminess of the Heights." }
      ]
    }
  ],
  bookshelf: [
    {
      id: "book-1",
      title: "Specters of Marx",
      author: "Jacques Derrida",
      coverColor: "from-amber-700 to-yellow-900",
      progress: 100,
      status: "Finished",
      rating: 5,
      notes: "Essential foundation for my thesis on hauntology and generative text."
    },
    {
      id: "book-2",
      title: "Neuromancer",
      author: "William Gibson",
      coverColor: "from-cyan-700 to-blue-900",
      progress: 100,
      status: "Finished",
      rating: 5,
      notes: "Incredible syntactic density and rhythmic prose. A masterclass in worldbuilding."
    },
    {
      id: "book-3",
      title: "The Diamond Age",
      author: "Neal Stephenson",
      coverColor: "from-purple-800 to-indigo-950",
      progress: 72,
      status: "Currently Reading",
      rating: 4.5,
      notes: "Fascinating examination of interactive AI storytelling and Victorian neo-culture."
    },
    {
      id: "book-4",
      title: "To the Lighthouse",
      author: "Virginia Woolf",
      coverColor: "from-emerald-800 to-teal-950",
      progress: 100,
      status: "Finished",
      rating: 5,
      notes: "The 'Time Passes' section is the pinnacle of English modernist prose."
    }
  ],
  accolades: [
    {
      id: "acc-1",
      year: "2025",
      title: "Winner, Mark Twain Essay Prize in Humanities",
      institution: "Harvard Department of English",
      description: "Awarded for outstanding undergraduate research paper on algorithmic intertextuality."
    },
    {
      id: "acc-2",
      year: "2025",
      title: "Senior Research Fellow",
      institution: "Harvard Digital Humanities Lab",
      description: "Led the NLP mapping initiative of 19th-century gothic fiction metaphors."
    },
    {
      id: "acc-3",
      year: "2024",
      title: "Poetry Editor",
      institution: "The Harvard Advocate",
      description: "Curated quarterly issues featuring experimental print and digital poetics."
    }
  ],
  quotes: [
    { text: "Words are, in my not-so-humble opinion, our most inexhaustible source of magic.", author: "J.K. Rowling" },
    { text: "To write is to transform lost time into something permanent.", author: "Virginia Woolf" },
    { text: "The book is a quiet craft that makes a loud noise in the mind.", author: "Umberto Eco" },
    { text: "Syntax is the skeleton of human thought in light.", author: "Aurora Vane" }
  ],
  gallerySettings: {
    intervalSeconds: 5,
    autoPlay: true
  },
  gothicGallery: [
    {
      id: "art-1",
      title: "Wanderer Above the Sea of Fog",
      artist: "Caspar David Friedrich",
      year: "1818",
      movement: "German Gothic Romanticism",
      imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
      description: "The definitive visual statement of the Kantian Sublime. The solitary observer confronts the vast, unquantifiable abyss of nature—a precursor to confronting high-dimensional synthetic latent space."
    },
    {
      id: "art-2",
      title: "The Lady of Shalott & Pre-Raphaelite Cadence",
      artist: "John William Waterhouse",
      year: "1888",
      movement: "Pre-Raphaelite Brotherhood",
      imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
      description: "Illustrating Tennyson’s tragic poem of artistic isolation. The woven web unravels when the artist gazes directly upon reality rather than through reflections."
    },
    {
      id: "art-3",
      title: "Gothic Cloister of the Dark Sublime",
      artist: "Victorian Archival Photograph",
      year: "1872",
      movement: "Victorian Gothic Revival",
      imageUrl: "https://images.unsplash.com/photo-1548625361-195fe57871bc?auto=format&fit=crop&w=1200&q=80",
      description: "Pointed rib-vaulted stone arches casting dramatic chiaroscuro shadows across cold flagstones. The quintessential spatial setting for 19th-century ghost fiction."
    },
    {
      id: "art-4",
      title: "The Illuminated Vellum Codex",
      artist: "Renaissance Monastic Scribe",
      year: "1485",
      movement: "Illuminated Manuscripts",
      imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80",
      description: "Hand-lettered iron gall ink with burnished gold leaf marginalia. Represents the tactile materiality of language before movable type."
    },
    {
      id: "art-5",
      title: "The Scholar's Midnight Sanctuary",
      artist: "Oxford Bodleian Archive",
      year: "1890",
      movement: "Dark Academia",
      imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
      description: "Three-tier oak bookshelves lined with calfskin bindings, illuminated by the warm amber glow of a study lamp amid autumn silence."
    }
  ]
};
