// Objetos parlantes - Script
const MODELS_URL = "https://gen.pollinations.ai/image/models";
const GENERATE_URL = "https://gen.pollinations.ai/image/";

// Plantillas por defecto (desde JSON.txt) para garantizar disponibilidad
const DEFAULT_TEMPLATES = {
  "page_1": {
    "paleta_colores": ["#000000", "#FFFFFF", "#CCFF00", "#9B59B6"],
    "tipografia": {
      "principal": "Sans-serif bold condensada",
      "secundaria": "Sans-serif regular",
      "estilo": "Moderna, impactante, alta legibilidad sobre fondo oscuro"
    },
    "estilo_ilustracion": "Iconografía lineal vectorial (outline) con acento en color neón verde y morado",
    "estructura": "Composición vertical (formato infografía tall) con secciones apiladas verticalmente, conectadas por flechas curvas decorativas",
    "elementos_decorativos": ["flechas curvas de conexión", "iconos outline (personas, puzzle, monitor, escudo)", "textura de puntos difusos en el fondo"],
    "tono_visual": "Oscuro, tecnológico, educativo, moderno"
  },
  "page_2": {
    "paleta_colores": ["#A8DCD9", "#3DB8B0", "#FFFFFF", "#F9C74F", "#F4845F"],
    "tipografia": {
      "principal": "Sans-serif bold",
      "secundaria": "Sans-serif regular",
      "estilo": "Limpia, redondeada, amigable"
    },
    "estilo_ilustracion": "Ilustración vectorial plana (flat design) con personajes y elementos marinos detallados y coloridos",
    "estructura": "Composición vertical con fondo marino ilustrado, burbujas de diálogo distribuidas en distintos niveles de profundidad",
    "elementos_decorativos": ["medusas", "pez espada", "pez payaso", "pez amarillo", "corales coloridos", "algas", "conchas", "burbujas de texto con bordes redondeados"],
    "tono_visual": "Infantil, lúdico, educativo, colorido y fresco"
  },
  "page_3": {
    "paleta_colores": ["#FFFFFF", "#000000", "#ADD8E6", "#F4A460", "#FF69B4", "#9370DB"],
    "tipografia": {
      "principal": "Handwritten/manuscrita irregular",
      "secundaria": "Handwritten/manuscrita",
      "estilo": "Orgánica, infantil, estilo pizarra"
    },
    "estilo_ilustracion": "Ilustración acuarela/lápiz de color con elementos de papelería escolar dispersos al costado; rectángulos de flujo dibujados a mano",
    "estructura": "Diagrama de flujo vertical con cajas de texto estilo sketch conectadas por flechas gruesas negras, fondo tipo hoja de libreta con rayas azules",
    "elementos_decorativos": ["clips de papel", "lápices", "marcadores", "chinchetas", "acuarelas", "tijeras", "regla", "goma de borrar"],
    "tono_visual": "Escolar, creativo, artesanal, cálido"
  },
  "page_4": {
    "paleta_colores": ["#F5F0E8", "#8B4513", "#5C3317", "#D2691E", "#FFFFFF"],
    "tipografia": {
      "principal": "Sans-serif bold display",
      "secundaria": "Sans-serif regular",
      "estilo": "Editorial, moderna, elegante"
    },
    "estilo_ilustracion": "Fotografía de producto real (postre de chocolate) sobre fondo con forma orgánica marrón",
    "estructura": "Portada de revista con título en la parte superior, dos columnas de texto en la sección media, imagen central prominente con formas decorativas curvas, y pie de página con código de barras y URL",
    "elementos_decorativos": ["formas curvas orgánicas en marrón", "código de barras", "etiqueta lateral rotada 90°", "separadores de línea"],
    "tono_visual": "Gastronómico, cálido, sofisticado, apetitoso"
  },
  "page_5": {
    "paleta_colores": ["#90EE90", "#FFA07A", "#98FB98", "#FFFFFF", "#000000", "#FF6347"],
    "tipografia": {
      "principal": "Sans-serif ultra bold display",
      "secundaria": "Sans-serif condensada",
      "estilo": "Editorial contemporánea, tipografía como elemento visual principal"
    },
    "estilo_ilustracion": "Fotografía editorial de moda con fondo degradado pastel (verde menta, naranja suave)",
    "estructura": "Portada de revista de moda: título superior izquierda, fotografía central de dos personas, bloques de texto en esquinas inferiores, código de barras inferior derecho, numeración de volumen/edición lateral",
    "elementos_decorativos": ["número de volumen rotado verticalmente", "código de barras", "superposición de texto sobre imagen", "manchas de color de fondo degradado"],
    "tono_visual": "Trendy, juvenil, editorial, fresco y contemporáneo"
  },
  "page_6": {
    "paleta_colores": ["#C4A882", "#1A1A1A", "#FFFFFF", "#8B7355", "#D4C5A9"],
    "tipografia": {
      "principal": "Display con efecto grunge/desgastado",
      "secundaria": "Serif bold caps",
      "estilo": "Vintage, rústica, envejecida"
    },
    "estilo_ilustracion": "Fotografías envejecidas/vintage (sepia/blanco y negro) de escenas históricas integradas en la composición",
    "estructura": "Infografía de línea de tiempo vertical con eventos alternados izquierda-derecha, línea punteada central de conexión, encabezado en caja negra, pie de página con URL",
    "elementos_decorativos": ["textura de papel kraft/pergamino", "puntos de conexión en la línea de tiempo", "borde envejecido", "recuadros fotográficos con borde"],
    "tono_visual": "Histórico, vintage, rústico, académico"
  },
  "page_7": {
    "paleta_colores": ["#1A1A2E", "#FFFFFF", "#C0392B", "#E74C3C", "#F39C12", "#2ECC71"],
    "tipografia": {
      "principal": "Sans-serif bold",
      "secundaria": "Sans-serif regular",
      "estilo": "Tecnológica, limpia, moderna"
    },
    "estilo_ilustracion": "Iconografía outline blanca sobre fondo oscuro, sin ilustraciones complejas; manchas de bokeh coloridas de fondo",
    "estructura": "Infografía vertical con sección de definición (recuadro superior), grid de 3 habilidades, recuadro de beneficios con lista, grid de 6 aplicaciones con iconos, recuadro de futuro; footer con handle",
    "elementos_decorativos": ["manchas de luz bokeh en rojo y naranja en el fondo", "recuadros con bordes redondeados", "iconos de línea blanca", "separadores visuales implícitos"],
    "tono_visual": "Tecnológico, profesional, oscuro, innovador"
  },
  "page_8": {
    "paleta_colores": ["#C4A882", "#1A1A1A", "#FFFFFF", "#8B7355", "#D2B48C"],
    "tipografia": {
      "principal": "Display serif decorativa estilo periódico antiguo",
      "secundaria": "Serif clásica de cuerpo",
      "estilo": "Periodística clásica, elegante, formal"
    },
    "estilo_ilustracion": "Ilustraciones estilo grabado histórico/victoriano en sepia para representar escenas urbanas del pasado",
    "estructura": "Maquetación de newsletter/periódico con cabecera, titular centrado, dos bloques principales con imagen y texto en columnas, sección inferior de contexto histórico, separadores de línea horizontal",
    "elementos_decorativos": ["textura de papel envejecido arrugado", "viñeta ornamental en la cabecera", "separadores de línea clásicos", "fecha y edición en cabecera"],
    "tono_visual": "Histórico, periodístico clásico, sepia, nostálgico"
  },
  "page_9": {
    "paleta_colores": ["#3333CC", "#FF1493", "#FF6600", "#99CC00", "#FFFF00", "#FFFFFF"],
    "tipografia": {
      "principal": "Sans-serif bold cursiva/italic display",
      "secundaria": "Sans-serif bold caps",
      "estilo": "Vibrante, energética, llamativa"
    },
    "estilo_ilustracion": "Fotografías reales de naturaleza (campos, aves, mariposa, loro) recortadas y combinadas con formas geométricas y elementos decorativos planos",
    "estructura": "Infografía vertical con header azul bold, 5 secciones alternadas de color intenso (azul, naranja, verde, azul, rosa), cada sección con número, título, texto e imagen lateral",
    "elementos_decorativos": ["estrellas de 4 puntas", "ondas y formas orgánicas en esquinas", "flechas", "X decorativas", "formas de squiggle", "handle en footer"],
    "tono_visual": "Colorido, enérgico, juvenil, vibrante, educativo"
  },
  "page_10": {
    "paleta_colores": ["#000000", "#CCFF00", "#9B59B6", "#FFFFFF", "#1A1A1A"],
    "tipografia": {
      "principal": "Sans-serif ultra bold display",
      "secundaria": "Sans-serif regular",
      "estilo": "Impactante, urbana, alta energía"
    },
    "estilo_ilustracion": "Sin ilustraciones figurativas; diseño puramente tipográfico y gráfico con formas geométricas básicas y números grandes como elementos visuales",
    "estructura": "Infografía vertical de fondo negro con 5 secciones numeradas; secciones de ancho completo con divisores de color neón verde y morado alternados, texto centrado o justificado",
    "elementos_decorativos": ["asteriscos decorativos", "estrellas de 4 puntas neón", "números grandes como ancla visual de cada sección", "handle en caja redondeada al pie"],
    "tono_visual": "Urbano, impactante, nocturno, viral, moderno"
  },
  "page_11": {
    "paleta_colores": ["#2C3E7A", "#FF4C6A", "#F5C518", "#FFFFFF", "#1A2456"],
    "tipografia": {
      "principal": "Sans-serif bold caps",
      "secundaria": "Sans-serif regular centrada",
      "estilo": "Directa, clara, de alto contraste"
    },
    "estilo_ilustracion": "Iconografía simple plana con formas circulares en degradado rojo-rosa como soporte visual de los íconos blancos",
    "estructura": "Infografía vertical con header de 3 líneas, 4 secciones en recuadros con borde punteado blanco distribuidas verticalmente alternando icono izquierda-derecha, párrafo de cierre centrado al pie",
    "elementos_decorativos": ["bordes punteados en los recuadros de sección", "círculos en degradado rojo-rosa para íconos", "fondo texturizado azul oscuro tipo tela arrugada", "flechas implícitas de flujo"],
    "tono_visual": "Profesional, informativo, serio, limpio y moderno"
  },
  "page_12": {
    "paleta_colores": ["#1A1A1A", "#2C2C2C", "#FFFFFF", "#808080", "#D3D3D3"],
    "tipografia": {
      "principal": "Sans-serif ultra bold display condensada",
      "secundaria": "Sans-serif light/regular",
      "estilo": "Corporativa oscura, elegante, sobria"
    },
    "estilo_ilustracion": "Fotografías reales en blanco y negro/color natural de entornos urbanos, industriales y de negocios, integradas en la línea de tiempo",
    "estructura": "Línea de tiempo vertical central con años rotados 90°, imágenes alternadas izquierda-derecha en cada nodo, textos de descripción en el lado opuesto a la imagen; footer con URL",
    "elementos_decorativos": ["puntos nodales en la línea central", "flechas tipo chevron apuntando hacia abajo en la línea", "textura granular de fondo oscuro", "separadores implícitos entre décadas"],
    "tono_visual": "Corporativo, sobrio, elegante, cinematográfico"
  },
  "page_13": {
    "paleta_colores": ["#F5F0EA", "#E8917A", "#1A1A1A", "#808080", "#FFFFFF"],
    "tipografia": {
      "principal": "Sans-serif light/thin display",
      "secundaria": "Sans-serif regular",
      "estilo": "Minimalista, editorial, contemporánea"
    },
    "estilo_ilustracion": "Fotografías en blanco y negro de paisajes naturales (montañas, cielos, carreteras); etiquetas de categoría en color salmón/coral",
    "estructura": "Infografía vertical con título superior centrado, fotografía horizontal de ancho completo, grid de 6 categorías en 2 filas con etiquetas de color, línea de tiempo de 3 hitos con imágenes alternadas, footer con URL",
    "elementos_decorativos": ["etiquetas rectangulares en coral/salmón", "rombos como marcadores de hito en la línea de tiempo", "línea de tiempo vertical con línea fina", "separadores horizontales"],
    "tono_visual": "Minimalista, editorial, sofisticado, profesional"
  },
  "page_14": {
    "paleta_colores": ["#2D6E6A", "#FFFFFF", "#F5F0EA", "#C4A882", "#1A1A1A"],
    "tipografia": {
      "principal": "Typewriter/monospace",
      "secundaria": "Sans-serif regular",
      "estilo": "Orgánica, personal, artesanal"
    },
    "estilo_ilustracion": "Collage tipo scrapbook con bordes desgarrados en papel, fotografía en blanco y negro con clip decorativo, fondos texturizados superpuestos",
    "estructura": "Infografía de biografía personal vertical: header con foto y nombre en recuadro tipo papel pegado, sección de introducción, grid de 4 recuadros de contenido (carrera, desafíos, valores, fortalezas, logros, resumen) con jerarquía visual clara",
    "elementos_decorativos": ["bordes rasgados de papel", "clip de papel decorativo dorado", "textura de tela/arpillera de fondo", "puntos decorativos superiores", "numeración circular en ítems de lista"],
    "tono_visual": "Personal, cálido, artesanal, humano, scrapbook"
  },
  "page_15": {
    "paleta_colores": ["#F5DEB3", "#FF69B4", "#808080", "#FFD700", "#E8D5C4", "#FFFFFF"],
    "tipografia": {
      "principal": "Handwritten cursiva",
      "secundaria": "Handwritten regular",
      "estilo": "Manuscrita, personal, femenina"
    },
    "estilo_ilustracion": "Fotografías tipo polaroid con bordes blancos inclinados; ilustraciones de papelería escolar (tijeras, lápices, clips, gomas) dibujadas a mano o vectorizadas en estilo kawaii",
    "estructura": "Infografía vertical con formato de hoja de cuaderno espiral (con espiral visible en el borde izquierdo), rayas de cuaderno en el fondo, 5 pasos numerados con imagen tipo polaroid en cada uno",
    "elementos_decorativos": ["espiral de cuaderno en borde izquierdo", "rayas de libreta", "iconos kawaii de papelería", "fotos tipo polaroid inclinadas", "estrellas de 4 puntas", "handle al pie"],
    "tono_visual": "Femenino, escolar, kawaii, artesanal, pastel"
  },
  "page_16": {
    "paleta_colores": ["#FF80C0", "#9B59FF", "#40C4F0", "#FFD700", "#FFFFFF", "#1A1A1A"],
    "tipografia": {
      "principal": "Sans-serif bold italic caps",
      "secundaria": "Sans-serif regular centrada",
      "estilo": "Dinámica, colorida, comercial"
    },
    "estilo_ilustracion": "Iconografía 3D render (megáfonos, computadoras, calendario, tienda, carta) sobre fondos de color sólido suave",
    "estructura": "Infografía vertical de proceso de compra con 6 pasos; cada paso tiene una caja de color único con número circular, título bold, icono 3D y texto descriptivo; alternancia izquierda-derecha del icono; footer con logo, datos de contacto",
    "elementos_decorativos": ["cajas con bordes redondeados en colores pastel vivos", "números en círculos de contraste", "iconos 3D render con sombras suaves", "elementos geométricos angulares en el header", "logo corporativo en el footer"],
    "tono_visual": "Colorido, comercial, amigable, dinámico, profesional"
  },
  "page_17": {
    "paleta_colores": ["#0A1628", "#1B3A6B", "#FFFFFF", "#4A90D9", "#C0C0C0"],
    "tipografia": {
      "principal": "Sans-serif bold",
      "secundaria": "Sans-serif light caps",
      "estilo": "Corporativa, moderna, profesional"
    },
    "estilo_ilustracion": "Fotografía real de personas de negocios integrada en forma geométrica octagonal con borde de color",
    "estructura": "Slide de presentación horizontal (formato 16:9) con fondo azul marino oscuro: logotipo superior izquierda, texto alineado a la izquierda, fotografía en contenedor octagonal a la derecha, barra de información inferior",
    "elementos_decorativos": ["forma octagonal para encuadrar foto", "puntos decorativos en cuadrícula", "líneas diagonales geométricas en esquina", "flechas de play/avance triple en el pie", "etiqueta de texto en recuadro redondeado"],
    "tono_visual": "Corporativo, profesional, sobrio, confiable, moderno"
  },
  "page_18": {
    "paleta_colores": ["#0A0A2E", "#1A1A4E", "#FFFFFF", "#4169E1", "#87CEEB"],
    "tipografia": {
      "principal": "Sans-serif light thin",
      "secundaria": "Sans-serif regular",
      "estilo": "Minimalista, tecnológica, elegante"
    },
    "estilo_ilustracion": "Forma esférica en degradado azul celeste-eléctrico como elemento visual central; sin ilustraciones figurativas",
    "estructura": "Slide horizontal (16:9) dividido en dos mitades: izquierda con texto grande y subtítulo sobre fondo azul profundo, derecha con 4 tarjetas métricas apiladas verticalmente con triángulos indicadores de tendencia",
    "elementos_decorativos": ["esfera degradada en azul como elemento hero", "triángulos azules indicadores de tendencia en cada métrica", "tarjetas con borde sutil redondeado", "logotipo placeholder en esquina inferior"],
    "tono_visual": "Tecnológico, minimalista, elegante, futurista, de datos"
  },
  "page_19": {
    "paleta_colores": ["#F0F0FF", "#3333AA", "#6666CC", "#9999CC", "#FFFFFF"],
    "tipografia": {
      "principal": "Script/caligrafía",
      "secundaria": "Sans-serif",
      "estilo": "Artística, creativa, elegante"
    },
    "estilo_ilustracion": "Ilustración vectorial línea única en azul índigo: libreta/portafolio con doodles (sticker de smiley, corazón, vinilo, estrella), estrellas de distintos tamaños",
    "estructura": "Banner horizontal (16:9) con ilustración del portafolio a la izquierda y título dentro de una elipse sólida azul a la derecha, fondo blanco con textura de cuadrícula sutil",
    "elementos_decorativos": ["estrellas de 6 y 8 puntas en distintos tamaños y grises", "textura de cuadrícula de fondo", "elipse sólida como contenedor del título", "doodles dentro de la libreta ilustrada"],
    "tono_visual": "Creativo, artístico, juvenil, elegante, minimalista bicolor"
  },
  "page_20": {
    "paleta_colores": ["#000000", "#8B0000", "#CC0000", "#FFFFFF", "#1A0000"],
    "tipografia": {
      "principal": "Display tecnológica/monoespaciada futurista",
      "secundaria": "Sans-serif regular",
      "estilo": "Tecnológica, futurista, de alto impacto"
    },
    "estilo_ilustracion": "Abstracción de luz sobre fondo negro: curvas de luz roja sobre negro creando sensación de vórtice o espiral",
    "estructura": "Slide horizontal (16:9) minimalista con título centrado en el tercio inferior del área de imagen, subtítulo debajo del título; fondo completamente ocupado por la ilustración abstracta",
    "elementos_decorativos": ["curvas de luz roja en degradado sobre negro", "efecto lens flare", "tipografía con efecto glow/brillo"],
    "tono_visual": "Dramático, tecnológico, oscuro, de alto impacto, cinematográfico"
  },
  "page_21": {
    "paleta_colores": ["#3A00CC", "#6600FF", "#00CCFF", "#FF00FF", "#1A0044", "#FFFFFF"],
    "tipografia": {
      "principal": "Display futurista con efecto de luz",
      "secundaria": "Sans-serif caps bold",
      "estilo": "Futurista, gaming, tecnológica"
    },
    "estilo_ilustracion": "Manos robóticas 3D fotorrealistas con detalles mecánicos, integradas como elementos laterales; fondo con cuadrícula retro-futurista tipo synthwave",
    "estructura": "Slide horizontal (16:9) con título centrado en un recuadro con bordes HUD/interfaz, manos robóticas en ambos lados del recuadro, fondo tipo cuadrícula perspectiva synthwave con degradado morado-negro",
    "elementos_decorativos": ["cuadrícula perspectiva tipo synthwave", "bordes tipo interfaz HUD con esquinas marcadas", "efectos de destello/lens flare en las manos", "degradado de fondo morado-negro", "elementos geométricos decorativos tipo interfaz"],
    "tono_visual": "Futurista, gaming, tecnológico, vibrante, retro-futurista"
  },
  "page_22": {
    "paleta_colores": ["#0A1628", "#00CED1", "#FFFFFF", "#1A3A5C", "#87CEEB"],
    "tipografia": {
      "principal": "Sans-serif light thin",
      "secundaria": "Sans-serif regular",
      "estilo": "Corporativa tecnológica, elegante, moderna"
    },
    "estilo_ilustracion": "Render 3D fotorrealista de androide/robot femenino con cabeza translúcida mostrando circuitos cerebrales iluminados",
    "estructura": "Slide horizontal (16:9) con fondo oscuro tipo red de nodos interconectados (partículas), logotipo e ícono de marca superior izquierda, texto alineado a la izquierda, fotografía/render 3D a la derecha ocupando más del 50%",
    "elementos_decorativos": ["red de nodos/partículas de fondo", "circuito cerebral iluminado en el robot", "borde de etiqueta oval en el pie", "URL en etiqueta redondeada"],
    "tono_visual": "Tecnológico, futurista, corporativo, sofisticado"
  },
  "page_23": {
    "paleta_colores": ["#1A0044", "#4B0082", "#D4870A", "#FFFFFF", "#E0D0FF"],
    "tipografia": {
      "principal": "Sans-serif ultra bold",
      "secundaria": "Sans-serif caps con espaciado amplio",
      "estilo": "Impactante, minimalista, de alto contraste"
    },
    "estilo_ilustracion": "Abstracción de partículas/polvo dorado-naranja sobre fondo morado oscuro con destellos de luz; patrón de puntos en degradado en los lados",
    "estructura": "Slide horizontal (16:9) con título centrado y subtítulo debajo con línea horizontal como separador, ocupando el centro visual del frame; fondo completamente abstracto",
    "elementos_decorativos": ["explosiones de polvo dorado-naranja", "destellos de luz blanca", "patrón de puntos azules en ambos lados de la composición", "línea horizontal fina como separador tipográfico"],
    "tono_visual": "Elegante, oscuro, misterioso, premium, impactante"
  },
  "page_24": {
    "paleta_colores": ["#FFB3C6", "#FF6B35", "#FFFFFF", "#F5F5F5", "#1A1A1A"],
    "tipografia": {
      "principal": "Sans-serif bold",
      "secundaria": "Sans-serif regular",
      "estilo": "Minimalista, moderna, editorial"
    },
    "estilo_ilustracion": "Render 3D de cintas/lazos translúcidos en degradado rosa-naranja con efecto glassmorphism; tarjeta de documento 3D con efecto de profundidad",
    "estructura": "Slide horizontal (16:9) con elemento 3D central (tarjeta flotante) rodeado de formas ribbon translúcidas, título y texto en la tarjeta, fondo compuesto de degradado de las cintas",
    "elementos_decorativos": ["cintas/ribbons translúcidas 3D en degradado rosa-naranja", "efecto glassmorphism en la tarjeta", "líneas horizontales como placeholder de texto", "sombra y profundidad 3D"],
    "tono_visual": "Moderno, creativo, glassmorphism, suave, editorial"
  },
  "page_25": {
    "paleta_colores": ["#FAEBD7", "#1B3A6B", "#D2691E", "#F5DEB3", "#FFFFFF"],
    "tipografia": {
      "principal": "Sans-serif bold display",
      "secundaria": "Sans-serif regular",
      "estilo": "Educativa, amigable, clara"
    },
    "estilo_ilustracion": "Ilustración vectorial plana (flat) de pila de libros con lápices y corazón, estilo infantil/educativo con paleta azul y marrón",
    "estructura": "Portada vertical de worksheet escolar: ilustración central en la mitad superior, recuadro tipo cartel beige centrado con título bold, botón/CTA en recuadro redondeado marrón en la parte inferior",
    "elementos_decorativos": ["formas orgánicas azul marino en esquinas (tipo blob)", "líneas punteadas en diagonal como marco", "estrellas de 4 puntas", "rombos pequeños", "numeración de página al pie"],
    "tono_visual": "Educativo, infantil, cálido, amigable, escolar"
  },
  "page_26": {
    "paleta_colores": ["#FFD700", "#1A1A1A", "#CC0000", "#FF6600", "#FFFFFF"],
    "tipografia": {
      "principal": "Display bold condensada estilo cómic",
      "secundaria": "Sans-serif italic bold",
      "estilo": "Impactante, cómic, vintage superhéroe"
    },
    "estilo_ilustracion": "Ilustración vectorial plana estilo cómic/pop art americano clásico con personaje de superhéroe, rayos de fondo y ciudad en silueta",
    "estructura": "Portada vertical de revista cómic: título en la parte superior con letras enormes superpuestas, ilustración central de superhéroe de cuerpo completo, globo de texto en esquina inferior derecha, fondo de rayos de energía estilo Jack Kirby",
    "elementos_decorativos": ["rayos de energía emanando del personaje", "silueta de ciudad en la base", "tipografía como elemento visual principal", "globo de texto tipo explosión (starburst)", "paleta de alto contraste"],
    "tono_visual": "Dinámico, retro, pop art, enérgico, nostálgico"
  },
  "page_27": {
    "paleta_colores": ["#87CEEB", "#FFFFFF", "#1A1A1A", "#708090", "#B0C4DE"],
    "tipografia": {
      "principal": "Sans-serif ultra bold condensada",
      "secundaria": "Sans-serif bold",
      "estilo": "Editorial de alto impacto, seria"
    },
    "estilo_ilustracion": "Fotografía real de témpanos de hielo ártico en tono azul natural; sans adornos ilustrativos",
    "estructura": "Portada de revista de naturaleza/ciencia vertical: cabecera con línea horizontal y texto de edición, título en la parte superior, fotografía a sangre completa en el centro-superior, bloques de texto sobre la fotografía en la parte inferior",
    "elementos_decorativos": ["líneas horizontales finas de separación", "texto superpuesto sobre la fotografía", "paleta de color totalmente natural extraída de la fotografía"],
    "tono_visual": "Medioambiental, serio, documental, impactante, sobrio"
  },
  "page_28": {
    "paleta_colores": ["#F5A623", "#1B1B3A", "#F5F5DC", "#FF6B6B", "#4ECDC4"],
    "tipografia": {
      "principal": "Sans-serif ultra bold display",
      "secundaria": "Sans-serif regular",
      "estilo": "Editorial moderna, llamativa, storytelling"
    },
    "estilo_ilustracion": "Ilustración digital (semi-realista/conceptual) de una figura femenina con la mente abierta llena de mundos imaginarios, planetas, arquitecturas fantásticas",
    "estructura": "Portada vertical de revista de storytelling: número de edición y fecha en la cabecera, título huge a todo ancho, ilustración central dominando el 60% inferior de la portada, globo de diálogo tipo blob con texto sobre la ilustración, pie con editorial",
    "elementos_decorativos": ["globo de diálogo tipo blob orgánico beige", "ilustración con composición surreal y profunda", "paleta naranja que complementa a la ilustración"],
    "tono_visual": "Creativo, imaginativo, editorial, evocador, literario"
  },
  "page_29": {
    "paleta_colores": ["#0D0D2B", "#CCFF00", "#FF00CC", "#00FFFF", "#9B59B6", "#FFFFFF"],
    "tipografia": {
      "principal": "Sans-serif bold con efecto neon/glow",
      "secundaria": "Sans-serif regular pequeña",
      "estilo": "Tecnológica, neón, futurista"
    },
    "estilo_ilustracion": "Render/fotografía híbrida de cabeza humana con cerebro multicolor y red neuronal visible, estilo AI/neurocientífico",
    "estructura": "Infografía vertical con header de título neón, imagen central dominante de cabeza-cerebro, 6 recuadros de contenido distribuidos en 2 columnas (3 arriba, 3 abajo de la imagen central), con icono de categoría y texto",
    "elementos_decorativos": ["efecto neon/glow en tipografía del título", "manchas de color abstractas en esquinas superiores", "recuadros con bordes y fondos semi-transparentes oscuros", "iconos pequeños de categoría dentro de cada recuadro"],
    "tono_visual": "Tecnológico, futurista, neón, neurocientífico, oscuro vibrante"
  },
  "page_30": {
    "paleta_colores": ["#8B1A2A", "#FFFFFF", "#D4A017", "#F5F5F5", "#C0C0C0"],
    "tipografia": {
      "principal": "Sans-serif light/ultra thin caps",
      "secundaria": "Script/caligrafía bold",
      "estilo": "Elegante, femenina, de lujo editorial"
    },
    "estilo_ilustracion": "Fotografía editorial de moda con fondo burdeos oscuro, sujeto con pose dramática",
    "estructura": "Portada vertical de revista de cumpleaños estilo editorial de moda: nombre del evento en la parte superior izquierda, fotografía a sangre central dominante, texto de nombre y edad sobrepuesto a la derecha, fecha y hora superpuestos a la izquierda, título tipográfico grande en la parte inferior",
    "elementos_decorativos": ["tipografía script bold como elemento hero visual", "superposición de texto sobre fotografía a sangre", "paleta monocromática cálida burdeos"],
    "tono_visual": "Editorial de lujo, elegante, femenino, dramático, sofisticado"
  },
  "page_31": {
    "paleta_colores": ["#060F1E", "#1A3A6B", "#4169E1", "#87CEEB", "#FFFFFF"],
    "tipografia": {
      "principal": "Sans-serif thin/light display",
      "secundaria": "Sans-serif regular",
      "estilo": "Tecnológica minimalista, corporativa premium"
    },
    "estilo_ilustracion": "Forma geométrica abstracta de esferas/medias lunas concéntricas en degradado azul celeste a eléctrico como elemento visual único",
    "estructura": "Slide horizontal (16:9) con fondo azul marino muy oscuro: logotipo y texto en la mitad izquierda con jerarquía tipográfica clara, elemento visual de esferas concéntricas en la mitad derecha",
    "elementos_decorativos": ["esferas concéntricas en degradado azul", "logotipo placeholder en esquina superior izquierda", "jerarquía tipográfica de 3 niveles"],
    "tono_visual": "Corporativo premium, tecnológico, minimalista, elegante, profesional"
  },
  "page_32": {
    "paleta_colores": ["#0A0500", "#D4AF37", "#FFFFFF", "#8B7536", "#C8B560"],
    "tipografia": {
      "principal": "Script/caligrafía bold",
      "secundaria": "Serif caps con espaciado amplio",
      "estilo": "Elegante, clásica, festiva de lujo"
    },
    "estilo_ilustracion": "Fotografía de fondo bokeh dorado desenfocado creando atmósfera de lujo; sin ilustraciones figurativas",
    "estructura": "Invitación vertical formal: borde decorativo de esquinas con estrellas de 8 puntas y líneas doradas, texto 'Receiving' en caps pequeño, título Script enorme central, separador con estrella, fecha y hora en tipografía de display, dirección y confirmación al pie",
    "elementos_decorativos": ["marco decorativo dorado con estrellas de 8 puntas en las 4 esquinas", "líneas horizontales doradas como separadores", "estrella central en el separador", "bokeh de fondo creando profundidad"],
    "tono_visual": "Lujoso, elegante, festivo, glamoroso, formal"
  },
  "page_33": {
    "paleta_colores": ["#FFD700", "#FF4500", "#CC0000", "#FFFFFF", "#1A1A1A"],
    "tipografia": {
      "principal": "Sans-serif ultra bold display",
      "secundaria": "Sans-serif bold",
      "estilo": "Comercial, impactante, de restaurante"
    },
    "estilo_ilustracion": "Fotografías reales de comida (platos, ingredientes) en alta saturación, recortadas en formas circulares y rectangulares con cortes diagonales tipo clapperboard",
    "estructura": "Flyer vertical de servicio de comida: fotografías de comida cortadas diagonalmente ocupando el 55% superior, 3 círculos de foto de platos con precios en badge rojo, sección inferior amarilla con nombre del servicio, descripción y datos de contacto",
    "elementos_decorativos": ["cortes diagonales para separar zonas de foto", "badges circulares tipo sticker rojo con precio", "badge 'Special Discount' en forma de sello dentado", "patrón de puntos de halftone en zona de transición", "rayos de fondo en amarillo en zona inferior"],
    "tono_visual": "Comercial, apetitoso, enérgico, llamativo, de comida rápida"
  },
  "page_34": {
    "paleta_colores": ["#0D0D2B", "#00FFFF", "#FF00AA", "#1A0044", "#FFFFFF"],
    "tipografia": {
      "principal": "Sans-serif bold redondeada",
      "secundaria": "Sans-serif regular",
      "estilo": "Moderna, tecnológica, limpia sobre oscuro"
    },
    "estilo_ilustracion": "Fondo 3D render de corredor arquitectónico futurista/sci-fi con perspectiva en punto de fuga central, iluminado con neones cian y magenta",
    "estructura": "Portada vertical de libro/publicación: fondo de corredor sci-fi a sangre completa, título centrado en el tercio medio en tipografía bold blanca, subtítulo/autor al pie en tipografía pequeña clara",
    "elementos_decorativos": ["arquitectura 3D futurista como fondo", "iluminación neón cian y magenta", "efecto de perspectiva en punto de fuga", "destellos de luz en los marcos del corredor"],
    "tono_visual": "Sci-fi, futurista, oscuro, misterioso, cinematográfico"
  },
  "page_35": {
    "paleta_colores": ["#F5F5F0", "#1B3A6B", "#FFFFFF", "#D3D3D3", "#1A1A1A"],
    "tipografia": {
      "principal": "Sans-serif ultra bold condensada",
      "secundaria": "Sans-serif regular",
      "estilo": "Educativa, clara, de alto contraste"
    },
    "estilo_ilustracion": "Fotografías reales en escala de grises/blanco y negro recortadas en círculos; ilustración vectorial simple de flecha curva y logo 'DONE' como elemento de cierre",
    "estructura": "Infografía vertical de proceso de diseño con 5 etapas: título superior, cada etapa con etiqueta azul bold, texto descriptivo y fotografía circular en lados alternados, flecha final apuntando al elemento 'DONE'",
    "elementos_decorativos": ["etiquetas rectangulares azul bold para nombres de etapa", "fotografías recortadas en círculo con borde", "flecha curva vectorial como elemento de cierre", "tipografía 'DONE' en recuadro oval como elemento final"],
    "tono_visual": "Educativo, profesional, limpio, ordenado, minimalista bicolor"
  },
  "page_36": {
    "paleta_colores": ["#F5C518", "#CC0066", "#FF6600", "#6633CC", "#00AACC", "#FFFFFF", "#000000"],
    "tipografia": {
      "principal": "Sans-serif ultra bold condensada caps",
      "secundaria": "Sans-serif regular",
      "estilo": "Impactante, directa, alta legibilidad"
    },
    "estilo_ilustracion": "Iconografía outline blanca sobre fondos de color sólido; sin ilustraciones complejas",
    "estructura": "Infografía vertical con 5 secciones de color sólido diferente apiladas verticalmente: amarillo (header), magenta (sección 1), naranja (sección 2), morado (sección 3), azul cian (sección 4); cada sección con icono outline, título bold, texto descriptivo y flechas de conexión",
    "elementos_decorativos": ["flechas curvas de conexión entre secciones", "iconos outline blancos en cada sección", "bloques de color sólido como separadores de sección", "fondo negro como borde del documento"],
    "tono_visual": "Educativo, colorido, organizado, directo, de alto contraste"
  },
  "page_37": {
    "paleta_colores": ["#CC2200", "#A8C4E0", "#6B6BCC", "#F5C518", "#FFFFFF", "#1A1A1A"],
    "tipografia": {
      "principal": "Sans-serif ultra bold condensada caps",
      "secundaria": "Sans-serif regular centrada",
      "estilo": "Bold, gráfica, de alto impacto"
    },
    "estilo_ilustracion": "Sin fotografías ni ilustraciones complejas; diseño tipográfico y geométrico puro con bloques rectangulares de color y números grandes",
    "estructura": "Infografía vertical con fondo rojo: 4 secciones numeradas con estructura alternada (texto izquierda + número derecha / número izquierda + texto derecha), cada número en un bloque cuadrado azul o rojo con estrella de 4 puntas",
    "elementos_decorativos": ["estrellas de 4 puntas en cada número", "bloques cuadrados de color como contenedores de número", "etiquetas de categoría en recuadros redondeados amarillos", "URL en recuadro redondeado oscuro al pie"],
    "tono_visual": "Bold, gráfico, minimalista colorido, impactante, retro-moderno"
  },
  "page_38": {
    "paleta_colores": ["#FFFFFF", "#F5F5F5", "#CC0000", "#3333CC", "#1A1A1A"],
    "tipografia": {
      "principal": "Sans-serif ultra bold condensada",
      "secundaria": "Sans-serif regular",
      "estilo": "Fuerte, directa, editorial gráfica"
    },
    "estilo_ilustracion": "Sin fotografías; fondo de textura de papel arrugado/blanco; diseño puramente gráfico y tipográfico",
    "estructura": "Infografía de línea de tiempo vertical con 6 hitos: título enorme en la parte superior, línea vertical central azul con puntos de nodo, años en rojo a la izquierda de cada nodo, texto de título del evento en rojo y descripción en negro a la derecha",
    "elementos_decorativos": ["textura de papel arrugado como fondo", "línea vertical azul como eje de tiempo", "puntos circulares como nodos de evento", "jerarquía bicolor rojo-negro en cada evento"],
    "tono_visual": "Gráfico, editorial bold, limpio, periodístico, de alto contraste"
  }
};

let TEMPLATES = DEFAULT_TEMPLATES;

// Construye un resumen textual de la plantilla para usar como system prompt
function templateToPrompt(templateObj) {
    if (!templateObj) return '';
    const colores = templateObj.paleta_colores ? `Paleta de colores: ${templateObj.paleta_colores.join(', ')}.` : '';
    const tipografia = templateObj.tipografia ? `Tipografía principal: ${templateObj.tipografia.principal}. Estilo: ${templateObj.tipografia.estilo}.` : '';
    const ilustracion = templateObj.estilo_ilustracion ? `Estilo de ilustración: ${templateObj.estilo_ilustracion}.` : '';
    const estructura = templateObj.estructura ? `Estructura: ${templateObj.estructura}.` : '';
    const decorativos = templateObj.elementos_decorativos ? `Elementos decorativos: ${templateObj.elementos_decorativos.join(', ')}.` : '';
    const tono = templateObj.tono_visual ? `Tono visual: ${templateObj.tono_visual}.` : '';
    return `${colores} ${tipografia} ${ilustracion} ${estructura} ${decorativos} ${tono}`.trim();
}


let currentLang = 'es';

document.addEventListener('DOMContentLoaded', () => {
    // Restore API key
    const savedKey = localStorage.getItem('pollinations_api_key');
    if (savedKey) {
        const apiKeyInput = document.getElementById('apiKeyInput');
        if (apiKeyInput) apiKeyInput.value = savedKey;
    }

    // Inicializar elementos de UI
    updateBoxSize();
    
    // Cargar plantillas y modelos
    loadTemplatesFromJSON();
    if (typeof fetchAndPopulateModels === 'function') fetchAndPopulateModels();

    // Eventos UI
    const btnEs = document.getElementById('btnEs');
    const btnEn = document.getElementById('btnEn');
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyPromptBtn');
    const genBtn = document.getElementById('genImageBtn');
    const ratio = document.getElementById('img_ratio');
    const objSel = document.getElementById('object_select');
    const rev = document.getElementById('revista_nombre');
    const edi = document.getElementById('editorial_input');
    const sp = document.getElementById('system_prompt');

    if (btnEs) btnEs.onclick = setPromptToSpanish;
    if (btnEn) btnEn.onclick = setPromptToEnglish;
    if (downloadBtn) downloadBtn.onclick = downloadCurrentImage;
    if (copyBtn) copyBtn.onclick = copySystemPrompt;
    if (genBtn) genBtn.onclick = () => { 
        const loading = document.getElementById('img_loading'); 
        if (loading) loading.style.display = 'block'; 
        generateImageFromPrompt(); 
    };
    
    if (ratio) ratio.addEventListener('change', updateBoxSize);
    if (objSel) objSel.addEventListener('change', updatePromptsForSelection);
    if (rev) rev.addEventListener('input', updatePromptsForSelection);
    if (edi) edi.addEventListener('input', updatePromptsForSelection);
    if (sp) sp.addEventListener('input', () => { window._systemPrompt = sp.value; });
});

async function loadTemplatesFromJSON() {
    try {
        const resp = await fetch('./JSON.txt');
        const data = await resp.json();
        TEMPLATES = data;
    } catch (e) {
        console.warn('No se pudo cargar JSON.txt, usando fallback', e);
    }
    
    const sel = document.getElementById('object_select');
    if (sel) sel.value = 'page_1';
    
    renderTemplateThumbnails();
    updatePromptsForSelection();
}

function renderTemplateThumbnails(){
    const container = document.getElementById('template_list');
    const sel = document.getElementById('object_select');
    if (!container || !sel) return;
    
    container.innerHTML = '';
    const templateKeys = Object.keys(TEMPLATES).slice(0, 38);
    
    templateKeys.forEach((tk, idx) => {
        const card = document.createElement('div');
        card.style.display = 'flex';
        card.style.gap = '8px';
        card.style.alignItems = 'center';
        card.style.cursor = 'pointer';
        card.style.padding = '6px';
        card.style.border = '1px solid transparent';
        card.style.borderRadius = '6px';

        const img = document.createElement('img');
        img.alt = `Modelo ${idx+1}`;
        img.style.width = '100%';
        img.style.maxWidth = '100%';
        img.style.height = '110px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '4px';

        const right = document.createElement('div');
        right.style.minWidth = '80px';
        right.style.display = 'flex';
        right.style.flexDirection = 'column';
        right.style.gap = '6px';

        const label = document.createElement('div');
        label.textContent = `Modelo ${idx+1}`;
        label.style.fontSize = '13px';
        label.style.color = '#222';

        right.appendChild(label);
        card.appendChild(img);
        card.appendChild(right);

        card.addEventListener('click', () => {
            sel.value = tk;
            Array.from(container.children).forEach(c => c.style.border = '1px solid transparent');
            card.style.border = '2px solid #007ef6';
            updatePromptsForSelection();
        });

        if (sel.value === tk) {
            card.style.border = '2px solid #007ef6';
        }

        const imgIdx = idx + 1;
        const localSrc = `./images/modelo${imgIdx}.png`;
        img.src = localSrc;
        img.onerror = function() {
            if (this.src.includes('.png')) {
                this.src = `./images/modelo${imgIdx}.jpg`;
            } else {
                this.onerror = null;
                this.style.background = '#ddd'; 
                this.alt = 'No preview';
                this.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
            }
        };

        container.appendChild(card);
    });
}

function updatePromptsForSelection() {
    const sel = document.getElementById('object_select');
    if (!sel) return;
    
    const selected = sel.value || 'page_1';
    const template = TEMPLATES[selected] || null;
    const nombre = (document.getElementById('revista_nombre') && document.getElementById('revista_nombre').value.trim()) || '';
    const editorial = (document.getElementById('editorial_input') && document.getElementById('editorial_input').value.trim()) || '';
    const tplText = templateToPrompt(template);
    
    let systemPrompt = currentLang === 'en' 
        ? `Use this template to design the cover: ${tplText}` 
        : `Usa esta plantilla para diseñar la portada: ${tplText}`;
        
    if (nombre) {
        systemPrompt += currentLang === 'en' 
            ? ` The main cover title must show: "${nombre}".`
            : ` El título principal de la portada debe mostrar: "${nombre}".`;
    }
    
    if (editorial) {
        systemPrompt += currentLang === 'en' 
            ? ` Include the publisher: "${editorial}".`
            : ` Incluir la editorial: "${editorial}".`;
    }

    const spArea = document.getElementById('system_prompt');
    if (spArea) {
        spArea.value = systemPrompt;
        window._systemPrompt = spArea.value;
    } else {
        window._systemPrompt = systemPrompt;
    }

    const notice = document.getElementById('system_notice');
    if (notice) { 
        notice.style.display = 'block'; 
        notice.textContent = currentLang === 'en' ? 'System prompt updated' : 'System prompt actualizado'; 
        setTimeout(() => { notice.style.display = 'none'; }, 4000); 
    }
}

async function fetchAndPopulateModels() {
    try {
        const resp = await fetch(MODELS_URL);
        const models = await resp.json();
        const sel = document.getElementById('img_model');
        if (!sel) return;
        sel.innerHTML = '';
        models.forEach(m => {
            if (m.output_modalities && m.output_modalities.includes('image')) {
                sel.add(new Option(m.description || m.name, m.name));
            }
        });
    } catch (e) {
        const sel = document.getElementById('img_model');
        if (sel) {
            sel.innerHTML = '';
            ['flux', 'kontext', 'veo'].forEach(n => sel.add(new Option(n, n)));
        }
    }
}

function saveKeyLocally() {
    const el = document.getElementById('apiKeyInput');
    if (!el) return;
    const k = el.value.trim();
    if (k) {
        localStorage.setItem('pollinations_api_key', k);
        try { renderTemplateThumbnails(); } catch(e){}
    }
}

function getApiKey() {
    const el = document.getElementById('apiKeyInput');
    return el ? el.value.trim() : '';
}

function startAuthFlow() { 
    const redirectUrl = window.location.href.split('#')[0]; 
    window.location.href = `https://enter.pollinations.ai/authorize?redirect_url=${encodeURIComponent(redirectUrl)}`; 
}

function getImageDims() {
    const sel = document.getElementById('img_ratio');
    const val = sel ? sel.value : 'vertical';
    if (val === 'square') return 'width=1024&height=1024';
    if (val === '4:3') return 'width=1024&height=768';
    if (val === '3:4') return 'width=768&height=1024';
    return 'width=1152&height=2048';
}

function generateImageFromPrompt() {
    const key = getApiKey();
    if (!key) return alert(currentLang === 'en' ? 'Please enter your API key.' : 'Por favor ingresa tu API key.');
    
    const prompt = window._systemPrompt || '';
    if (!prompt) return alert(currentLang === 'en' ? 'System prompt is empty.' : 'System prompt vacío. Selecciona una plantilla y completa los campos.');
    
    const model = document.getElementById('img_model') ? document.getElementById('img_model').value : 'flux';
    const seed = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
    const url = `${GENERATE_URL}${encodeURIComponent(prompt)}?key=${key}&model=${model}&${getImageDims()}&seed=${seed}`;
    const img = document.getElementById('img-preview');
    const loading = document.getElementById('img_loading');
    
    if (loading) loading.style.display = 'block';
    img.style.display = 'block';
    img.onload = () => { if (loading) loading.style.display = 'none'; };
    img.src = url;
}

function updateBoxSize() {
    const sel = document.getElementById('img_ratio');
    const val = sel ? sel.value : 'vertical';
    const box = document.getElementById('img-container');
    let w = 420, h = 745;
    if (val === 'square') { w = 420; h = 420; }
    else if (val === '4:3') { w = 640; h = 480; }
    else if (val === '3:4') { w = 480; h = 640; }
    if (box) { box.style.width = w + 'px'; box.style.height = h + 'px'; }
}

async function downloadCurrentImage() {
    const url = document.getElementById('img-preview').src;
    if (!url) return alert(currentLang === 'en' ? 'No image to download.' : 'No hay imagen para descargar.');
    try {
        const resp = await fetch(url);
        const blob = await resp.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `portada_revista_${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
    } catch (e) {
        window.open(url, '_blank');
    }
}

function copySystemPrompt() {
    const spEl = document.getElementById('system_prompt');
    const btn = document.getElementById('copyPromptBtn');
    const text = (spEl && spEl.value) ? spEl.value : (window._systemPrompt || '');
    if (!text) return alert(currentLang === 'en' ? 'System prompt is empty.' : 'System prompt vacío.');
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            if (btn) {
                const prev = btn.textContent;
                btn.textContent = currentLang === 'en' ? 'Copied' : 'Copiado';
                setTimeout(() => { btn.textContent = prev; }, 1200);
            }
        }).catch(() => fallbackCopy(text));
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand('copy');
        alert(currentLang === 'en' ? 'System prompt copied' : 'System prompt copiado');
    } catch (e) {
        alert(currentLang === 'en' ? 'Failed to copy.' : 'No fue posible copiar automáticamente. Selecciona y copia manualmente.');
    }
    document.body.removeChild(ta);
}

function setPromptToSpanish() {
    currentLang = 'es';
    updatePromptsForSelection();
}

function setPromptToEnglish() {
    currentLang = 'en';
    updatePromptsForSelection();
}
